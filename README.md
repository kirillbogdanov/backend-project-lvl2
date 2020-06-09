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
* [`gendiff <filePath1> <filePath2>`](#gendiff-filepath1-filepath2)

## `gendiff <filePath1> <filePath2>`

Compares two configuration files and shows a difference. Works only with **plain** `.json`, `.yml`/`.yaml` and `.ini` files.
### `.json`
[![asciicast](https://asciinema.org/a/tuD4GRZhpcNWwYCi0SyaSQ8Iv.svg)](https://asciinema.org/a/tuD4GRZhpcNWwYCi0SyaSQ8Iv)
### `.yml/.yaml`
[![asciicast](https://asciinema.org/a/adYYWtFHyPK1bFS9wplEro1DR.svg)](https://asciinema.org/a/adYYWtFHyPK1bFS9wplEro1DR)
### `.ini`
[![asciicast](https://asciinema.org/a/bTTLshrbMFfyMZeUmos6Rp8LE.svg)](https://asciinema.org/a/bTTLshrbMFfyMZeUmos6Rp8LE)
