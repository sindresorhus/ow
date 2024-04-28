<p align="center">
	<img src="media/logo.png" width="300">
	<br>
	<br>
</p>

[![Coverage Status](https://codecov.io/gh/sindresorhus/ow/branch/main/graph/badge.svg)](https://codecov.io/gh/sindresorhus/ow)
[![gzip size](https://badgen.net/bundlephobia/minzip/ow)](https://bundlephobia.com/result?p=ow)
[![install size](https://packagephobia.now.sh/badge?p=ow)](https://packagephobia.now.sh/result?p=ow)

> Function argument validation for humans

For schema validation, I recommend [`zod`](https://github.com/colinhacks/zod).

## Highlights

- Expressive chainable API
- Lots of built-in validations
- Supports custom validations
- Automatic label inference in Node.js
- Written in TypeScript

## Install

```sh
npm install ow
```

## Usage

```ts
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

```ts
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

***Note:*** If you intend on using `ow` for development purposes only, use `import ow from 'ow/dev-only'` instead of the usual `import ow from 'ow'`, and run the bundler with `NODE_ENV` set to `production` (e.g. `$ NODE_ENV="production" parcel build index.js`). This will make `ow` automatically export a shim when running in production, which should result in a significantly lower bundle size.

## API

[Complete API documentation](https://sindresorhus.com/ow/)

Ow includes TypeScript type guards, so using it will narrow the type of previously-unknown values.

```ts
function (input: unknown) {
	input.slice(0, 3) // Error, Property 'slice' does not exist on type 'unknown'

	ow(input, ow.string)

	input.slice(0, 3) // OK
}
```

### ow(value, predicate)

Test if `value` matches the provided `predicate`. Throws an `ArgumentError` if the test fails.

### ow(value, label, predicate)

Test if `value` matches the provided `predicate`. Throws an `ArgumentError` with the specified `label` if the test fails.

The `label` is automatically inferred in Node.js but you can override it by passing in a value for `label`. The automatic label inference doesn't work in the browser.

### ow.isValid(value, predicate)

Returns `true` if the value matches the predicate, otherwise returns `false`.

### ow.create(predicate)

Create a reusable validator.

```ts
const checkPassword = ow.create(ow.string.minLength(6));

const password = 'foo';

checkPassword(password);
//=> ArgumentError: Expected string `password` to have a minimum length of `6`, got `foo`
```

### ow.create(label, predicate)

Create a reusable validator with a specific `label`.

```ts
const checkPassword = ow.create('password', ow.string.minLength(6));

checkPassword('foo');
//=> ArgumentError: Expected string `password` to have a minimum length of `6`, got `foo`
```

### ow.any(...predicate[])

Returns a predicate that verifies if the value matches at least one of the given predicates.

```ts
ow('foo', ow.any(ow.string.maxLength(3), ow.number));
```

### ow.optional.{type}

Makes the predicate optional. An optional predicate means that it doesn't fail if the value is `undefined`.

```ts
ow(1, ow.optional.number);

ow(undefined, ow.optional.number);
```

### ow.{type}

All the below types return a predicate. Every predicate has some extra operators that you can use to test the value even more fine-grained.

[Predicate docs.](https://sindresorhus.com/ow/types/Predicates.html)

#### Primitives

- `undefined`
- `null`
- `string`
- `number`
- `boolean`
- `symbol`

#### Built-in types

- `array`
- `function`
- `buffer`
- `object`
- `regExp`
- `date`
- `error`
- `promise`
- `map`
- `set`
- `weakMap`
- `weakSet`

#### Typed arrays

- `int8Array`
- `uint8Array`
- `uint8ClampedArray`
- `int16Array`
- `uint16Array`
- `int32Array`
- `uint32Array`
- `float32Array`
- `float64Array`

#### Structured data

- `arrayBuffer`
- `dataView`
- `sharedArrayBuffer`

#### Miscellaneous

- `nan`
- `nullOrUndefined`
- `iterable`
- `typedArray`

### Predicates

The following predicates are available on every type.

#### not

Inverts the following predicate.

```ts
ow(1, ow.number.not.infinite);

ow('', ow.string.not.empty);
//=> ArgumentError: Expected string to not be empty, got ``
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

#### validate(fn)

Use a custom validation object. The difference with `is` is that the function should return a validation object, which allows more flexibility.

```ts
ow(1, ow.number.validate(value => ({
	validator: value > 10,
	message: `Expected value to be greater than 10, got ${value}`
})));
//=> ArgumentError: (number) Expected value to be greater than 10, got 1
```

You can also pass in a function as `message` value which accepts the label as argument.

```ts
ow(1, 'input', ow.number.validate(value => ({
	validator: value > 10,
	message: label => `Expected ${label} to be greater than 10, got ${value}`
})));
//=> ArgumentError: Expected number `input` to be greater than 10, got 1
```

#### message(string | fn)

Provide a custom message:

```ts
ow('🌈', 'unicorn', ow.string.equals('🦄').message('Expected unicorn, got rainbow'));
//=> ArgumentError: Expected unicorn, got rainbow
```

You can also pass in a function which receives the value as the first parameter and the label as the second parameter and is expected to return the message.

```ts
ow('🌈', ow.string.minLength(5).message((value, label) => `Expected ${label}, to have a minimum length of 5, got \`${value}\``));
//=> ArgumentError: Expected string, to be have a minimum length of 5, got `🌈`
```

It's also possible to add a separate message per validation:

```ts
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

### TypeScript

**Requires TypeScript 4.7 or later.**

Ow includes a type utility that lets you to extract a TypeScript type from the given predicate.

```ts
import ow, {Infer} from 'ow';

const userPredicate = ow.object.exactShape({
	name: ow.string
});

type User = Infer<typeof userPredicate>;
```

## Related

- [@sindresorhus/is](https://github.com/sindresorhus/is) - Type check values
- [ngx-ow](https://github.com/SamVerschueren/ngx-ow) - Angular form validation on steroids
