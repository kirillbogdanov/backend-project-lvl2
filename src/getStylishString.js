import { isObject } from './utils.js';

const INDENT = '    ';

const getValueString = (value, indentation) => {
  const INDENTATION_STRING = `${indentation}${INDENT}`;

  if (isObject(value)) {
    const valueString = Object.keys(value).reduce(
      (acc, key) => `${acc}${INDENTATION_STRING}    ${key}: ${getValueString(value[key])}\n`, '',
    );

    return `{\n${valueString}${INDENTATION_STRING}}`;
  }

  return value.toString();
};

const getStylishString = (diff, levelOfNesting = 0) => {
  const INDENTATION_STRING = INDENT.repeat(levelOfNesting);
  const props = Object.keys(diff).sort();

  const diffString = props.reduce((acc, propName) => {
    const { status, value, oldValue } = diff[propName];

    switch (status) {
      case undefined:
        return `${acc}${INDENTATION_STRING}    ${propName}: ${getStylishString(diff[propName], levelOfNesting + 1)}\n`;
      case 'deleted':
        return `${acc}${INDENTATION_STRING}  - ${propName}: ${getValueString(oldValue, INDENTATION_STRING)}\n`;
      case 'added':
        return `${acc}${INDENTATION_STRING}  + ${propName}: ${getValueString(value, INDENTATION_STRING)}\n`;
      case 'changed':
        return `${acc}${INDENTATION_STRING}  + ${propName}: ${getValueString(value, INDENTATION_STRING)}\n${INDENTATION_STRING}  - ${propName}: ${getValueString(oldValue, INDENTATION_STRING)}\n`;
      default:
        return `${acc}${INDENTATION_STRING}    ${propName}: ${getValueString(value, INDENTATION_STRING)}\n`;
    }
  }, '');

  return `{\n${diffString}${INDENTATION_STRING}}`;
};

export default getStylishString;
