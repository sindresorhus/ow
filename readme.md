# ow [![Build Status](https://travis-ci.org/sindresorhus/ow.svg?branch=master)](https://travis-ci.org/sindresorhus/ow)

> Argument type validation

<img src="header.gif" width="220" align="right">


## Install

```
$ npm install ow
```


## [Docs](https://sindresorhus.com/ow/interfaces/ow.html)


## Usage

```js
const ow = require('ow');

const unicorn = input => {
	ow(input, ow.string.minLength(5));

	…
);

unicorn(3);
//=> ArgumentError: Expected argument to be of type `string` but received type `number`

unicorn('yo');
//=> ArgumentError: Expected string length to be minimum 10
```


## Maintainers

- [Sindre Sorhus](https://github.com/sindresorhus)
- [Sam Verschueren](https://github.com/SamVerschueren)


## License

MIT
