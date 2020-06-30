import ini from 'ini';
import _ from 'lodash';

const normalizeValue = (value) => {
  const numValue = parseInt(value, 10);

  return Number.isNaN(numValue) ? value : numValue;
};

const normalizeValues = (obj) => _.mapValues(obj, (value) => {
  const normalizedValue = normalizeValue(value);

  if (_.isPlainObject(normalizedValue)) {
    return normalizeValues(normalizedValue);
  }

  return normalizedValue;
});

const parseIni = (fileContent) => {
  const parsedObj = ini.parse(fileContent);

  return normalizeValues(parsedObj);
};

export default parseIni;
