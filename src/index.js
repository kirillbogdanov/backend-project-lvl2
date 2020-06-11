import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers.js';
import getObjectsDiff from './getObjectsDiff.js';
import getStylishString from './getStylishString.js';

const genDiff = (filePath1, filePath2, format) => {
  const object1 = parse(readFileSync(path.resolve(filePath1)).toString(), path.extname(filePath1));
  const object2 = parse(readFileSync(path.resolve(filePath2)).toString(), path.extname(filePath2));

  const objectsDiff = getObjectsDiff(object1, object2);

  switch (format) {
    case 'stylish':
    default:
      return getStylishString(objectsDiff);
  }
};

export default genDiff;
