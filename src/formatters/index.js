import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error(`Unknown format name: "${formatName}"`);
  }
};

const format = (diff, formatName) => getFormatter(formatName)(diff);

export default format;
