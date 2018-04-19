<p align="center">
	<img src="media/logo.png" width="300">
	<br>
	<br>
</p>

[![Build Status](https://travis-ci.org/sindresorhus/ow.svg?branch=master)](https://travis-ci.org/sindresorhus/ow)

> Argument type validation

[View documentation](https://sindresorhus.com/ow/interfaces/ow.html)


## Install

```
$ npm install ow
```


## Usage

```js
import ow from 'ow';

const unicorn = input => {
	ow(input, ow.string.minLength(5));

	…
);

unicorn(3);
//=> ArgumentError: Expected argument to be of type `string` but received type `number`

unicorn('yo');
//=> ArgumentError: Expected string length to be minimum 5
```


## API

### ow(value, predicate)

TODO

### ow.{type}

All the below types return a predicate.

TODO talk about builder pattern?

#### Primitives

- [`undefined`](https://sindresorhus.com/ow/interfaces/ow.html#undefined)
- [`null`](https://sindresorhus.com/ow/interfaces/ow.html#null)
- [`string`](https://sindresorhus.com/ow/interfaces/ow.html#string)
- [`number`](https://sindresorhus.com/ow/interfaces/ow.html#number)
- [`boolean`](https://sindresorhus.com/ow/interfaces/ow.html#boolean)
- [`symbol`](https://sindresorhus.com/ow/interfaces/ow.html#symbol)

#### Built-in types

TODO

#### Typed arrays

- [`int8Array`](https://sindresorhus.com/ow/interfaces/ow.html#int8Array)
- [`uint8Array`](https://sindresorhus.com/ow/interfaces/ow.html#uint8Array)
- [`uint8ClampedArray`](https://sindresorhus.com/ow/interfaces/ow.html#uint8ClampedArray)
- [`int16Array`](https://sindresorhus.com/ow/interfaces/ow.html#int16Array)
- [`uint16Array`](https://sindresorhus.com/ow/interfaces/ow.html#uint16Array)
- [`in32Array`](https://sindresorhus.com/ow/interfaces/ow.html#in32Array)
- [`uin32Array`](https://sindresorhus.com/ow/interfaces/ow.html#uin32Array)
- [`float32Array`](https://sindresorhus.com/ow/interfaces/ow.html#float32Array)
- [`float64Array`](https://sindresorhus.com/ow/interfaces/ow.html#float64Array)


## Maintainers

- [Sindre Sorhus](https://github.com/sindresorhus)
- [Sam Verschueren](https://github.com/SamVerschueren)


## Logo

Logo is based on [Comic Book Elements](https://creativemarket.com/swedishpoints/232087-Comic-Book-Elements) by Carl Eriksson.


## License

MIT
