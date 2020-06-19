import { readFileSync } from 'fs';
import path from 'path';
import parse from './parse.js';
import getObjectsDiff from './getObjectsDiff.js';
import getFormattedDiffString from './formatters/index.js';

const parseFile = (filePath) => parse(
  readFileSync(path.resolve(filePath)).toString(), path.extname(filePath),
);

const genDiff = (filePath1, filePath2, formatName) => {
  const object1 = parseFile(filePath1);
  const object2 = parseFile(filePath2);

  const objectsDiff = getObjectsDiff(object1, object2);

  return getFormattedDiffString(formatName, objectsDiff);
};

export default genDiff;
