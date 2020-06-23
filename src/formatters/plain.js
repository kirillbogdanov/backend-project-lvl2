import _ from 'lodash';

const getValueString = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (diff, parentPath = '') => diff
  .filter(({ status }) => status !== 'not_modified')
  .map((propData) => {
    const {
      propName, status, newValue, oldValue, children,
    } = propData;
    const propPath = parentPath ? `${parentPath}.${propName}` : `${propName}`;

    switch (status) {
      case 'nested_changes':
        return `${plain(children, propPath)}`;
      case 'deleted':
        return `Property '${propPath}' was deleted`;
      case 'added':
        return `Property '${propPath}' was added with value: ${getValueString(newValue)}`;
      case 'changed':
        return `Property '${propPath}' was changed from ${getValueString(oldValue)} to ${getValueString(newValue)}`;
      default:
        throw new Error('Unexpected prop status');
    }
  }).join('\n');

export default plain;
