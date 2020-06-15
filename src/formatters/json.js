const json = (diff, parentPath = '') => JSON.stringify(diff.reduce((acc, propData) => {
  const {
    propName, status, value, oldValue, children,
  } = propData;
  const propPath = parentPath ? `${parentPath}.${propName}` : `${propName}`;

  switch (status) {
    case 'nested_changes':
      return [...acc, ...JSON.parse(json(children, propPath))];
    case 'deleted':
      return [...acc, { propPath, status, oldValue }];
    case 'added':
      return [...acc, { propPath, status, value }];
    case 'changed':
      return [...acc, {
        propPath, status, oldValue, value,
      }];
    case 'not_modified':
    default:
      return acc;
  }
}, []));

export default json;
