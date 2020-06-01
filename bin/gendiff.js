#!/usr/bin/env node
import commander from 'commander';

const program = new commander.Command();

program
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .action((filepath1, filepath2) => {
    console.log(filepath1);
    console.log(filepath2);
  });

program.parse(process.argv);
