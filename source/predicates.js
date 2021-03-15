import {StringPredicate} from './predicates/string.js';
import {NumberPredicate} from './predicates/number.js';
import {BooleanPredicate} from './predicates/boolean.js';
import {Predicate} from './predicates/predicate.js';
import {ArrayPredicate} from './predicates/array.js';
import {ObjectPredicate} from './predicates/object.js';
import {DatePredicate} from './predicates/date.js';
import {ErrorPredicate} from './predicates/error.js';
import {MapPredicate} from './predicates/map.js';
import {WeakMapPredicate} from './predicates/weak-map.js';
import {SetPredicate} from './predicates/set.js';
import {WeakSetPredicate} from './predicates/weak-set.js';
import {TypedArrayPredicate} from './predicates/typed-array.js';
import {ArrayBufferPredicate} from './predicates/array-buffer.js';
import {DataViewPredicate} from './predicates/data-view.js';
import {AnyPredicate} from './predicates/any.js';

export default (object, options) => {
	Object.defineProperties(object, {
		string: {
			get: () => new StringPredicate(options)
		},
		number: {
			get: () => new NumberPredicate(options)
		},
		boolean: {
			get: () => new BooleanPredicate(options)
		},
		undefined: {
			get: () => new Predicate('undefined', options)
		},
		null: {
			get: () => new Predicate('null', options)
		},
		nullOrUndefined: {
			get: () => new Predicate('nullOrUndefined', options)
		},
		nan: {
			get: () => new Predicate('nan', options)
		},
		symbol: {
			get: () => new Predicate('symbol', options)
		},
		array: {
			get: () => new ArrayPredicate(options)
		},
		object: {
			get: () => new ObjectPredicate(options)
		},
		date: {
			get: () => new DatePredicate(options)
		},
		error: {
			get: () => new ErrorPredicate(options)
		},
		map: {
			get: () => new MapPredicate(options)
		},
		weakMap: {
			get: () => new WeakMapPredicate(options)
		},
		set: {
			get: () => new SetPredicate(options)
		},
		weakSet: {
			get: () => new WeakSetPredicate(options)
		},
		function: {
			get: () => new Predicate('Function', options)
		},
		buffer: {
			get: () => new Predicate('Buffer', options)
		},
		regExp: {
			get: () => new Predicate('RegExp', options)
		},
		promise: {
			get: () => new Predicate('Promise', options)
		},
		typedArray: {
			get: () => new TypedArrayPredicate('TypedArray', options)
		},
		int8Array: {
			get: () => new TypedArrayPredicate('Int8Array', options)
		},
		uint8Array: {
			get: () => new TypedArrayPredicate('Uint8Array', options)
		},
		uint8ClampedArray: {
			get: () => new TypedArrayPredicate('Uint8ClampedArray', options)
		},
		int16Array: {
			get: () => new TypedArrayPredicate('Int16Array', options)
		},
		uint16Array: {
			get: () => new TypedArrayPredicate('Uint16Array', options)
		},
		int32Array: {
			get: () => new TypedArrayPredicate('Int32Array', options)
		},
		uint32Array: {
			get: () => new TypedArrayPredicate('Uint32Array', options)
		},
		float32Array: {
			get: () => new TypedArrayPredicate('Float32Array', options)
		},
		float64Array: {
			get: () => new TypedArrayPredicate('Float64Array', options)
		},
		arrayBuffer: {
			get: () => new ArrayBufferPredicate('ArrayBuffer', options)
		},
		sharedArrayBuffer: {
			get: () => new ArrayBufferPredicate('SharedArrayBuffer', options)
		},
		dataView: {
			get: () => new DataViewPredicate(options)
		},
		iterable: {
			get: () => new Predicate('Iterable', options)
		},
		any: {
			value: (...predicates) => new AnyPredicate(predicates, options)
		}
	});
	return object;
};

export {StringPredicate, NumberPredicate, BooleanPredicate, ArrayPredicate, ObjectPredicate, DatePredicate, ErrorPredicate, MapPredicate, WeakMapPredicate, SetPredicate, WeakSetPredicate, TypedArrayPredicate, ArrayBufferPredicate, DataViewPredicate, AnyPredicate};
