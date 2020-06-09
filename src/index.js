import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filePath1, filePath2) => {
  const object1 = parse(readFileSync(path.resolve(filePath1)).toString(), path.extname(filePath1));
  const object2 = parse(readFileSync(path.resolve(filePath2)).toString(), path.extname(filePath2));
  const object1Keys = Object.keys(object1);
  const object2Keys = Object.keys(object2);
  const deletedKeys = _.difference(object1Keys, object2Keys);
  const addedKeys = _.difference(object2Keys, object1Keys);
  const allKeys = _.union(object1Keys, object2Keys);

  const diff = allKeys.reduce((acc, key) => {
    const object1PropValue = object1[key];
    const object2PropValue = object2[key];

    if (deletedKeys.includes(key)) {
      return `${acc}  - ${key}: ${object1PropValue}\n`;
    }

    if (addedKeys.includes(key)) {
      return `${acc}  + ${key}: ${object2PropValue}\n`;
    }

    if (object1PropValue === object2PropValue) {
      return `${acc}    ${key}: ${object1PropValue}\n`;
    }

    return `${acc}  + ${key}: ${object2PropValue}\n  - ${key}: ${object1PropValue}\n`;
  }, '');

  return `{\n${diff}}`;
};

export default genDiff;
