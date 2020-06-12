#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/index.js';

const program = new commander.Command();

program
  .arguments('<filePath1> <filePath2>')
  .option('-f, --format [type]', 'output format. \'plain\' || \'stylish\' ', 'stylish')
  .description(`Compares two configuration files and shows a difference.
Works only with .json, .yml/.yaml and .ini files.`)
  .version('0.0.1')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2, program.format));
  });

program.parse(process.argv);
