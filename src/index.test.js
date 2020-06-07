import { readFileSync } from 'fs';
import _ from 'lodash';
import genDiff from './index.js';

test('genDiff of 2 json files', () => {
  const expected = _.trimEnd(readFileSync(`${__dirname}/../__fixtures__/result.txt`).toString(), '\n');
  const result = genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`);

  expect(result).toEqual(expected);
});
