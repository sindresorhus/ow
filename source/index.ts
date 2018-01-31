import {ArgumentError} from './lib/argument-error';
import {Predicate, validatorSymbol, Validator} from './lib/predicates/predicate';
import {StringPredicate} from './lib/predicates/string';
import {NumberPredicate} from './lib/predicates/number';
import {BooleanPredicate} from './lib/predicates/boolean';
import {ArrayPredicate} from './lib/predicates/array';
import {ObjectPredicate} from './lib/predicates/object';
import {DatePredicate} from './lib/predicates/date';
import {ErrorPredicate} from './lib/predicates/error';
import {MapPredicate} from './lib/predicates/map';
import {WeakMapPredicate} from './lib/predicates/weak-map';
import {SetPredicate} from './lib/predicates/set';
import {WeakSetPredicate} from './lib/predicates/weak-set';

/**
 * @hidden
 */
export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

export interface Ow {
	<T>(value: T, predicate: Predicate<T>): void;
	/**
	 * Create a reusable validator.
	 *
	 * @param predicate Predicate used in the validator function.
	 */
	create<T>(predicate: Predicate<T>): (value: T) => void;
	/**
	 * Test the value to be a string.
	 */
	readonly string: StringPredicate;
	/**
	 * Test the value to be a number.
	 */
	readonly number: NumberPredicate;
	/**
	 * Test the value to be a boolean.
	 */
	readonly boolean: BooleanPredicate;
	/**
	 * Test the value to be undefined.
	 */
	readonly undefined: Predicate<undefined>;
	/**
	 * Test the value to be null.
	 */
	readonly null: Predicate<null>;
	/**
	 * Test the value to be null or undefined.
	 */
	readonly nullOrUndefined: Predicate<null | undefined>;
	/**
	 * Test the value to be not a number.
	 */
	readonly nan: Predicate<number>;
	/**
	 * Test the value to be a Symbol.
	 */
	readonly symbol: Predicate<Symbol>;
	/**
	 * Test the value to be an array.
	 */
	readonly array: ArrayPredicate;
	/**
	 * Test the value to be an object.
	 */
	readonly object: ObjectPredicate;
	/**
	 * Test the value to be a Date.
	 */
	readonly date: DatePredicate;
	/**
	 * Test the value to be an Error.
	 */
	readonly error: ErrorPredicate;
	/**
	 * Test the value to be a Map.
	 */
	readonly map: MapPredicate;
	/**
	 * Test the value to be a WeakMap.
	 */
	readonly weakMap: WeakMapPredicate;
	/**
	 * Test the value to be a Set.
	 */
	readonly set: SetPredicate;
	/**
	 * Test the value to be a WeakSet.
	 */
	readonly weakSet: WeakSetPredicate;
	/**
	 * Test the value to be a Function.
	 */
	readonly function: Predicate<Function>;
	/**
	 * Test the value to be a Buffer.
	 */
	readonly buffer: Predicate<Buffer>;
	/**
	 * Test the value to be a RegExp.
	 */
	readonly regExp: Predicate<RegExp>;
	/**
	 * Test the value to be a Promise.
	 */
	readonly promise: Predicate<Promise<any>>;
	/**
	 * Test the value to be a typed array.
	 */
	readonly typedArray: Predicate<TypedArray>;
	/**
	 * Test the value to be a Int8Array.
	 */
	readonly int8Array: Predicate<Int8Array>;
	/**
	 * Test the value to be a Uint8Array.
	 */
	readonly uint8Array: Predicate<Uint8Array>;
	/**
	 * Test the value to be a Uint8ClampedArray.
	 */
	readonly uint8ClampedArray: Predicate<Uint8ClampedArray>;
	/**
	 * Test the value to be a Int16Array.
	 */
	readonly int16Array: Predicate<Int16Array>;
	/**
	 * Test the value to be a Uint16Array.
	 */
	readonly uint16Array: Predicate<Uint16Array>;
	/**
	 * Test the value to be a Int32Array.
	 */
	readonly int32Array: Predicate<Int32Array>;
	/**
	 * Test the value to be a Uint32Array.
	 */
	readonly uint32Array: Predicate<Uint32Array>;
	/**
	 * Test the value to be a Float32Array.
	 */
	readonly float32Array: Predicate<Float32Array>;
	/**
	 * Test the value to be a Float64Array.
	 */
	readonly float64Array: Predicate<Float64Array>;
	/**
	 * Test the value to be a ArrayBuffer.
	 */
	readonly arrayBuffer: Predicate<ArrayBuffer>;
	/**
	 * Test the value to be a DataView.
	 */
	readonly dataView: Predicate<DataView>;
	/**
	 * Test the value to be Iterable.
	 */
	readonly iterable: Predicate<Iterable<any>>;
}

const main = <T>(value: T, predicate: Predicate<T>) => {
	const validators: Validator<any>[] = (predicate as any)[validatorSymbol];

	for (const {validator, message} of validators) {
		const result = validator(value);

		if (typeof result !== 'boolean' || !result) {
			// TODO: Modify the stack output to show the original `ow()` call instead of this `throw` statement
			throw new ArgumentError(message(value, result), main);
		}
	}
};

Object.defineProperties(main, {
	create: {
		value: <T>(predicate: Predicate<T>) => (value: T) => main(value, predicate)
	},
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
	nullOrUndefined: {
		get: () => new Predicate('nullOrUndefined')
	},
	nan: {
		get: () => new Predicate('nan')
	},
	symbol: {
		get: () => new Predicate('symbol')
	},
	array: {
		get: () => new ArrayPredicate()
	},
	object: {
		get: () => new ObjectPredicate()
	},
	date: {
		get: () => new DatePredicate()
	},
	error: {
		get: () => new ErrorPredicate()
	},
	map: {
		get: () => new MapPredicate()
	},
	weakMap: {
		get: () => new WeakMapPredicate()
	},
	set: {
		get: () => new SetPredicate()
	},
	weakSet: {
		get: () => new WeakSetPredicate()
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
	dataView: {
		get: () => new Predicate('dataView')
	},
	iterable: {
		get: () => new Predicate('iterable')
	}
});

export default main as Ow;
