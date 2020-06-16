import _ from 'lodash';

const getPropDiffStatus = (oldValue, value) => {
  if (_.isPlainObject(oldValue) && _.isPlainObject(value)) {
    return 'nested_changes';
  }
  if (value === undefined) {
    return 'deleted';
  }
  if (oldValue === undefined) {
    return 'added';
  }
  if (oldValue !== value) {
    return 'changed';
  }
  return 'not_modified';
};

const getObjectsDiff = (oldObject, newObject) => {
  const object1Keys = Object.keys(oldObject);
  const object2Keys = Object.keys(newObject);
  const allKeys = _.union(object1Keys, object2Keys);

  return allKeys.map((propName) => {
    const oldValue = oldObject[propName];
    const value = newObject[propName];
    const status = getPropDiffStatus(oldValue, value);

    return {
      propName,
      status,
      oldValue: status !== 'nested_changes' && status !== 'not_modified' ? oldValue : undefined,
      value: status !== 'nested_changes' ? value : undefined,
      children: status === 'nested_changes' ? getObjectsDiff(oldValue, value) : undefined,
    };
  }).sort((propData1, propData2) => {
    if (propData1.propName < propData2.propName) {
      return -1;
    }
    return 1;
  });
};

export default getObjectsDiff;
