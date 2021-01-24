import callsites from 'callsites';
import {inferLabel} from './utils/infer-label';
import {Predicate} from './predicates/predicate';
import {BasePredicate, isPredicate} from './predicates/base-predicate';
import modifiers, {Modifiers} from './modifiers';
import predicates, {Predicates} from './predicates';
import test from './test';

/**
@hidden
*/
export type Main = <T>(value: T, label: string | Function, predicate: BasePredicate<T>) => void;

// Helper type - when a typearg extends this, the function allows usage only with tuples, as opposed to arrays.
type Tuple<T> =
	| [T]
	| [T, T]
	| [T, T, T]
	| [T, T, T, T]
	| [T, T, T, T, T]
	| [T, T, T, T, T, T]
	| [T, T, T, T, T, T, T]
	| [T, T, T, T, T, T, T, T];

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
	Wrap a function with parameter validation. Useful for writing strongly typed functions which will be called with
	untrusted input.

	@param predicates - Tuple of predicates, corresponding to arguments the function will receive.
	@param body - The function implementation.
	@returns A function with the same type as `body`, but at runtime will first validate the argument list against `predicates`.

	@example
	```
	const add = ow.method([ow.number, ow.number], (a, b) => a + b)

	add(1, 2) // returns 3
	add(1, 'foo') // throws 'Expected element `1` to be of type `number` but received type `string` in array'
	```
	 */
	method<Params extends Tuple<any>, Return>(
		predicates: Extract<{ [K in keyof Params]: BasePredicate<Params[K]> }, any[]>,
		body: (...args: Params) => Return
	): typeof body;

	/**
	Wrap a function with parameter validation. Useful for writing strongly typed functions which will be called with
	untrusted input.

	@param predicates - Tuple of predicates, corresponding to arguments the function will receive.
	@param functionName - A name or label for the function whose arguments will be validated. This will appear in any assertion error messages.
	@param body - The function implementation.
	@returns A function with the same type as `body`, but at runtime will first validate the argument list against `predicates`.

	@example
	```
	const add = ow.method([ow.number, ow.number], 'add', (a, b) => a + b)

	add(1, 2) // returns 3
	add(1, 'foo') // throws 'Expected element `1` to be of type `number` but received type `string` in array'
	```
	 */
	method<Params extends Tuple<any>, Return>(
		predicates: Extract<{ [K in keyof Params]: BasePredicate<Params[K]> }, any[]>,
		functionName: string,
		body: (...args: Params) => Return
	): typeof body;

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
			if (isPredicate(labelOrPredicate)) {
				const stackFrames = callsites();

				test(value, label ?? (() => inferLabel(stackFrames)), labelOrPredicate);

				return;
			}

			test(value, label ?? (labelOrPredicate!), predicate!);
		}
	},
	method: {
		value: (
			predicates: Tuple<BasePredicate>,
			functionNameOrBody: string | Function,
			bodyOrUndefined: Function | undefined
		) => {
			const {functionName, body} = typeof functionNameOrBody === 'string' ?
				{functionName: functionNameOrBody, body: bodyOrUndefined!} :
				{functionName: functionNameOrBody.name, body: functionNameOrBody};

			const label = functionName ? `${functionName}:parameters` : 'parameters';

			const argArrayType = _ow.array.exactShape(predicates);

			return (...args: unknown[]) => {
				_ow(args, label, argArrayType);
				return body(...args);
			};
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
