import callsites from 'callsites';
import {inferLabel} from './utils/infer-label.js';
import {isPredicate, type BasePredicate} from './predicates/base-predicate.js';
import modifiers, {type Modifiers} from './modifiers.js';
import predicates, {type Predicates} from './predicates.js';
import test from './test.js';
import {ArgumentError} from './argument-error.js';

/**
@hidden
*/
export type Main = <T>(value: T, label: string | Function, predicate: BasePredicate<T>, idLabel?: boolean) => void;

/**
Retrieve the type from the given predicate.

@example
```
import ow, {Infer} from 'ow';

const userPredicate = ow.object.exactShape({
	name: ow.string
});

type User = Infer<typeof userPredicate>;
```
*/
export type Infer<P> = P extends BasePredicate<infer T> ? T : never;

/**
Result of a validation that doesn't throw.

@example
```
import ow, {type ValidateResult} from 'ow';

const result: ValidateResult<string> = ow.validate(value, ow.string);

if (!result.success) {
	console.error(result.error.message);
	return;
}

// result.value is now typed as string
console.log(result.value.length);
```
*/
export type ValidateResult<T> =
	| {success: true; value: T}
	| {success: false; error: ArgumentError};

// Extends is only necessary for the generated documentation to be cleaner. The loaders below infer the correct type.
export type Ow = {
	/**
	Test if the value matches the predicate. Throws an `ArgumentError` if the test fails.

	@param value - Value to test.
	@param predicate - Predicate to test against.
	*/
	<T>(value: unknown, predicate: BasePredicate<T>): asserts value is T;

	/**
	Test if `value` matches the provided `predicate`. Throws an `ArgumentError` with the specified `label` if the test fails.

	@param value - Value to test.
	@param label - Label which should be used in error messages.
	@param predicate - Predicate to test against.
	*/
	<T>(value: unknown, label: string, predicate: BasePredicate<T>): asserts value is T;

	/**
	Returns `true` if the value matches the predicate, otherwise returns `false`.

	@param value - Value to test.
	@param predicate - Predicate to test against.
	*/
	isValid: <T>(value: unknown, predicate: BasePredicate<T>) => value is T;

	/**
	Validate a value against a predicate without throwing. Returns a result object with type narrowing.

	@param value - Value to test.
	@param predicate - Predicate to test against.
	@returns A discriminated union: `{success: true; value: T}` or `{success: false; error: ArgumentError}`.

	@example
	```
	import ow from 'ow';

	const result = ow.validate(value, ow.string);

	if (!result.success) {
		console.error(result.error.message);
		return;
	}

	// result.value is now typed as string
	console.log(result.value.length);
	```
	*/
	validate: (<T>(value: unknown, predicate: BasePredicate<T>) => ValidateResult<T>) & (<T>(value: unknown, label: string, predicate: BasePredicate<T>) => ValidateResult<T>);

	/**
	Test if the provided value is an Ow predicate.

	Useful for building higher-order functions that need to distinguish between predicates and other values.

	@param value - Value to test.
	@returns `true` if the value is an Ow predicate, `false` otherwise.
	*/
	isPredicate: (value: unknown) => value is BasePredicate;

	/**
	Create a reusable validator.

	@param predicate - Predicate used in the validator function.

	@example
	```
	import ow, {type ReusableValidator} from 'ow';

	// Explicit type annotation required for type narrowing
	const checkUsername: ReusableValidator<string> = ow.create(ow.string.minLength(3));

	checkUsername('foo');
	//=> throws ArgumentError
	```
	*/
	create: (<T>(predicate: BasePredicate<T>) => ReusableValidator<T>) & (<T>(label: string, predicate: BasePredicate<T>) => ReusableValidator<T>);
} & Modifiers & Predicates;

/**
A reusable validator.

@example
```
import ow, {type ReusableValidator} from 'ow';

// Explicit type annotation is required for type narrowing to work
const checkUsername: ReusableValidator<string> = ow.create(ow.string.minLength(3));

function setUsername(username: unknown) {
	checkUsername(username);
	// `username` is now typed as `string`
	console.log(username.length);
}
```
*/
export type ReusableValidator<T> = {
	/**
	Test if the value matches the predicate. Throws an `ArgumentError` if the test fails.

	@param value - Value to test.
	@param label - Override the label which should be used in error messages.
	*/
	// eslint-disable-next-line @typescript-eslint/prefer-function-type
	(value: unknown, label?: string): asserts value is T;
};

/**
Turn a `ReusableValidator` into one with a type assertion.

@example
```
const checkUsername = ow.create(ow.string.minLength(3));
const checkUsername_: AssertingValidator<typeof checkUsername> = checkUsername;
```

@example
```
const predicate = ow.string.minLength(3);
const checkUsername: AssertingValidator<typeof predicate> = ow.create(predicate);
```
*/
export type AssertingValidator<T> =
	T extends ReusableValidator<infer R>
		? (value: unknown, label?: string) => asserts value is R
		: T extends BasePredicate<infer R>
			? (value: unknown, label?: string) => asserts value is R
			: never;

const ow = <T>(value: unknown, labelOrPredicate: unknown, predicate?: BasePredicate<T>): void => {
	if (!isPredicate(labelOrPredicate) && typeof labelOrPredicate !== 'string') {
		throw new TypeError(`Expected second argument to be a predicate or a string, got \`${typeof labelOrPredicate}\``);
	}

	if (isPredicate(labelOrPredicate)) {
		// If the second argument is a predicate, infer the label
		const stackFrames = callsites();

		test(value, () => inferLabel(stackFrames), labelOrPredicate);

		return;
	}

	test(value, labelOrPredicate, predicate!);
};

Object.defineProperties(ow, {
	isValid: {
		value<T>(value: unknown, predicate: BasePredicate<T>): boolean {
			try {
				test(value, '', predicate);
				return true;
			} catch {
				return false;
			}
		},
	},
	validate: {
		value<T>(value: unknown, labelOrPredicate: unknown, predicate?: BasePredicate<T>): ValidateResult<T> {
			try {
				if (isPredicate(labelOrPredicate)) {
					// If the second argument is a predicate, infer the label
					const stackFrames = callsites();
					test(value, () => inferLabel(stackFrames), labelOrPredicate);
				} else {
					test(value, labelOrPredicate as string, predicate!);
				}

				return {
					success: true,
					value: value as T,
				};
			} catch (error: unknown) {
				// Ensure we only catch ArgumentError (validation errors), not other errors (bugs)
				if (error instanceof ArgumentError) {
					return {
						success: false,
						error,
					};
				}

				// Re-throw non-validation errors (e.g., bugs in label inference)
				throw error;
			}
		},
	},
	isPredicate: {
		value: isPredicate,
	},
	create: {
		value: <T>(labelOrPredicate: BasePredicate<T> | string | undefined, predicate?: BasePredicate<T>) => (value: unknown, label?: string): asserts value is T => {
			if (isPredicate(labelOrPredicate)) {
				const stackFrames = callsites();

				test(value, label ?? ((): string | void => inferLabel(stackFrames)), labelOrPredicate);

				return;
			}

			test(value, label ?? (labelOrPredicate!), predicate!);
		},
	},
});

// Can't use `export default predicates(modifiers(ow)) as Ow` because the variable needs a type annotation to avoid a compiler error when used:
// Assertions require every name in the call target to be declared with an explicit type annotation.ts(2775)
// See https://github.com/microsoft/TypeScript/issues/36931 for more details.
const _ow: Ow = predicates(modifiers(ow)) as Ow;

export default _ow;

export * from './predicates.js';
export {ArgumentError} from './argument-error.js';
export {isPredicate} from './predicates/base-predicate.js';

export {Predicate} from './predicates/predicate.js';
export type {BasePredicate} from './predicates/base-predicate.js';
export type {PredicateOptions, Validator} from './predicates/predicate.js';
