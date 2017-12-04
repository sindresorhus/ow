import {ArgumentError} from './lib/argument-error';
import {Predicate, validatorSymbol} from './lib/predicates/predicate';
import {StringPredicate} from './lib/predicates/string';
import {NumberPredicate} from './lib/predicates/number';
import {BooleanPredicate} from './lib/predicates/boolean';
import {ArrayPredicate} from './lib/predicates/array';
import {DatePredicate} from './lib/predicates/date';
import {ErrorPredicate} from './lib/predicates/error';

export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

export interface Ow {
	(value: any, predicate: Predicate): void;
	/**
	 * Test the value to be a string.
	 */
	string: StringPredicate;
	/**
	 * Test the value to be a number.
	 */
	number: NumberPredicate;
	/**
	 * Test the value to be a boolean.
	 */
	boolean: BooleanPredicate;
	/**
	 * Test the value to be undefined.
	 */
	undefined: Predicate<undefined>;
	/**
	 * Test the value to be null.
	 */
	null: Predicate<null>;
	/**
	 * Test the value to be a Symbol.
	 */
	symbol: Predicate<Symbol>;
	/**
	 * Test the value to be an array.
	 */
	array: ArrayPredicate;
	/**
	 * Test the value to be a Date.
	 */
	date: DatePredicate;
	/**
	 * Test the value to be an Error.
	 */
	error: ErrorPredicate;
	/**
	 * Test the value to be a Function.
	 */
	function: Predicate<Function>;
	/**
	 * Test the value to be a Buffer.
	 */
	buffer: Predicate<Buffer>;
	/**
	 * Test the value to be a RegExp.
	 */
	regExp: Predicate<RegExp>;
	/**
	 * Test the value to be a Promise.
	 */
	promise: Predicate<Promise<any>>;
	/**
	 * Test the value to be a typed array.
	 */
	typedArray: Predicate<TypedArray>;
	/**
	 * Test the value to be a Int8Array.
	 */
	int8Array: Predicate<Int8Array>;
	/**
	 * Test the value to be a Uint8Array.
	 */
	uint8Array: Predicate<Uint8Array>;
	/**
	 * Test the value to be a Uint8ClampedArray.
	 */
	uint8ClampedArray: Predicate<Uint8ClampedArray>;
	/**
	 * Test the value to be a Int16Array.
	 */
	int16Array: Predicate<Int16Array>;
	/**
	 * Test the value to be a Uint16Array.
	 */
	uint16Array: Predicate<Uint16Array>;
	/**
	 * Test the value to be a Int32Array.
	 */
	int32Array: Predicate<Int32Array>;
	/**
	 * Test the value to be a Uint32Array.
	 */
	uint32Array: Predicate<Uint32Array>;
	/**
	 * Test the value to be a Int32Array.
	 */
	float32Array: Predicate<Float64Array>;
	/**
	 * Test the value to be a Uint64Array.
	 */
	float64Array: Predicate<Float64Array>;
	/**
	 * Test the value to be a ArrayBuffer.
	 */
	arrayBuffer: Predicate<ArrayBuffer>;
	/**
	 * Test the value to be Iterable.
	 */
	iterable: Predicate<Iterable<any>>;
}

const main = (value: any, predicate: Predicate) => {
	for (const {validator, message} of predicate[validatorSymbol]) {
		if (!validator(value)) {
			// TODO: Modify the stack output to show the original `ow()` call instead of this `throw` statement
			throw new ArgumentError(message(value), main);
		}
	}
};

Object.defineProperties(main, {
	string: {
		get: () => new StringPredicate()
	},
	number: {
		get: () => new NumberPredicate()
	},
	boolean: {
		get: () => new BooleanPredicate()
	},
	undefined: {
		get: () => new Predicate('undefined')
	},
	null: {
		get: () => new Predicate('null')
	},
	symbol: {
		get: () => new Predicate('symbol')
	},
	array: {
		get: () => new ArrayPredicate()
	},
	date: {
		get: () => new DatePredicate()
	},
	error: {
		get: () => new ErrorPredicate()
	},
	function: {
		get: () => new Predicate('function')
	},
	buffer: {
		get: () => new Predicate('buffer')
	},
	regExp: {
		get: () => new Predicate('regExp')
	},
	promise: {
		get: () => new Predicate('promise')
	},
	typedArray: {
		get: () => new Predicate('typedArray')
	},
	int8Array: {
		get: () => new Predicate('int8Array')
	},
	uint8Array: {
		get: () => new Predicate('uint8Array')
	},
	uint8ClampedArray: {
		get: () => new Predicate('uint8ClampedArray')
	},
	int16Array: {
		get: () => new Predicate('int16Array')
	},
	uint16Array: {
		get: () => new Predicate('uint16Array')
	},
	int32Array: {
		get: () => new Predicate('int32Array')
	},
	uint32Array: {
		get: () => new Predicate('uint32Array')
	},
	float32Array: {
		get: () => new Predicate('float32Array')
	},
	float64Array: {
		get: () => new Predicate('float64Array')
	},
	arrayBuffer: {
		get: () => new Predicate('arrayBuffer')
	},
	iterable: {
		get: () => new Predicate('iterable')
	}
});

export default main as Ow;
