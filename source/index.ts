import {Predicate, Context} from './lib/predicates/predicate';
import {AnyPredicate} from './lib/predicates/any';
import {testSymbol} from './lib/predicates/base-predicate';
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
import {optional} from './lib/operators/optional';

/**
 * @hidden
 */
export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

export interface Operators {
	/**
	 * Make the value optional.
	 */
	readonly optional: Ow;
}

export interface Ow {
	/**
	 * Test if the value matches the predicate.
	 *
	 * @param value Value to test.
	 * @param predicate Predicate to test against.
	 */
	<T>(value: T, predicate: Predicate<T>): void;
	/**
	 * Create a reusable validator.
	 *
	 * @param predicate Predicate used in the validator function.
	 */
	create<T>(predicate: Predicate<T>): (value: T) => void;
	/**
	 * Test that the value matches at least one of the given predicates.
	 */
	any<T1>(p1: Predicate<T1>): Predicate<T1>;
	any<T1, T2>(p1: Predicate<T1>, p2: Predicate<T2>): Predicate<T1 | T2>;
	any<T1, T2, T3>(p1: Predicate<T1>, p2: Predicate<T2>, p3: Predicate<T3>): Predicate<T1 | T2 | T3>;
	any<T1, T2, T3, T4>(p1: Predicate<T1>, p2: Predicate<T2>, p3: Predicate<T3>, p4: Predicate<T4>): Predicate<T1 | T2 | T3 | T4>;
	any<T1, T2, T3, T4, T5>(p1: Predicate<T1>, p2: Predicate<T2>, p3: Predicate<T3>, p4: Predicate<T4>, p5: Predicate<T5>): Predicate<T1 | T2 | T3 | T4 | T5>;
	any<T1, T2, T3, T4, T5, T6>(p1: Predicate<T1>, p2: Predicate<T2>, p3: Predicate<T3>, p4: Predicate<T4>, p5: Predicate<T5>, p6: Predicate<T6>): Predicate<T1 | T2 | T3 | T4 | T5 | T6>;
	any<T1, T2, T3, T4, T5, T6, T7>(p1: Predicate<T1>, p2: Predicate<T2>, p3: Predicate<T3>, p4: Predicate<T4>, p5: Predicate<T5>, p6: Predicate<T6>, p7: Predicate<T7>): Predicate<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
	any<T1, T2, T3, T4, T5, T6, T7, T8>(p1: Predicate<T1>, p2: Predicate<T2>, p3: Predicate<T3>, p4: Predicate<T4>, p5: Predicate<T5>, p6: Predicate<T6>, p7: Predicate<T7>, p8: Predicate<T8>): Predicate<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
	any<T1, T2, T3, T4, T5, T6, T7, T8, T9>(p1: Predicate<T1>, p2: Predicate<T2>, p3: Predicate<T3>, p4: Predicate<T4>, p5: Predicate<T5>, p6: Predicate<T6>, p7: Predicate<T7>, p8: Predicate<T8>, p9: Predicate<T9>): Predicate<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
	any<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(p1: Predicate<T1>, p2: Predicate<T2>, p3: Predicate<T3>, p4: Predicate<T4>, p5: Predicate<T5>, p6: Predicate<T6>, p7: Predicate<T7>, p8: Predicate<T8>, p9: Predicate<T9>, p10: Predicate<T10>): Predicate<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
	any(...predicate: Predicate[]): Predicate;
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

const ow = (context?: Context<any>) => {
	const main = <T>(value: T, predicate: Predicate<T> | AnyPredicate<T>) => (predicate as any)[testSymbol](value, main);

	Object.defineProperties(main, {
		create: {
			value: <T>(predicate: Predicate<T>) => (value: T) => main(value, predicate)
		},
		any: {
			value: (...predicates: Predicate[]) => new AnyPredicate(predicates)
		},
		optional: {
			get: () => optional(ow, context)
		},
		string: {
			get: () => new StringPredicate(context)
		},
		number: {
			get: () => new NumberPredicate(context)
		},
		boolean: {
			get: () => new BooleanPredicate(context)
		},
		undefined: {
			get: () => new Predicate('undefined', context)
		},
		null: {
			get: () => new Predicate('null', context)
		},
		nullOrUndefined: {
			get: () => new Predicate('nullOrUndefined', context)
		},
		nan: {
			get: () => new Predicate('nan', context)
		},
		symbol: {
			get: () => new Predicate('symbol', context)
		},
		array: {
			get: () => new ArrayPredicate(context)
		},
		object: {
			get: () => new ObjectPredicate(context)
		},
		date: {
			get: () => new DatePredicate(context)
		},
		error: {
			get: () => new ErrorPredicate(context)
		},
		map: {
			get: () => new MapPredicate(context)
		},
		weakMap: {
			get: () => new WeakMapPredicate(context)
		},
		set: {
			get: () => new SetPredicate(context)
		},
		weakSet: {
			get: () => new WeakSetPredicate(context)
		},
		function: {
			get: () => new Predicate('function', context)
		},
		buffer: {
			get: () => new Predicate('buffer', context)
		},
		regExp: {
			get: () => new Predicate('regExp', context)
		},
		promise: {
			get: () => new Predicate('promise', context)
		},
		typedArray: {
			get: () => new Predicate('typedArray', context)
		},
		int8Array: {
			get: () => new Predicate('int8Array', context)
		},
		uint8Array: {
			get: () => new Predicate('uint8Array', context)
		},
		uint8ClampedArray: {
			get: () => new Predicate('uint8ClampedArray', context)
		},
		int16Array: {
			get: () => new Predicate('int16Array', context)
		},
		uint16Array: {
			get: () => new Predicate('uint16Array', context)
		},
		int32Array: {
			get: () => new Predicate('int32Array', context)
		},
		uint32Array: {
			get: () => new Predicate('uint32Array', context)
		},
		float32Array: {
			get: () => new Predicate('float32Array', context)
		},
		float64Array: {
			get: () => new Predicate('float64Array', context)
		},
		arrayBuffer: {
			get: () => new Predicate('arrayBuffer', context)
		},
		dataView: {
			get: () => new Predicate('dataView', context)
		},
		iterable: {
			get: () => new Predicate('iterable', context)
		}
	});

	return main as Ow & Operators;
};

export default ow();
