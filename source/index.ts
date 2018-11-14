import callsites from 'callsites';
import {extractLabel} from './lib/utils/extract-label';
import {Predicate} from './lib/predicates/predicate';
import {AnyPredicate} from './lib/predicates/any';
import {testSymbol, BasePredicate, isPredicate} from './lib/predicates/base-predicate';
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

type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

export interface Ow {
	/**
	 * Test if the value matches the predicate. Throws an `ArgumentError` if the test fails.
	 *
	 * @param value Value to test.
	 * @param predicate Predicate to test against.
	 */
	<T>(value: T, predicate: BasePredicate<T>): void;
	/**
	 * Test if `value` matches the provided `predicate`. Throws an `ArgumentError` with the specified `label` if the test fails.
	 *
	 * @param value Value to test.
	 * @param label Label which should be used in error messages.
	 * @param predicate Predicate to test against.
	 */
	<T>(value: T, label: string, predicate: BasePredicate<T>): void;
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
	/**
	 * Returns `true` if the value matches the predicate, otherwise returns `false`.
	 *
	 * @param value Value to test.
	 * @param predicate Predicate to test against.
	 */
	isValid<T>(value: T, predicate: BasePredicate<T>): value is T;
	/**
	 * Create a reusable validator.
	 *
	 * @param predicate Predicate used in the validator function.
	 */
	create<T>(predicate: BasePredicate<T>): (value: T) => void;
	/**
	 * Create a reusable validator.
	 *
	 * @param label Label which should be used in error messages.
	 * @param predicate Predicate used in the validator function.
	 */
	create<T>(label: string, predicate: BasePredicate<T>): (value: T) => void;
	/**
	 * Test that the value matches at least one of the given predicates.
	 */
	any<T1>(p1: BasePredicate<T1>): AnyPredicate<T1>;
	any<T1, T2>(p1: BasePredicate<T1>, p2: BasePredicate<T2>): AnyPredicate<T1 | T2>;
	any<T1, T2, T3>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>): AnyPredicate<T1 | T2 | T3>;
	any<T1, T2, T3, T4>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>): AnyPredicate<T1 | T2 | T3 | T4>;
	any<T1, T2, T3, T4, T5>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>, p5: BasePredicate<T5>): AnyPredicate<T1 | T2 | T3 | T4 | T5>;
	any<T1, T2, T3, T4, T5, T6>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>, p5: BasePredicate<T5>, p6: BasePredicate<T6>): AnyPredicate<T1 | T2 | T3 | T4 | T5 | T6>;
	any<T1, T2, T3, T4, T5, T6, T7>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>, p5: BasePredicate<T5>, p6: BasePredicate<T6>, p7: BasePredicate<T7>): AnyPredicate<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
	any<T1, T2, T3, T4, T5, T6, T7, T8>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>, p5: BasePredicate<T5>, p6: BasePredicate<T6>, p7: BasePredicate<T7>, p8: BasePredicate<T8>): AnyPredicate<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
	any<T1, T2, T3, T4, T5, T6, T7, T8, T9>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>, p5: BasePredicate<T5>, p6: BasePredicate<T6>, p7: BasePredicate<T7>, p8: BasePredicate<T8>, p9: BasePredicate<T9>): AnyPredicate<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
	any<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(p1: BasePredicate<T1>, p2: BasePredicate<T2>, p3: BasePredicate<T3>, p4: BasePredicate<T4>, p5: BasePredicate<T5>, p6: BasePredicate<T6>, p7: BasePredicate<T7>, p8: BasePredicate<T8>, p9: BasePredicate<T9>, p10: BasePredicate<T10>): AnyPredicate<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
	any(...predicate: BasePredicate[]): AnyPredicate;
}

const main = <T>(value: T, labelOrPredicate: BasePredicate<T> | string | undefined, predicate?: BasePredicate<T>) => {
	let label: any = labelOrPredicate;
	let testPredicate: any = predicate;

	if (isPredicate(labelOrPredicate)) {
		label = extractLabel(callsites());
		testPredicate = labelOrPredicate;
	}

	return testPredicate[testSymbol](value, main, label);
};

Object.defineProperties(main, {
	isValid: {
		value: <T>(value: T, predicate: BasePredicate<T>) => {
			try {
				main(value, predicate);
				return true;
			} catch {
				return false;
			}
		}
	},
	create: {
		value: <T>(labelOrPredicate: BasePredicate<T> | string | undefined, predicate?: BasePredicate<T>) => (value: T) => {
			if (isPredicate(labelOrPredicate)) {
				return main(value, extractLabel(callsites()), labelOrPredicate);
			}

			return main(value, labelOrPredicate, predicate);
		}
	},
	any: {
		value: (...predicates: BasePredicate[]) => new AnyPredicate(predicates)
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
		get: () => new Predicate('Function')
	},
	buffer: {
		get: () => new Predicate('Buffer')
	},
	regExp: {
		get: () => new Predicate('RegExp')
	},
	promise: {
		get: () => new Predicate('Promise')
	},
	typedArray: {
		get: () => new Predicate('TypedArray')
	},
	int8Array: {
		get: () => new Predicate('Int8Array')
	},
	uint8Array: {
		get: () => new Predicate('Uint8Array')
	},
	uint8ClampedArray: {
		get: () => new Predicate('Uint8ClampedArray')
	},
	int16Array: {
		get: () => new Predicate('Int16Array')
	},
	uint16Array: {
		get: () => new Predicate('Uint16Array')
	},
	int32Array: {
		get: () => new Predicate('Int32Array')
	},
	uint32Array: {
		get: () => new Predicate('Uint32Array')
	},
	float32Array: {
		get: () => new Predicate('Float32Array')
	},
	float64Array: {
		get: () => new Predicate('Float64Array')
	},
	arrayBuffer: {
		get: () => new Predicate('ArrayBuffer')
	},
	dataView: {
		get: () => new Predicate('DataView')
	},
	iterable: {
		get: () => new Predicate('Iterable')
	}
});

export default main as Ow;
export {
	BasePredicate,
	Predicate,
	AnyPredicate,
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
	WeakSetPredicate
};
