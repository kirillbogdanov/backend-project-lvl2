import { readFileSync } from 'fs';
import _ from 'lodash';
import genDiff from '../src/index.js';

test('2 json files with stylish format', () => {
  const expected = _.trimEnd(readFileSync(`${__dirname}/../__fixtures__/stylishResult.txt`).toString(), '\n');
  const result = genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`, 'stylish');

  expect(result).toBe(expected);
});

test('2 yml files with stylish format', () => {
  const expected = _.trimEnd(readFileSync(`${__dirname}/../__fixtures__/stylishResult.txt`).toString(), '\n');
  const result = genDiff(`${__dirname}/../__fixtures__/before.yml`, `${__dirname}/../__fixtures__/after.yml`, 'stylish');

  expect(result).toBe(expected);
});

test('2 flat ini files with stylish format', () => {
  const expected = _.trimEnd(readFileSync(`${__dirname}/../__fixtures__/stylishResult.txt`).toString(), '\n');
  const result = genDiff(`${__dirname}/../__fixtures__/before.ini`, `${__dirname}/../__fixtures__/after.ini`, 'stylish');

  expect(result).toBe(expected);
});

test('json and yml with stylish format', () => {
  const expected = _.trimEnd(readFileSync(`${__dirname}/../__fixtures__/stylishResult.txt`).toString(), '\n');
  const result = genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.yml`, 'stylish');

  expect(result).toBe(expected);
});

test('2 json files with plain format', () => {
  const expected = _.trimEnd(readFileSync(`${__dirname}/../__fixtures__/plainResult.txt`).toString(), '\n');
  const result = genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`, 'plain');

  expect(result).toBe(expected);
});

test('2 json files with json format', () => {
  const expected = JSON.parse(readFileSync(`${__dirname}/../__fixtures__/jsonResult.json`).toString());
  const result = JSON.parse(genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`, 'json'));

  expect(result).toEqual(expected);
});

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
