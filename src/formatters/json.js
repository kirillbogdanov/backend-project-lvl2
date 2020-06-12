const json = (diff, parentPath = '') => {
  const props = Object.keys(diff);

  return JSON.stringify(props.reduce((acc, propName) => {
    const propPath = parentPath ? `${parentPath}.${propName}` : `${propName}`;
    const { status, value, oldValue } = diff[propName];

    switch (status) {
      case undefined:
        return [...acc, ...JSON.parse(json(diff[propName], propPath))];
      case 'deleted':
        return [...acc, { propPath, status, oldValue }];
      case 'added':
        return [...acc, { propPath, status, value }];
      case 'changed':
        return [...acc, {
          propPath, status, oldValue, value,
        }];
      default:
        return acc;
    }
  }, []));
};

export default json;
