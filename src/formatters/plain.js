import _ from 'lodash';
import { isObject } from '../utils.js';

const getValueString = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value.toString();
};

const plain = (diff, parentPath = '') => {
  const props = Object.keys(diff);

  const diffString = props.reduce((acc, propName) => {
    const propPath = parentPath ? `${parentPath}.${propName}` : `${propName}`;
    const { status, value, oldValue } = diff[propName];

    switch (status) {
      case undefined:
        return `${acc}\n${plain(diff[propName], propPath)}`;
      case 'deleted':
        return `${acc}\nProperty '${propPath}' was deleted`;
      case 'added':
        return `${acc}\nProperty '${propPath}' was added with value: ${getValueString(value)}`;
      case 'changed':
        return `${acc}\nProperty '${propPath}' was changed from ${getValueString(oldValue)} to ${getValueString(value)}`;
      default:
        return acc;
    }
  }, '');

  return _.trimStart(diffString);
};

export default plain;
