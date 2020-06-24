import ini from 'ini';
import _ from 'lodash';

const isNumber = (a) => (/^\d+$/.test(a));

const parseIni = (fileContent) => {
  const parsedObj = ini.parse(fileContent);
  const iter = (obj) => _.mapValues(obj, (value) => {
    if (_.isPlainObject(value)) {
      return iter(value);
    }

    return isNumber(value) ? _.parseInt(value) : value;
  });

  return iter(parsedObj);
};

export default parseIni;
