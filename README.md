backend-project-lvl2
=====================

![CI](https://github.com/kirillbogdanov/backend-project-lvl2/workflows/CI/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/fca0e8017190ee29d60d/maintainability)](https://codeclimate.com/github/kirillbogdanov/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fca0e8017190ee29d60d/test_coverage)](https://codeclimate.com/github/kirillbogdanov/backend-project-lvl2/test_coverage)

* [Requirements](#requirements)
* [Usage](#usage)
* [Commands](#commands)

# Requirements
- Node.js v13.14.0 and later
- npm v6.14.14 and later
- GNU Make v3.81 and later

# Usage
As CLI:
```shell
$ git clone https://github.com/kirillbogdanov/backend-project-lvl2.git
$ cd backend-project-lvl2
$ make install
$ gendiff ../before.json ../after.json
```
As dependency:
```js
import genDiff from '../backend-project-lvl2/src/index.js';

const diff = genDiff(filePath1, filePath2);
console.log(diff);
```

# Commands
* [`gendiff [options] <filePath1> <filePath2>`](#gendiff-options-filepath1-filepath2)

## `gendiff [options] <filePath1> <filePath2>`

```
Usage: gendiff [options] <filePath1> <filePath2>

Compares two configuration files and shows a difference.
Works only with .json, .yml/.yaml and .ini files.

Options:
  -f, --format [type]  output format. 'plain' || 'stylish'  (default: "stylish")
  -V, --version        output the version number
  -h, --help           display help for command
```
### `.json`
[![asciicast](https://asciinema.org/a/mdENRO5bRwkfljeNTZpbJ0p8z.svg)](https://asciinema.org/a/mdENRO5bRwkfljeNTZpbJ0p8z)
### `.yml/.yaml`
[![asciicast](https://asciinema.org/a/lLmZWMd0qNUyUjnvDpr1ee7wA.svg)](https://asciinema.org/a/lLmZWMd0qNUyUjnvDpr1ee7wA)
### `.ini`
[![asciicast](https://asciinema.org/a/182J0UAZN4jf2cfq86PifhjQz.svg)](https://asciinema.org/a/182J0UAZN4jf2cfq86PifhjQz)
