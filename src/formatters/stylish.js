import _ from 'lodash';

const INDENT = '    ';

const stringify = (value, indentation) => {
  if (!_.isPlainObject(value)) {
    return value.toString();
  }

  const INDENTATION_STRING = `${indentation}${INDENT}`;
  const valueString = _.keys(value).map(
    (key) => `${INDENTATION_STRING}    ${key}: ${stringify(value[key])}`,
  ).join('\n');

  return `{\n${valueString}\n${INDENTATION_STRING}}`;
};

const stylish = (diff) => {
  const iter = (innerDiff, levelOfNesting = 0) => {
    const indentationString = INDENT.repeat(levelOfNesting);

    const diffString = innerDiff.map((propData) => {
      const {
        propName, type, newValue, oldValue, children,
      } = propData;

      switch (type) {
        case 'nested':
          return `${indentationString}    ${propName}: ${iter(children, levelOfNesting + 1)}`;
        case 'deleted':
          return `${indentationString}  - ${propName}: ${stringify(oldValue, indentationString)}`;
        case 'added':
          return `${indentationString}  + ${propName}: ${stringify(newValue, indentationString)}`;
        case 'changed': {
          const newValueLine = `  + ${propName}: ${stringify(newValue, indentationString)}`;
          const oldValueLine = `  - ${propName}: ${stringify(oldValue, indentationString)}`;
          return `${indentationString}${newValueLine}\n${indentationString}${oldValueLine}`;
        }
        case 'unchanged':
          return `${indentationString}    ${propName}: ${stringify(newValue, indentationString)}`;
        default:
          throw new Error(`Unexpected node type: '${type}'`);
      }
    }).join('\n');

    return `{\n${diffString}\n${indentationString}}`;
  };

  return iter(diff);
};

export default stylish;
