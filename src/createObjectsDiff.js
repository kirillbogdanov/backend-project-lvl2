import _ from 'lodash';

const createObjectsDiff = (oldObject, newObject) => {
  const object1Keys = _.keys(oldObject);
  const object2Keys = _.keys(newObject);
  const allKeys = _.union(object1Keys, object2Keys);

  return allKeys.sort().map((propName) => {
    const oldValue = oldObject[propName];
    const newValue = newObject[propName];

    if (!_.has(newObject, propName)) {
      return { propName, nodeType: 'deleted', oldValue };
    }

    if (!_.has(oldObject, propName)) {
      return { propName, nodeType: 'added', newValue };
    }

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      const children = createObjectsDiff(oldValue, newValue);
      return { propName, nodeType: 'nested', children };
    }

    if (oldValue !== newValue) {
      return {
        propName, nodeType: 'changed', oldValue, newValue,
      };
    }

    return { propName, nodeType: 'unchanged', newValue };
  });
};

export default createObjectsDiff;
