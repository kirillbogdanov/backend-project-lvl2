import ini from 'ini';
import _ from 'lodash';

const castStringToNum = (value) => {
  const parsedValue = parseInt(value, 10);

  return Number.isNaN(parsedValue) ? value : parsedValue;
};

const castStringsToNum = (obj, iteratee) => _.mapValues(obj, (value) => {
  if (_.isPlainObject(value)) {
    return castStringsToNum(value, iteratee);
  }

  return iteratee(value);
});

const parseIni = (fileContent) => {
  const parsedObj = ini.parse(fileContent);

  return castStringsToNum(parsedObj, castStringToNum);
};

export default parseIni;
