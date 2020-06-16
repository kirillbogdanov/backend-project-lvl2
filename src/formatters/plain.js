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

const plain = (diff, parentPath = '') => diff
  .filter(({ status }) => status !== 'not_modified')
  .map((propData) => {
    const {
      propName, status, value, oldValue, children,
    } = propData;
    const propPath = parentPath ? `${parentPath}.${propName}` : `${propName}`;

    switch (status) {
      case 'nested_changes':
        return `${plain(children, propPath)}`;
      case 'deleted':
        return `Property '${propPath}' was deleted`;
      case 'added':
        return `Property '${propPath}' was added with value: ${getValueString(value)}`;
      case 'changed':
        return `Property '${propPath}' was changed from ${getValueString(oldValue)} to ${getValueString(value)}`;
      default:
        throw new Error('Unexpected prop status');
    }
  }).join('\n');

export default plain;
