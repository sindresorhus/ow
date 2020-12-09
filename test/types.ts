import test from 'ava';
import {expectTypeOf} from 'expect-type';
import {TypedArray} from 'type-fest';
import ow, {BasePredicate} from '../source';

test('type-level tests', t => {
	t.is(typeof typeTests, 'function');
});

// These tests will fail at compile-time, not runtime.
// The function isn't actually called, it's just a way of declaring scoped type-level tests
// that doesn't make the compiler angry about unused variables
function typeTests(value: unknown) {
	return [
		() => {
			expectTypeOf(value).toBeUnknown();

			ow(value, ow.string);

			expectTypeOf(value).toBeString();
			expectTypeOf(value).not.toBeNever();

			ow(value, ow.boolean);

			expectTypeOf(value).toBeNever(); // Can't be a string and a boolean!
		},

		() => {
			ow(value, 'my-label', ow.number);

			expectTypeOf(value).toBeNumber();
		},

		() => {
			ow(value, ow.string.maxLength(7));

			expectTypeOf(value).toBeString();
		},

		() => {
			ow(value, ow.optional.string);

			expectTypeOf(value).toEqualTypeOf<string | undefined>();
		},

		() => {
			ow(value, ow.iterable);

			expectTypeOf(value).toEqualTypeOf<Iterable<unknown>>();

			ow(value, ow.array);

			expectTypeOf(value).toEqualTypeOf<unknown[]>();

			ow(value, ow.array.ofType(ow.string));

			expectTypeOf(value).toEqualTypeOf<string[]>();
		},

		() => {
			ow(value, ow.array.ofType(ow.any(ow.string, ow.number, ow.boolean, ow.nullOrUndefined)));

			expectTypeOf(value).toEqualTypeOf<Array<string | number | boolean | null | undefined>>();
		},

		() => {
			ow(value, ow.object);

			expectTypeOf(value).toBeObject();

			ow(value, ow.object.partialShape({
				foo: ow.string
			}));

			expectTypeOf(value).toEqualTypeOf<{
				foo: string;
			}>();

			ow(value, ow.object.exactShape({
				foo: ow.string,
				bar: ow.object.exactShape({
					baz: ow.number
				})
			}));

			expectTypeOf(value).toEqualTypeOf<{
				foo: string;
				bar: {baz: number};
			}>();
		},

		() => {
			// For the rest of the validators, just make sure they're mapped to the correct type.
			// This helper makes it easy to write a one-line type validation.
			const ensure = <T>(predicate: BasePredicate<T>): T => {
				ow(value, predicate);
				return value;
			};

			expectTypeOf(ensure(ow.arrayBuffer)).toEqualTypeOf<ArrayBuffer>();
			expectTypeOf(ensure(ow.buffer)).toEqualTypeOf<Buffer>();
			expectTypeOf(ensure(ow.dataView)).toEqualTypeOf<DataView>();
			expectTypeOf(ensure(ow.date)).toEqualTypeOf<Date>();
			expectTypeOf(ensure(ow.error)).toEqualTypeOf<Error>();
			expectTypeOf(ensure(ow.float32Array)).toEqualTypeOf<Float32Array>();
			expectTypeOf(ensure(ow.float64Array)).toEqualTypeOf<Float64Array>();
			expectTypeOf(ensure(ow.function)).toEqualTypeOf<Function>();
			expectTypeOf(ensure(ow.int16Array)).toEqualTypeOf<Int16Array>();
			expectTypeOf(ensure(ow.int32Array)).toEqualTypeOf<Int32Array>();
			expectTypeOf(ensure(ow.map)).toEqualTypeOf<Map<unknown, unknown>>();
			expectTypeOf(ensure(ow.int8Array)).toEqualTypeOf<Int8Array>();
			expectTypeOf(ensure(ow.nan)).toEqualTypeOf(Number.NaN);
			expectTypeOf(ensure(ow.null)).toEqualTypeOf<null>();
			expectTypeOf(ensure(ow.nullOrUndefined)).toEqualTypeOf<null | undefined>();
			expectTypeOf(ensure(ow.sharedArrayBuffer)).toEqualTypeOf<SharedArrayBuffer>();
			expectTypeOf(ensure(ow.promise)).toEqualTypeOf<Promise<unknown>>();
			expectTypeOf(ensure(ow.regExp)).toEqualTypeOf<RegExp>();
			expectTypeOf(ensure(ow.set)).toEqualTypeOf<Set<any>>();
			expectTypeOf(ensure(ow.symbol)).toEqualTypeOf<symbol>();
			expectTypeOf(ensure(ow.typedArray)).toEqualTypeOf<TypedArray>();
			expectTypeOf(ensure(ow.uint16Array)).toEqualTypeOf<Uint16Array>();
			expectTypeOf(ensure(ow.uint32Array)).toEqualTypeOf<Uint32Array>();
			expectTypeOf(ensure(ow.uint8Array)).toEqualTypeOf<Uint8Array>();
			expectTypeOf(ensure(ow.uint8ClampedArray)).toEqualTypeOf<Uint8ClampedArray>();
			expectTypeOf(ensure(ow.undefined)).toEqualTypeOf<undefined>();
			expectTypeOf(ensure(ow.weakMap)).toEqualTypeOf<WeakMap<object, unknown>>();
			expectTypeOf(ensure(ow.weakSet)).toEqualTypeOf<WeakSet<object>>();
		}
	];
}
