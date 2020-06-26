import { readFileSync } from 'fs';
import path from 'path';
import getParser from './parsers/getParser.js';
import createObjectsDiff from './createObjectsDiff.js';
import getFormatter from './formatters/getFormatter.js';

const readFile = (filePath) => readFileSync(path.resolve(filePath), 'utf-8');

const genDiff = (filePath1, filePath2, formatName) => {
  const dataFormatName = path.extname(filePath1);
  const parser = getParser(dataFormatName);
  const fileContent1 = readFile(filePath1);
  const fileContent2 = readFile(filePath2);
  const object1 = parser(fileContent1);
  const object2 = parser(fileContent2);
  const objectsDiff = createObjectsDiff(object1, object2);
  const formatter = getFormatter(formatName);

  return formatter(objectsDiff);
};

export default genDiff;
