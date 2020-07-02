backend-project-lvl2
=====================

[![CI](https://github.com/kirillbogdanov/backend-project-lvl2/workflows/CI/badge.svg?branch=master&event=push)](https://github.com/kirillbogdanov/backend-project-lvl2/actions)
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
import genDiff from '../backend-project-lvl2';

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
  -f, --format [type]  output format. "plain" || "stylish" || "json"  (default: "stylish")
  -V, --version        output the version number
  -h, --help           display help for command
```
### `.json`
[![asciicast](https://asciinema.org/a/HP2kkd1ox1XVimCKiwy4DhXWq.svg)](https://asciinema.org/a/HP2kkd1ox1XVimCKiwy4DhXWq)
### `.yml/.yaml`
[![asciicast](https://asciinema.org/a/EH59oggh5yM62LMgzYu0smO3X.svg)](https://asciinema.org/a/EH59oggh5yM62LMgzYu0smO3X)
### `.ini`
[![asciicast](https://asciinema.org/a/MyPmAHd6UgOAP8CYei14XMKSh.svg)](https://asciinema.org/a/MyPmAHd6UgOAP8CYei14XMKSh)
