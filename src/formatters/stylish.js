import _ from 'lodash';

const INDENT = '    ';

const createValueString = (value, indentation) => {
  const INDENTATION_STRING = `${indentation}${INDENT}`;

  if (_.isPlainObject(value)) {
    const valueString = _.keys(value).reduce(
      (acc, key) => `${acc}${INDENTATION_STRING}    ${key}: ${createValueString(value[key])}\n`, '',
    );

    return `{\n${valueString}${INDENTATION_STRING}}`;
  }

  return value.toString();
};

const stylish = (diff) => {
  const iter = (innerDiff, levelOfNesting = 0) => {
    const indentationString = INDENT.repeat(levelOfNesting);

    const diffString = innerDiff.map((propData) => {
      const {
        propName, nodeType, newValue, oldValue, children,
      } = propData;

      switch (nodeType) {
        case 'nested':
          return `${indentationString}    ${propName}: ${iter(children, levelOfNesting + 1)}`;
        case 'deleted':
          return `${indentationString}  - ${propName}: ${createValueString(oldValue, indentationString)}`;
        case 'added':
          return `${indentationString}  + ${propName}: ${createValueString(newValue, indentationString)}`;
        case 'changed': {
          const newValueLine = `  + ${propName}: ${createValueString(newValue, indentationString)}`;
          const oldValueLine = `  - ${propName}: ${createValueString(oldValue, indentationString)}`;
          return `${indentationString}${newValueLine}\n${indentationString}${oldValueLine}`;
        }
        case 'unchanged':
          return `${indentationString}    ${propName}: ${createValueString(newValue, indentationString)}`;
        default:
          throw new Error(`Unexpected nodeType: '${nodeType}'`);
      }
    }).join('\n');

    return `{\n${diffString}\n${indentationString}}`;
  };

  return iter(diff);
};

export default stylish;
