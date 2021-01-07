import callsites from 'callsites';
import {inferLabel} from './utils/infer-label';
import {Predicate} from './predicates/predicate';
import {BasePredicate, isPredicate} from './predicates/base-predicate';
import modifiers, {Modifiers} from './modifiers';
import predicates, {Predicates} from './predicates';
import test from './test';
import {generateStackTrace} from './utils/generate-stack';

/**
@hidden
*/
export type Main = <T>(value: T, label: string | Function, predicate: BasePredicate<T>, stack: string) => void;

// Extends is only necessary for the generated documentation to be cleaner. The loaders below infer the correct type.
export interface Ow extends Modifiers, Predicates {
	/**
	Returns `true` if the value matches the predicate, otherwise returns `false`.

	@param value - Value to test.
	@param predicate - Predicate to test against.
	*/
	isValid: <T>(value: T, predicate: BasePredicate<T>) => value is T;

	/**
	Create a reusable validator.

	@param predicate - Predicate used in the validator function.
	*/
	create: (<T>(predicate: BasePredicate<T>) => ReusableValidator<T>) & (<T>(label: string, predicate: BasePredicate<T>) => ReusableValidator<T>);

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
}

/**
A reusable validator.
*/
export interface ReusableValidator<T> {
	/**
	Test if the value matches the predicate. Throws an `ArgumentError` if the test fails.

	@param value - Value to test.
	@param label - Override the label which should be used in error messages.
	*/
	// eslint-disable-next-line @typescript-eslint/prefer-function-type
	(value: T, label?: string): void;
}

const ow = <T>(value: T, labelOrPredicate: unknown, predicate?: BasePredicate<T>) => {
	const stack = generateStackTrace();

	if (!isPredicate(labelOrPredicate) && typeof labelOrPredicate !== 'string') {
		throw new TypeError(`Expected second argument to be a predicate or a string, got \`${typeof labelOrPredicate}\``);
	}

	if (isPredicate(labelOrPredicate)) {
		// If the second argument is a predicate, infer the label
		const stackFrames = callsites();

		test(value, () => inferLabel(stackFrames), labelOrPredicate, stack);

		return;
	}

	test(value, labelOrPredicate, predicate as BasePredicate<T>, stack);
};

Object.defineProperties(ow, {
	isValid: {
		value: <T>(value: T, predicate: BasePredicate<T>) => {
			try {
				ow(value, predicate);
				return true;
			} catch {
				return false;
			}
		}
	},
	create: {
		value: <T>(labelOrPredicate: BasePredicate<T> | string | undefined, predicate?: BasePredicate<T>) => (value: T, label?: string) => {
			const stack = generateStackTrace();

			if (isPredicate(labelOrPredicate)) {
				const stackFrames = callsites();

				test(value, label ?? (() => inferLabel(stackFrames)), labelOrPredicate, stack);

				return;
			}

			test(value, label ?? (labelOrPredicate as string), predicate as BasePredicate<T>, stack);
		}
	}
});

// Can't use `export default predicates(modifiers(ow)) as Ow` because the variable needs a type annotation to avoid a compiler error when used:
// Assertions require every name in the call target to be declared with an explicit type annotation.ts(2775)
// See https://github.com/microsoft/TypeScript/issues/36931 for more details.
const _ow: Ow = predicates(modifiers(ow)) as Ow;

export default _ow;

export {BasePredicate, Predicate};

export {
	StringPredicate,
	NumberPredicate,
	BooleanPredicate,
	ArrayPredicate,
	ObjectPredicate,
	DatePredicate,
	ErrorPredicate,
	MapPredicate,
	WeakMapPredicate,
	SetPredicate,
	WeakSetPredicate,
	TypedArrayPredicate,
	ArrayBufferPredicate,
	DataViewPredicate,
	AnyPredicate,
	Shape
} from './predicates';

export {ArgumentError} from './argument-error';
