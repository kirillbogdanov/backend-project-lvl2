import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe.each([
  ['stylish', 'stylishResult.txt'], ['plain', 'plainResult.txt'], ['json', 'jsonResult.json'],
])('%s format', (format, resultFileName) => {
  test.each(['json', 'yml', 'ini'])('%s', (fileFormat) => {
    const diff = genDiff(getFixturePath(`before.${fileFormat}`), getFixturePath(`after.${fileFormat}`), format);
    /*
    Костыль с подменой имени файла фикстуры ниже пришлось сделать из-за того,
    что при парсинге ini нельзя отличить значение-число от значения-строки.
    Поэтому в jsonResultForIni.json лежит тот же результат, что и в jsonResult.json,
    но с преобразованными к строке числовыми значениями.
    */
    const isFormatJson = format === 'json';
    const resultFixtureFileName = isFormatJson && fileFormat === 'ini' ? 'jsonResultForIni.json' : resultFileName;
    const fixture = readFixtureFile(resultFixtureFileName);
    const result = isFormatJson ? JSON.parse(diff) : diff;
    const expected = isFormatJson ? JSON.parse(fixture) : _.trimEnd(fixture, '\n');

    expect(result).toEqual(expected);
  });
});

describe('errors', () => {
  test('one or more files have unsupported extension', () => {
    expect(() => {
      genDiff(`${__dirname}/../__fixtures__/before.txt`, `${__dirname}/../__fixtures__/after.yml`);
    }).toThrow();
  });

  test('unknown format name', () => {
    expect(() => {
      genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`, 'unknownFormatName');
    }).toThrow();
  });
});
