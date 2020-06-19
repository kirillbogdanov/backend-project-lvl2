import _ from 'lodash';

const INDENT = '    ';

const getValueString = (value, indentation) => {
  const INDENTATION_STRING = `${indentation}${INDENT}`;

  if (_.isPlainObject(value)) {
    const valueString = Object.keys(value).reduce(
      (acc, key) => `${acc}${INDENTATION_STRING}    ${key}: ${getValueString(value[key])}\n`, '',
    );

    return `{\n${valueString}${INDENTATION_STRING}}`;
  }

  return value.toString();
};

const stylish = (diff, levelOfNesting = 0) => {
  const INDENTATION_STRING = INDENT.repeat(levelOfNesting);

  const diffString = diff.map((propData) => {
    const {
      propName, status, value, oldValue, children,
    } = propData;

    switch (status) {
      case 'nested_changes':
        return `${INDENTATION_STRING}    ${propName}: ${stylish(children, levelOfNesting + 1)}`;
      case 'deleted':
        return `${INDENTATION_STRING}  - ${propName}: ${getValueString(oldValue, INDENTATION_STRING)}`;
      case 'added':
        return `${INDENTATION_STRING}  + ${propName}: ${getValueString(value, INDENTATION_STRING)}`;
      case 'changed':
        return `${INDENTATION_STRING}  + ${propName}: ${getValueString(value, INDENTATION_STRING)}\n${INDENTATION_STRING}  - ${propName}: ${getValueString(oldValue, INDENTATION_STRING)}`;
      case 'not_modified':
      default:
        return `${INDENTATION_STRING}    ${propName}: ${getValueString(value, INDENTATION_STRING)}`;
    }
  }).join('\n');

  return `{\n${diffString}\n${INDENTATION_STRING}}`;
};

export default stylish;
