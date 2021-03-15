<p align="center">
	<img src="media/logo.png" width="300">
	<br>
	<br>
</p>

[![Coverage Status](https://codecov.io/gh/sindresorhus/ow/branch/main/graph/badge.svg)](https://codecov.io/gh/sindresorhus/ow)
[![gzip size](https://badgen.net/bundlephobia/minzip/ow)](https://bundlephobia.com/result?p=ow)
[![install size](https://packagephobia.now.sh/badge?p=ow)](https://packagephobia.now.sh/result?p=ow)

> Function argument validation for humans

**This is a fork of the original [ow repository](https://github.com/sindresorhus/ow), but converted and "rewritten" from ts to modern js.**

The main differences are:

- the package name is `@pumpn/ow`, use `npm install @pumpn/ow`
- minimum required Node version is 14, not 10
- there is no compiled build, just use `import`, which imports the source code
- you can't use `require`, this fork is written in es module syntax
- the default export is `ow` itself, not an object like `{..., default: ow}`
- other than the name in the package.json, links and mentions of the package name will still reference `ow` and `sindresorhus` (including this readme) in case this fork ever gets merged

## Highlights

- Expressive chainable API
- Lots of built-in validations
- Supports custom validations
- Automatic label inference in Node.js
- Written in TypeScript

## Install

```
$ npm install ow
```

## Usage

```js
import ow from 'ow';

const unicorn = input => {
	ow(input, ow.string.minLength(5));

	// …
};

unicorn(3);
//=> ArgumentError: Expected `input` to be of type `string` but received type `number`

unicorn('yo');
//=> ArgumentError: Expected string `input` to have a minimum length of `5`, got `yo`
```

We can also match the shape of an object.

```js
import ow from 'ow';

const unicorn = {
	rainbow: '🌈',
	stars: {
		value: '🌟'
	}
};

ow(unicorn, ow.object.exactShape({
	rainbow: ow.string,
	stars: {
		value: ow.number
	}
}));
//=> ArgumentError: Expected property `stars.value` to be of type `number` but received type `string` in object `unicorn`
```

***Note:*** If you intend on using `ow` for development purposes only, use `require('ow/dev-only')` instead of the usual `import 'ow'`, and run the bundler with `NODE_ENV` set to `production` (e.g. `$ NODE_ENV="production" parcel build index.js`). This will make `ow` automatically export a shim when running in production, which should result in a significantly lower bundle size.

## API

[Complete API documentation](https://sindresorhus.com/ow/interfaces/ow.html)

### ow(value, predicate)

Test if `value` matches the provided `predicate`. Throws an `ArgumentError` if the test fails.

### ow(value, label, predicate)

Test if `value` matches the provided `predicate`. Throws an `ArgumentError` with the specified `label` if the test fails.

The `label` is automatically inferred in Node.js but you can override it by passing in a value for `label`. The automatic label inference doesn't work in the browser.

### ow.isValid(value, predicate)

Returns `true` if the value matches the predicate, otherwise returns `false`.

### ow.create(predicate)

Create a reusable validator.

```js
const checkPassword = ow.create(ow.string.minLength(6));

const password = 'foo';

checkPassword(password);
//=> ArgumentError: Expected string `password` to have a minimum length of `6`, got `foo`
```

### ow.create(label, predicate)

Create a reusable validator with a specific `label`.

```js
const checkPassword = ow.create('password', ow.string.minLength(6));

checkPassword('foo');
//=> ArgumentError: Expected string `password` to have a minimum length of `6`, got `foo`
```

### ow.any(...predicate[])

Returns a predicate that verifies if the value matches at least one of the given predicates.

```js
ow('foo', ow.any(ow.string.maxLength(3), ow.number));
```

### ow.optional.{type}

Makes the predicate optional. An optional predicate means that it doesn't fail if the value is `undefined`.

```js
ow(1, ow.optional.number);

ow(undefined, ow.optional.number);
```

### ow.{type}

All the below types return a predicate. Every predicate has some extra operators that you can use to test the value even more fine-grained.

#### Primitives

- [`undefined`](https://sindresorhus.com/ow/interfaces/ow.html#undefined-1)
- [`null`](https://sindresorhus.com/ow/interfaces/ow.html#null)
- [`string`](https://sindresorhus.com/ow/classes/stringpredicate.html)
- [`number`](https://sindresorhus.com/ow/classes/numberpredicate.html)
- [`boolean`](https://sindresorhus.com/ow/classes/booleanpredicate.html)
- [`symbol`](https://sindresorhus.com/ow/interfaces/ow.html#symbol-1)

#### Built-in types

- [`array`](https://sindresorhus.com/ow/classes/arraypredicate.html)
- [`function`](https://sindresorhus.com/ow/interfaces/ow.html#function)
- [`buffer`](https://sindresorhus.com/ow/interfaces/ow.html#buffer)
- [`object`](https://sindresorhus.com/ow/classes/objectpredicate.html)
- [`regExp`](https://sindresorhus.com/ow/interfaces/ow.html#regexp-1)
- [`date`](https://sindresorhus.com/ow/classes/datepredicate.html)
- [`error`](https://sindresorhus.com/ow/classes/errorpredicate.html)
- [`promise`](https://sindresorhus.com/ow/interfaces/ow.html#promise-1)
- [`map`](https://sindresorhus.com/ow/classes/mappredicate.html)
- [`set`](https://sindresorhus.com/ow/classes/setpredicate.html)
- [`weakMap`](https://sindresorhus.com/ow/classes/weakmappredicate.html)
- [`weakSet`](https://sindresorhus.com/ow/classes/weaksetpredicate.html)

#### Typed arrays

- [`int8Array`](https://sindresorhus.com/ow/interfaces/ow.html#int8Array)
- [`uint8Array`](https://sindresorhus.com/ow/interfaces/ow.html#uint8Array-1)
- [`uint8ClampedArray`](https://sindresorhus.com/ow/interfaces/ow.html#uint8ClampedArray-1)
- [`int16Array`](https://sindresorhus.com/ow/interfaces/ow.html#int16Array)
- [`uint16Array`](https://sindresorhus.com/ow/interfaces/ow.html#uint16Array-1)
- [`int32Array`](https://sindresorhus.com/ow/interfaces/ow.html#in32Array)
- [`uint32Array`](https://sindresorhus.com/ow/interfaces/ow.html#uin32Array-1)
- [`float32Array`](https://sindresorhus.com/ow/interfaces/ow.html#float32Array)
- [`float64Array`](https://sindresorhus.com/ow/interfaces/ow.html#float64Array)

#### Structured data

- [`arrayBuffer`](https://sindresorhus.com/ow/interfaces/ow.html#arraybuffer)
- [`dataView`](https://sindresorhus.com/ow/interfaces/ow.html#dataview)
- [`sharedArrayBuffer`](https://sindresorhus.com/ow/interfaces/ow.html#sharedarraybuffer-1)

#### Miscellaneous

- [`nan`](https://sindresorhus.com/ow/interfaces/ow.html#nan)
- [`nullOrUndefined`](https://sindresorhus.com/ow/interfaces/ow.html#nullorundefined)
- [`iterable`](https://sindresorhus.com/ow/interfaces/ow.html#iterable)
- [`typedArray`](https://sindresorhus.com/ow/interfaces/ow.html#typedarray-1)

### Predicates

The following predicates are available on every type.

#### not

Inverts the following predicate.

```js
ow(1, ow.number.not.infinite);

ow('', ow.string.not.empty);
//=> ArgumentError: Expected string to not be empty, got ``
```

#### is(fn)

Use a custom validation function. Return `true` if the value matches the validation, return `false` if it doesn't.

```js
ow(1, ow.number.is(x => x < 10));

ow(1, ow.number.is(x => x > 10));
//=> ArgumentError: Expected `1` to pass custom validation function
```

Instead of returning `false`, you can also return a custom error message which results in a failure.

```js
const greaterThan = (max: number, x: number) => {
	return x > max || `Expected \`${x}\` to be greater than \`${max}\``;
};

ow(5, ow.number.is(x => greaterThan(10, x)));
//=> ArgumentError: Expected `5` to be greater than `10`
```

#### validate(fn)

Use a custom validation object. The difference with `is` is that the function should return a validation object, which allows more flexibility.

```js
ow(1, ow.number.validate(value => ({
	validator: value > 10,
	message: `Expected value to be greater than 10, got ${value}`
})));
//=> ArgumentError: (number) Expected value to be greater than 10, got 1
```

You can also pass in a function as `message` value which accepts the label as argument.

```js
ow(1, 'input', ow.number.validate(value => ({
	validator: value > 10,
	message: label => `Expected ${label} to be greater than 10, got ${value}`
})));
//=> ArgumentError: Expected number `input` to be greater than 10, got 1
```

#### message(string | fn)

Provide a custom message:

```js
ow('🌈', 'unicorn', ow.string.equals('🦄').message('Expected unicorn, got rainbow'));
//=> ArgumentError: Expected unicorn, got rainbow
```

You can also pass in a function which receives the value as the first parameter and the label as the second parameter and is expected to return the message.

```js
ow('🌈', ow.string.minLength(5).message((value, label) => `Expected ${label}, to have a minimum length of 5, got \`${value}\``));
//=> ArgumentError: Expected string, to be have a minimum length of 5, got `🌈`
```

It's also possible to add a separate message per validation:

```js
ow(
	'1234',
	ow.string
		.minLength(5).message((value, label) => `Expected ${label}, to be have a minimum length of 5, got \`${value}\``)
		.url.message('This is no url')
);
//=> ArgumentError: Expected string, to be have a minimum length of 5, got `1234`

ow(
	'12345',
	ow.string
		.minLength(5).message((value, label) => `Expected ${label}, to be have a minimum length of 5, got \`${value}\``)
		.url.message('This is no url')
);
//=> ArgumentError: This is no url
```

This can be useful for creating your own reusable validators which can be extracted to a separate npm package.

## Maintainers

- [Sindre Sorhus](https://github.com/sindresorhus)
- [Sam Verschueren](https://github.com/SamVerschueren)

## Related

- [@sindresorhus/is](https://github.com/sindresorhus/is) - Type check values
- [ngx-ow](https://github.com/SamVerschueren/ngx-ow) - Angular form validation on steroids
