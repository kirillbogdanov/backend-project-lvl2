import { readFileSync } from 'fs';
import _ from 'lodash';
import genDiff from './index.js';

test('2 flat json files', () => {
  const expected = _.trimEnd(readFileSync(`${__dirname}/../__fixtures__/result.txt`).toString(), '\n');
  const result = genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`, 'stylish');

  expect(result).toEqual(expected);
});

test('2 flat yml files', () => {
  const expected = _.trimEnd(readFileSync(`${__dirname}/../__fixtures__/result.txt`).toString(), '\n');
  const result = genDiff(`${__dirname}/../__fixtures__/before.yml`, `${__dirname}/../__fixtures__/after.yml`, 'stylish');

  expect(result).toEqual(expected);
});

test('2 flat ini files', () => {
  const expected = _.trimEnd(readFileSync(`${__dirname}/../__fixtures__/result.txt`).toString(), '\n');
  const result = genDiff(`${__dirname}/../__fixtures__/before.ini`, `${__dirname}/../__fixtures__/after.ini`, 'stylish');

  expect(result).toEqual(expected);
});

test('flat json and flat yml', () => {
  const expected = _.trimEnd(readFileSync(`${__dirname}/../__fixtures__/result.txt`).toString(), '\n');
  const result = genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.yml`);

  expect(result).toEqual(expected);
});

test('one or more files have unsupported extension', () => {
  expect(() => {
    genDiff(`${__dirname}/../__fixtures__/before.txt`, `${__dirname}/../__fixtures__/after.yml`);
  }).toThrow();
});
