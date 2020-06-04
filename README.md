backend-project-lvl2
=====================

[![Maintainability](https://api.codeclimate.com/v1/badges/fca0e8017190ee29d60d/maintainability)](https://codeclimate.com/github/kirillbogdanov/backend-project-lvl2/maintainability)
![CI](https://github.com/kirillbogdanov/backend-project-lvl2/workflows/CI/badge.svg)

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
* [`gendiff <filePath1> <filePath2>`](#gendiff-filepath1-filepath2)

## `gendiff <filePath1> <filePath2>`

Compares two configuration files and shows a difference. Works only with **plain** JSON files.

```shell
$ cat before.json
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}
$ cat after.json
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
$ gendif before.json after.json
{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
}
```
