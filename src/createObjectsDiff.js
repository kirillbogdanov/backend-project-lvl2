import _ from 'lodash';

const determinePropDiffStatus = (oldObject, newObject, propName) => {
  if (!_.has(newObject, propName)) {
    return 'deleted';
  }

  if (!_.has(oldObject, propName)) {
    return 'added';
  }

  const oldValue = oldObject[propName];
  const newValue = newObject[propName];

  if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
    return 'nested';
  }

  if (oldValue !== newValue) {
    return 'changed';
  }

  return 'static';
};

const createObjectsDiff = (oldObject, newObject) => {
  const object1Keys = _.keys(oldObject);
  const object2Keys = _.keys(newObject);
  const allKeys = _.union(object1Keys, object2Keys);

  return allKeys.sort().map((propName) => {
    const oldValue = oldObject[propName];
    const newValue = newObject[propName];
    const status = determinePropDiffStatus(oldObject, newObject, propName);
    const propData = { propName, status };

    switch (status) {
      case 'nested': {
        const children = createObjectsDiff(oldValue, newValue);
        return { ...propData, children };
      }
      case 'deleted':
        return { ...propData, oldValue };
      case 'changed':
        return { ...propData, oldValue, newValue };
      default:
        return { ...propData, newValue };
    }
  });
};

export default createObjectsDiff;
