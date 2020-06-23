import _ from 'lodash';

const determinePropDiffStatus = (oldValue, newValue) => {
  if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
    return 'nested_changes';
  }
  if (newValue === undefined) {
    return 'deleted';
  }
  if (oldValue === undefined) {
    return 'added';
  }
  if (oldValue !== newValue) {
    return 'changed';
  }
  return 'not_modified';
};

const createObjectsDiff = (oldObject, newObject) => {
  const object1Keys = _.keys(oldObject);
  const object2Keys = _.keys(newObject);
  const allKeys = _.union(object1Keys, object2Keys);

  return allKeys.sort().map((propName) => {
    const oldValue = oldObject[propName];
    const newValue = newObject[propName];
    const status = determinePropDiffStatus(oldValue, newValue);

    return {
      propName,
      status,
      oldValue: status !== 'nested_changes' && status !== 'not_modified' ? oldValue : undefined,
      newValue: status !== 'nested_changes' ? newValue : undefined,
      children: status === 'nested_changes' ? createObjectsDiff(oldValue, newValue) : undefined,
    };
  });
};

export default createObjectsDiff;
