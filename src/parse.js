import yaml from 'js-yaml';
import ini from 'ini';

const parse = (fileContent, fileExtension) => {
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.safeLoad(fileContent);
    case '.ini':
      return ini.parse(fileContent);
    default:
      throw new Error(`Parsing error: Unsupported file extension: ${fileExtension}`);
  }
};

export default parse;
