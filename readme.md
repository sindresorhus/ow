<p align="center">
	<img src="media/logo.png" width="300">
	<br>
	<br>
</p>

[![Coverage Status](https://codecov.io/gh/sindresorhus/ow/branch/main/graph/badge.svg)](https://codecov.io/gh/sindresorhus/ow)

> Function argument validation for humans

## Why use Ow?

TypeScript only validates types at compile time. Once compiled, your program can still receive unexpected data at runtime from:

- Function arguments receiving untrusted input
- CLI arguments and flags
- Environment variables and configuration files

For complex schema validation (API responses, database queries, JSON parsing), use [`zod`](https://github.com/colinhacks/zod) instead.

Ow provides runtime validation that:

- **Catches errors early** - Fail fast with descriptive error messages instead of cryptic runtime errors
- **Documents expectations** - Make your code self-documenting by explicitly stating what you expect
- **Simplifies debugging** - Spend less time tracking down type-related bugs in production
- **Works anywhere** - Use the same validation on the server, in the browser, or in CLI tools
- **Provides type guards** - Narrow TypeScript types for safer code after validation

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

## Practical Examples

### Function Arguments

```ts
import ow from 'ow';

const resize = (width: unknown, height: unknown) => {
	ow(width, 'width', ow.number.positive.integer);
	ow(height, 'height', ow.number.positive.integer);
	
	// Process the image...
};

resize(640, 480); // ✓
resize(-100, 200); // ✗ ArgumentError: Expected `width` to be a positive number
resize(640, "480"); // ✗ ArgumentError: Expected `height` to be of type `number`
```

### Configuration Validation

```ts
import ow from 'ow';

const config = {
	port: process.env.PORT,
	apiKey: process.env.API_KEY,
	nodeEnv: process.env.NODE_ENV
};

// Validate configuration at startup
ow(config.port, ow.string.numeric);
ow(config.apiKey, ow.string.minLength(32));
ow(config.nodeEnv, ow.string.oneOf(['development', 'production', 'test']));

// Your app won't start with invalid configuration
const port = parseInt(config.port, 10);
```

### Constructor Validation

```ts
import ow from 'ow';

class User {
	constructor(name: string, email: string, age?: number) {
		ow(name, ow.string.nonEmpty);
		ow(email, ow.string.email);
		ow(age, ow.optional.number.integer.positive.lessThanOrEqual(120));
		
		this.name = name;
		this.email = email;
		this.age = age;
	}
}

new User('Jane', 'jane@example.com', 25); // ✓
new User('', 'jane@example.com'); // ✗ ArgumentError: Expected string to not be empty
```

### Utility Functions

```ts
import ow from 'ow';

const delay = (milliseconds: unknown) => {
	ow(milliseconds, ow.number.positive.integer);
	return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const getRandomInteger = (min: number, max: number) => {
	ow(min, ow.number.integer);
	ow(max, ow.number.integer.greaterThanOrEqual(min));
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
```

### CLI Arguments

```ts
import ow from 'ow';

const cli = (arguments_: string[]) => {
	const [command, ...options] = arguments_;
	
	ow(command, ow.string.oneOf(['build', 'test', 'deploy']));
	
	if (command === 'deploy') {
		const [environment] = options;
		ow(environment, ow.string.oneOf(['staging', 'production']));
	}
	
	// Proceed with validated command
};
```

> [!NOTE]
> If you intend on using `ow` for development purposes only, use `import ow from 'ow/dev-only'` instead of the usual `import ow from 'ow'`, and run the bundler with `NODE_ENV` set to `production` (e.g. `$ NODE_ENV="production" parcel build index.js`). This will make `ow` automatically export a shim when running in production, which should result in a significantly lower bundle size.

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

### ow.validate(value, predicate)

Validate a value against a predicate without throwing. Returns a result object with type narrowing.

```ts
import ow, {type ValidateResult} from 'ow';

const result = ow.validate(value, ow.string);

if (!result.success) {
	console.error(result.error.message);
	return;
}

// result.value is now typed as string
console.log(result.value.length);
```

The return type is a discriminated union:

```ts
type ValidateResult<T> =
	| {success: true; value: T}
	| {success: false; error: ArgumentError};
```

This allows TypeScript to narrow the type based on the `success` property. When `success` is `true`, you can access `value`. When `success` is `false`, you can access `error`.

### ow.validate(value, label, predicate)

Validate a value against a predicate with a custom label without throwing.

```ts
const result = ow.validate(username, 'username', ow.string.minLength(3));

if (!result.success) {
	console.error(result.error.message);
	//=> Expected string `username` to have a minimum length of `3`, got `ab`
}
```

### ow.isPredicate(value)

Test if the provided value is an Ow predicate.

Useful for building higher-order functions that need to distinguish between predicates and other values.

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

### ow.nullable.{type}

Makes the predicate nullable. A nullable predicate means that it doesn't fail if the value is `null`.

```ts
ow(1, ow.nullable.number);

ow(null, ow.nullable.number);
```

This is useful for validating inputs from external sources (like GraphQL APIs) that use `null` to represent absent values. We encourage using `undefined` over `null` in your own APIs, but recognize you can't control what external APIs return. [See our recommendation against using `null`](https://github.com/sindresorhus/meta/issues/7).

### ow.absent.{type}

Marks properties in object shapes as absent, meaning the key can be completely missing from the object. This is different from `optional` which allows both missing keys AND `undefined` values.

```ts
type Hotdog = {
	length: number;
	topping: string;
};

function patchHotdog(hotdog: Hotdog, patchBody: unknown): Hotdog {
	ow(
		patchBody,
		ow.object.exactShape({
			length: ow.absent.number,
			topping: ow.absent.string,
		}),
	);

	return {
		...hotdog,
		...patchBody, // Type-safe object spreading
	};
}

const dog = {length: 10, topping: 'mustard'};

patchHotdog(dog, {length: 12}); // ✓ Partial update
patchHotdog(dog, {}); // ✓ Empty update
patchHotdog(dog, {length: 12, topping: 'ketchup'}); // ✓ Full update
patchHotdog(dog, {length: 'twelve'}); // ✗ Wrong type
```

This is particularly useful for:
- Patch/update operations where missing keys mean "don't change"
- Partial form submissions
- Configuration merging where only specified keys should be overridden

**Key differences from `optional`:**

At runtime, both modifiers allow missing keys. The difference is in how they handle undefined values and type inference:

```ts
// optional: allows missing keys AND undefined values
// Type inference: { name: string | undefined }
ow({}, ow.object.exactShape({
	name: ow.optional.string // ✓ Valid - missing key
}));
ow({name: undefined}, ow.object.exactShape({
	name: ow.optional.string // ✓ Valid - undefined value
}));

// absent: allows missing keys but NOT undefined values
// Type inference: { name?: string }
ow({}, ow.object.exactShape({
	name: ow.absent.string // ✓ Valid - missing key
}));
ow({name: undefined}, ow.object.exactShape({
	name: ow.absent.string // ✗ Invalid - undefined not allowed
}));
```

The key distinction: use `.absent` when missing keys mean "don't change" (patch operations), and `.optional` when undefined is a valid value.

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

#### custom(fn)

Use a custom validation function that throws an error when the validation fails. This is useful for reusing existing validators or composing complex validations.

```ts
import ow from 'ow';

interface User {
	name: string;
	age: number;
}

const validateUser = (user: User) => {
	ow(user.name, 'User.name', ow.string.nonEmpty);
	ow(user.age, 'User.age', ow.number.integer.positive);
};

ow([{name: 'Alice', age: 30}], ow.array.ofType(ow.object.custom(validateUser)));
```

This is particularly useful when you have existing validation functions and want to compose them:

```ts
import ow from 'ow';

interface Animal {
	type: string;
	weight: number;
}

const validateAnimal = (animal: Animal) => {
	ow(animal.type, 'Animal.type', ow.string.oneOf(['dog', 'cat', 'elephant']));
	ow(animal.weight, 'Animal.weight', ow.number.finite.positive);
};

const animals: Animal[] = [
	{type: 'dog', weight: 5},
	{type: 'cat', weight: Number.POSITIVE_INFINITY}
];

ow(animals, ow.array.ofType(ow.object.custom(validateAnimal)));
//=> ArgumentError: (array) (object) Expected number `Animal.weight` to be finite, got Infinity
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

Ow includes a type utility that lets you to extract a TypeScript type from the given predicate.

```ts
import ow, {Infer} from 'ow';

const userPredicate = ow.object.exactShape({
	name: ow.string
});

type User = Infer<typeof userPredicate>;
```

#### Literal Type Narrowing

`string.equals()` and `string.oneOf()` narrow to literal types:

```ts
// ow.string.equals('hello') narrows to 'hello'
// ow.string.oneOf(['red', 'blue']) narrows to 'red' | 'blue'

function validateColor(input: unknown): 'red' | 'blue' {
	ow(input, ow.string.oneOf(['red', 'blue']));
	return input; // TypeScript knows this is 'red' | 'blue'
}
```

### Performance

Ow is designed for runtime validation of function arguments. While it performs well for most use cases, there are a few things to keep in mind for performance-critical apps:

#### Label Inference

By default, Ow automatically infers the label of the validated value from the source code when no explicit label is provided. This requires reading the source file from disk and parsing it, which can be slow in performance-critical scenarios.

To improve performance, always provide an explicit label as the second argument:

```ts
// Slower - label is inferred
ow(username, ow.string);

// Faster - explicit label provided
ow(username, 'username', ow.string);
```

## Related

- [@sindresorhus/is](https://github.com/sindresorhus/is) - Type check values
- [ngx-ow](https://github.com/SamVerschueren/ngx-ow) - Angular form validation on steroids
