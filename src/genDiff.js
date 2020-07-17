import { readFileSync } from 'fs';
import path from 'path';
import parse from './parsers/index.js';
import createObjectsDiff from './createObjectsDiff.js';
import format from './formatters/index.js';

const readFile = (filePath) => readFileSync(path.resolve(filePath), 'utf-8');
const getFileDataFormat = (filePath) => path.extname(filePath).slice(1);

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const dataFormatName1 = getFileDataFormat(filePath1);
  const dataFormatName2 = getFileDataFormat(filePath2);
  const fileContent1 = readFile(filePath1);
  const fileContent2 = readFile(filePath2);
  const object1 = parse(fileContent1, dataFormatName1);
  const object2 = parse(fileContent2, dataFormatName2);
  const objectsDiff = createObjectsDiff(object1, object2);

  return format(objectsDiff, formatName);
};

export default genDiff;
