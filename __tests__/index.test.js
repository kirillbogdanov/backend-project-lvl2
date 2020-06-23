import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import genDiff from '../src/index.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);
const readFixtureFile = (fileName) => readFileSync(getFixturePath(fileName), 'utf-8');

const stylishDescParams = ['stylish', [
  ['json', 'stylishResult.txt'], ['yml', 'stylishResult.txt'], ['ini', 'stylishResult.txt'],
]];
const plainDescParams = ['plain', [
  ['json', 'plainResult.txt'], ['yml', 'plainResult.txt'], ['ini', 'plainResult.txt'],
]];
const jsonDescParams = ['json', [
  ['json', 'jsonResult.txt'], ['yml', 'jsonResult.txt'], ['ini', 'jsonResultForIni.txt'],
]];

describe.each([
  stylishDescParams, plainDescParams, jsonDescParams,
])('%s format', (format, testParams) => {
  test.each(testParams)('%s', (fileFormat, resultFixtureFileName) => {
    const fixture = readFixtureFile(resultFixtureFileName);
    const expected = _.trimEnd(fixture, '\n');

    const beforeFileFixturePath = getFixturePath(`before.${fileFormat}`);
    const afterFileFixturePath = getFixturePath(`after.${fileFormat}`);
    const result = genDiff(beforeFileFixturePath, afterFileFixturePath, format);

    expect(result).toEqual(expected);
  });
});

describe('errors', () => {
  test('one or more files have unsupported extension', () => {
    const beforeFileFixturePath = getFixturePath('before.txt');
    const afterFileFixturePath = getFixturePath('after.txt');

    expect(() => {
      genDiff(beforeFileFixturePath, afterFileFixturePath);
    }).toThrow();
  });

  test('unknown format name', () => {
    const beforeFileFixturePath = getFixturePath('before.json');
    const afterFileFixturePath = getFixturePath('after.json');

    expect(() => {
      genDiff(beforeFileFixturePath, afterFileFixturePath, 'unknownFormatName');
    }).toThrow();
  });
});
