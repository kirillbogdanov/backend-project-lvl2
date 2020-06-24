import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers/parse.js';
import createObjectsDiff from './createObjectsDiff.js';
import createFormattedDiffString from './formatters/index.js';

const readFile = (filePath) => readFileSync(path.resolve(filePath)).toString();

const genDiff = (filePath1, filePath2, formatName) => {
  const fileContent1 = readFile(filePath1);
  const fileContent2 = readFile(filePath2);
  const object1 = parse(fileContent1, path.extname(filePath1));
  const object2 = parse(fileContent2, path.extname(filePath2));

  const objectsDiff = createObjectsDiff(object1, object2);

  return createFormattedDiffString(formatName, objectsDiff);
};

export default genDiff;
