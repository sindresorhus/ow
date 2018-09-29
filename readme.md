<p align="center">
	<img src="media/logo.png" width="300">
	<br>
	<br>
</p>

[![Build Status](https://travis-ci.org/sindresorhus/ow.svg?branch=master)](https://travis-ci.org/sindresorhus/ow) [![Coverage Status](https://codecov.io/gh/sindresorhus/ow/branch/master/graph/badge.svg)](https://codecov.io/gh/sindresorhus/ow) [![gzip size](http://img.badgesize.io/https://cdn.jsdelivr.net/npm/ow/dist/index.js?compression=gzip)](https://cdn.jsdelivr.net/npm/ow/dist/index.js) [![install size](https://packagephobia.now.sh/badge?p=ow)](https://packagephobia.now.sh/result?p=ow)

> Function argument validation for humans


## Highlights

- Expressive chainable API
- Lots of built-in validations
- Supports custom validations
- Written in TypeScript


## Install

```
$ npm install ow
```


## Usage

```ts
import ow from 'ow';

const unicorn = input => {
	ow(input, ow.string.minLength(5));

	// …
};

unicorn(3);
//=> ArgumentError: Expected argument to be of type `string` but received type `number`

unicorn('yo');
//=> ArgumentError: Expected string to have a minimum length of `5`, got `yo`
```


## API

[Complete API documentation](https://sindresorhus.com/ow)

### ow(value, predicate)

Test if `value` matches the provided `predicate`.  Throws an `ArgumentError` if the test fails.

### ow.isValid(value, predicate)

Returns `true` if the value matches the predicate, otherwise returns `false`.

### ow.create(predicate)

Create a reusable validator.

```ts
const checkPassword = ow.create(ow.string.minLength(6));

checkPassword('foo');
//=> ArgumentError: Expected string to have a minimum length of `6`, got `foo`
```

### ow.any(...predicate[])

Returns a predicate that verifies if the value matches at least one of the given predicates.

```ts
ow('foo', ow.any(ow.string.maxLength(3), ow.number));
```

### ow.{type}

All the below types return a predicate. Every predicate has some extra operators that you can use to test the value even more fine-grained.

#### Primitives

- [`undefined`](https://sindresorhus.com/ow/interfaces/ow.html#undefined)
- [`null`](https://sindresorhus.com/ow/interfaces/ow.html#null)
- [`string`](https://sindresorhus.com/ow/classes/stringpredicate.html)
- [`number`](https://sindresorhus.com/ow/classes/numberpredicate.html)
- [`boolean`](https://sindresorhus.com/ow/classes/booleanpredicate.html)
- [`symbol`](https://sindresorhus.com/ow/interfaces/ow.html#symbol)

#### Built-in types

- [`array`](https://sindresorhus.com/ow/classes/arraypredicate.html)
- [`function`](https://sindresorhus.com/ow/interfaces/ow.html#function)
- [`buffer`](https://sindresorhus.com/ow/interfaces/ow.html#buffer)
- [`object`](https://sindresorhus.com/ow/classes/objectpredicate.html)
- [`regExp`](https://sindresorhus.com/ow/interfaces/ow.html#regexp)
- [`date`](https://sindresorhus.com/ow/classes/datepredicate.html)
- [`error`](https://sindresorhus.com/ow/classes/errorpredicate.html)
- [`promise`](https://sindresorhus.com/ow/interfaces/ow.html#promise)
- [`map`](https://sindresorhus.com/ow/classes/mappredicate.html)
- [`set`](https://sindresorhus.com/ow/classes/setpredicate.html)
- [`weakMap`](https://sindresorhus.com/ow/classes/weakmappredicate.html)
- [`weakSet`](https://sindresorhus.com/ow/classes/weaksetpredicate.html)

#### Typed arrays

- [`int8Array`](https://sindresorhus.com/ow/interfaces/ow.html#int8Array)
- [`uint8Array`](https://sindresorhus.com/ow/interfaces/ow.html#uint8Array)
- [`uint8ClampedArray`](https://sindresorhus.com/ow/interfaces/ow.html#uint8ClampedArray)
- [`int16Array`](https://sindresorhus.com/ow/interfaces/ow.html#int16Array)
- [`uint16Array`](https://sindresorhus.com/ow/interfaces/ow.html#uint16Array)
- [`int32Array`](https://sindresorhus.com/ow/interfaces/ow.html#in32Array)
- [`uint32Array`](https://sindresorhus.com/ow/interfaces/ow.html#uin32Array)
- [`float32Array`](https://sindresorhus.com/ow/interfaces/ow.html#float32Array)
- [`float64Array`](https://sindresorhus.com/ow/interfaces/ow.html#float64Array)

#### Structured data

- [`arrayBuffer`](https://sindresorhus.com/ow/interfaces/ow.html#arraybuffer)
- [`dataView`](https://sindresorhus.com/ow/interfaces/ow.html#dataview)

#### Miscellaneous

- [`nan`](https://sindresorhus.com/ow/interfaces/ow.html#nan)
- [`nullOrUndefined`](https://sindresorhus.com/ow/interfaces/ow.html#nullorundefined)
- [`iterable`](https://sindresorhus.com/ow/interfaces/ow.html#iterable)
- [`typedArray`](https://sindresorhus.com/ow/interfaces/ow.html#typedarray)

### Predicates

The following predicates are available on every type.

#### not

Inverts the following predicate.

```ts
ow(1, ow.number.not.infinite);

ow('', ow.string.not.empty);
//=> ArgumentError: [NOT] Expected string to be empty, got ``
```

#### is(fn)

Use a custom validation function. Return `true` if the value matches the validation, return `false` if it doesn't.

```ts
ow(1, ow.number.is(x => x < 10));

ow(1, ow.number.is(x => x > 10));
//=> ArgumentError: Expected `1` to pass custom validation function
```

Instead of returning `false`, you can also return a custom error message which results in a failure.

```ts
const greaterThan = (max: number, x: number) => {
	return x > max || `Expected \`${x}\` to be greater than \`${max}\``;
};

ow(5, ow.number.is(x => greaterThan(10, x)));
//=> ArgumentError: Expected `5` to be greater than `10`
```

#### label(string)

This assigns a custom label to be used in any error messages. It is useful for making error messages more user-friendly by including the name of the variable which failed validation.

This predicate does not add any additional validation.

```ts
ow('', ow.string.nonEmpty);
//=> ArgumentError: Expected string to not be empty

ow('', ow.string.label('foo').nonEmpty);
//=> ArgumentError: Expected string `foo` to not be empty
```


## Maintainers

- [Sindre Sorhus](https://github.com/sindresorhus)
- [Sam Verschueren](https://github.com/SamVerschueren)


## Related

- [@sindresorhus/is](https://github.com/sindresorhus/is) - Type check values
- [ngx-ow](https://github.com/SamVerschueren/ngx-ow) - Angular form validation on steroids


## License

MIT
