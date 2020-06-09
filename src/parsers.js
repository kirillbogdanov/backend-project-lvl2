import yaml from 'js-yaml';

const parse = (fileContent, fileExtension) => {
  switch (fileExtension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.safeLoad(fileContent);
    default:
      throw new Error(`Parsing error: Unsupported file extension: ${fileExtension}`);
  }
};

export default parse;
