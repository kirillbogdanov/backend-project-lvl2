import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import genDiff from '../src/genDiff.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);
const readFixtureFile = (fileName) => readFileSync(getFixturePath(fileName), 'utf-8');

const formattersNames = ['stylish', 'plain', 'json'];
const extensions = ['json', 'yml', 'ini'];
let resultFixtures;

beforeAll(() => {
  resultFixtures = formattersNames.reduce((acc, formatterName) => {
    const fixtureContent = readFixtureFile(`${formatterName}Result.txt`);

    return {
      ...acc,
      [formatterName]: _.trimEnd(fixtureContent, '\n'),
    };
  }, resultFixtures);
});

describe.each(formattersNames)('%s format', (formatterName) => {
  test.each(extensions)('%s', (extension) => {
    const expected = resultFixtures[formatterName];

    const beforeFileFixturePath = getFixturePath(`before.${extension}`);
    const afterFileFixturePath = getFixturePath(`after.${extension}`);
    const result = genDiff(beforeFileFixturePath, afterFileFixturePath, formatterName);

    expect(result).toEqual(expected);
  });
});

describe('errors', () => {
  test('one or more files have unsupported extension', () => {
    const beforeFileFixturePath = getFixturePath('before.txt');
    const afterFileFixturePath = getFixturePath('after.txt');

    expect(() => {
      genDiff(beforeFileFixturePath, afterFileFixturePath);
    }).toThrow('Unsupported data format: \'txt\'');
  });

  test('unknown format name', () => {
    const beforeFileFixturePath = getFixturePath('before.json');
    const afterFileFixturePath = getFixturePath('after.json');

    expect(() => {
      genDiff(beforeFileFixturePath, afterFileFixturePath, 'unknownFormatName');
    }).toThrow('Unknown format name: \'unknownFormatName\'');
  });
});
