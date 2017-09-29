# ow [![Build Status](https://travis-ci.org/sindresorhus/ow.svg?branch=master)](https://travis-ci.org/sindresorhus/ow)

> Argument type validation

<img src="header.gif" width="220" align="right">


## Install

```
$ npm install ow
```


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


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
