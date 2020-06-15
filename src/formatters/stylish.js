import { isObject } from '../utils.js';

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

const stylish = (diff, levelOfNesting = 0) => {
  const INDENTATION_STRING = INDENT.repeat(levelOfNesting);

  const diffString = diff.reduce((acc, propData) => {
    const {
      propName, status, value, oldValue, children,
    } = propData;

    switch (status) {
      case 'nested_changes':
        return `${acc}${INDENTATION_STRING}    ${propName}: ${stylish(children, levelOfNesting + 1)}\n`;
      case 'deleted':
        return `${acc}${INDENTATION_STRING}  - ${propName}: ${getValueString(oldValue, INDENTATION_STRING)}\n`;
      case 'added':
        return `${acc}${INDENTATION_STRING}  + ${propName}: ${getValueString(value, INDENTATION_STRING)}\n`;
      case 'changed':
        return `${acc}${INDENTATION_STRING}  + ${propName}: ${getValueString(value, INDENTATION_STRING)}\n${INDENTATION_STRING}  - ${propName}: ${getValueString(oldValue, INDENTATION_STRING)}\n`;
      case 'not_modified':
      default:
        return `${acc}${INDENTATION_STRING}    ${propName}: ${getValueString(value, INDENTATION_STRING)}\n`;
    }
  }, '');

  return `{\n${diffString}${INDENTATION_STRING}}`;
};

export default stylish;
