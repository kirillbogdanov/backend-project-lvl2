#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/index.js';

const program = new commander.Command();

program
  .arguments('<filePath1> <filePath2>')
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .action((filePath1, filePath2) => {
    console.log(genDiff(filePath1, filePath2));
  });

program.parse(process.argv);
