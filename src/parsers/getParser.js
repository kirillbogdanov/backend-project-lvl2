import yaml from 'js-yaml';
import parseIni from './parseIni.js';

const getParser = (dataFormatName) => {
  switch (dataFormatName) {
    case '.json':
      return JSON.parse;
    case '.yml':
    case '.yaml':
      return yaml.safeLoad;
    case '.ini':
      return parseIni;
    default:
      throw new Error(`Unsupported file extension: '${dataFormatName}'`);
  }
};

export default getParser;
