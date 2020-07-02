import _ from 'lodash';

const createObjectsDiff = (oldObject, newObject) => {
  const object1Keys = _.keys(oldObject);
  const object2Keys = _.keys(newObject);
  const allKeys = _.union(object1Keys, object2Keys);

  return allKeys.sort().map((propName) => {
    const oldValue = oldObject[propName];
    const newValue = newObject[propName];

    if (!_.has(newObject, propName)) {
      return { propName, type: 'deleted', oldValue };
    }

    if (!_.has(oldObject, propName)) {
      return { propName, type: 'added', newValue };
    }

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      const children = createObjectsDiff(oldValue, newValue);
      return { propName, type: 'nested', children };
    }

    if (oldValue !== newValue) {
      return {
        propName, type: 'changed', oldValue, newValue,
      };
    }

    return { propName, type: 'unchanged', newValue };
  });
};

export default createObjectsDiff;
