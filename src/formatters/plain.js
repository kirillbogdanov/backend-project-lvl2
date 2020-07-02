import _ from 'lodash';

const createValueString = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

const plain = (diff) => {
  const iter = (innerDiff, parentPath = '') => innerDiff
    .filter(({ type }) => type !== 'unchanged')
    .map((propData) => {
      const {
        propName, type, newValue, oldValue, children,
      } = propData;
      const propPath = parentPath ? `${parentPath}.${propName}` : `${propName}`;

      switch (type) {
        case 'nested':
          return `${iter(children, propPath)}`;
        case 'deleted':
          return `Property '${propPath}' was deleted`;
        case 'added':
          return `Property '${propPath}' was added with value: ${createValueString(newValue)}`;
        case 'changed':
          return `Property '${propPath}' was changed from ${createValueString(oldValue)} to ${createValueString(newValue)}`;
        default:
          throw new Error(`Unexpected node type: '${type}'`);
      }
    }).join('\n');

  return iter(diff);
};

export default plain;
