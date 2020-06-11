import _ from 'lodash';
import { isObject } from './utils.js';

const getObjectsDiff = (object1, object2) => {
  const object1Keys = Object.keys(object1);
  const object2Keys = Object.keys(object2);
  const deletedKeys = _.difference(object1Keys, object2Keys);
  const addedKeys = _.difference(object2Keys, object1Keys);
  const allKeys = _.union(object1Keys, object2Keys);

  return allKeys.reduce((acc, key) => {
    const object1PropValue = object1[key];
    const object2PropValue = object2[key];

    if (isObject(object1PropValue) && isObject(object2PropValue)) {
      return {
        ...acc,
        [key]: getObjectsDiff(object1PropValue, object2PropValue),
      };
    }

    if (deletedKeys.includes(key)) {
      return {
        ...acc,
        [key]: {
          status: 'deleted',
          oldValue: object1PropValue,
        },
      };
    }

    if (addedKeys.includes(key)) {
      return {
        ...acc,
        [key]: {
          status: 'added',
          value: object2PropValue,
        },
      };
    }

    if (object1PropValue !== object2PropValue) {
      return {
        ...acc,
        [key]: {
          status: 'changed',
          oldValue: object1PropValue,
          value: object2PropValue,
        },
      };
    }

    return {
      ...acc,
      [key]: {
        status: 'not_modified',
        value: object1PropValue,
      },
    };
  }, {});
};

export default getObjectsDiff;
