import yaml from 'js-yaml';
import parseIni from './parseIni.js';

const parse = (fileContent, fileExtension) => {
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.safeLoad(fileContent);
    case '.ini':
      return parseIni(fileContent);
    default:
      throw new Error(`Unsupported file extension: ${fileExtension}`);
  }
};

export default parse;
