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
  const diffString = diff.reduce((acc, propData) => {
    const {
      propName, status, value, oldValue, children,
    } = propData;
    const propPath = parentPath ? `${parentPath}.${propName}` : `${propName}`;

    switch (status) {
      case 'nested_changes':
        return `${acc}\n${plain(children, propPath)}`;
      case 'deleted':
        return `${acc}\nProperty '${propPath}' was deleted`;
      case 'added':
        return `${acc}\nProperty '${propPath}' was added with value: ${getValueString(value)}`;
      case 'changed':
        return `${acc}\nProperty '${propPath}' was changed from ${getValueString(oldValue)} to ${getValueString(value)}`;
      case 'not_modified':
      default:
        return acc;
    }
  }, '');

  return _.trimStart(diffString);
};

export default plain;
