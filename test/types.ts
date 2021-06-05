import test from 'ava';
import {ExpectTypeOf, expectTypeOf} from 'expect-type';
import {TypedArray} from 'type-fest';
import ow, {BasePredicate} from '../source';

test('type-level tests', t => {
	t.is(typeof typeTests, 'function');
});

type AssertionProps = Exclude<keyof typeof ow, 'any' | 'isValid' | 'create' | 'optional'>;

type Tests = {
	[K in AssertionProps]:
		typeof ow[K] extends BasePredicate<infer T>
			? (type: ExpectTypeOf<T, true>) => void
			: never
};

// These tests will fail at compile-time, not runtime.
// The function isn't actually called, it's just a way of declaring scoped type-level tests
// that doesn't make the compiler angry about unused variables.
function typeTests(value: unknown): Array<(() => void)> {
	return [
		(): void => {
			expectTypeOf(value).toBeUnknown();

			ow(value, ow.string);

			expectTypeOf(value).toBeString();
			expectTypeOf(value).not.toBeNever();

			ow(value, ow.boolean);

			expectTypeOf(value).toBeNever(); // Can't be a string and a boolean!
		},

		(): void => {
			ow(value, 'my-label', ow.number);

			expectTypeOf(value).toBeNumber();
		},

		(): void => {
			ow(value, ow.string.maxLength(7));

			expectTypeOf(value).toBeString();
		},

		(): void => {
			ow(value, ow.optional.string);

			expectTypeOf(value).toEqualTypeOf<string | undefined>();
		},

		(): void => {
			ow(value, ow.iterable);

			expectTypeOf(value).toEqualTypeOf<Iterable<unknown>>();

			ow(value, ow.array);

			expectTypeOf(value).toEqualTypeOf<unknown[]>();

			ow(value, ow.array.ofType(ow.string));

			expectTypeOf(value).toEqualTypeOf<string[]>();
		},

		(): void => {
			ow(value, ow.array.ofType(ow.any(ow.string, ow.number, ow.boolean, ow.nullOrUndefined)));

			expectTypeOf(value).toEqualTypeOf<Array<string | number | boolean | null | undefined>>();
		},

		(): void => {
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

		(): Tests => {
			// To make sure all validators are mapped to the correct type, create a `Tests` type which requires that
			// every property of `ow` has its type-mapping explicitly tested. If more properties are added this will
			// fail until a type assertion is added below.

			const tests: Tests = {
				array: expect => expect.toBeArray(),
				arrayBuffer: expect => expect.toEqualTypeOf<ArrayBuffer>(),
				// @ts-expect-error
				bigint: expect => expect.toEqualTypeOf<BigInt>(),
				boolean: expect => expect.toBeBoolean(),
				buffer: expect => expect.toEqualTypeOf<Buffer>(),
				dataView: expect => expect.toEqualTypeOf<DataView>(),
				date: expect => expect.toEqualTypeOf<Date>(),
				error: expect => expect.toEqualTypeOf<Error>(),
				float32Array: expect => expect.toEqualTypeOf<Float32Array>(),
				float64Array: expect => expect.toEqualTypeOf<Float64Array>(),
				function: expect => expect.toEqualTypeOf<Function>(),
				int16Array: expect => expect.toEqualTypeOf<Int16Array>(),
				int32Array: expect => expect.toEqualTypeOf<Int32Array>(),
				int8Array: expect => expect.toEqualTypeOf<Int8Array>(),
				iterable: expect => expect.toEqualTypeOf<Iterable<unknown>>(),
				map: expect => expect.toEqualTypeOf<Map<unknown, unknown>>(),
				nan: expect => expect.toEqualTypeOf(Number.NaN),
				null: expect => expect.toEqualTypeOf<null>(),
				nullOrUndefined: expect => expect.toEqualTypeOf<null | undefined>(),
				number: expect => expect.toBeNumber(),
				object: expect => expect.toBeObject(),
				promise: expect => expect.toEqualTypeOf<Promise<unknown>>(),
				regExp: expect => expect.toEqualTypeOf<RegExp>(),
				set: expect => expect.toEqualTypeOf<Set<any>>(),
				sharedArrayBuffer: expect => expect.toEqualTypeOf<SharedArrayBuffer>(),
				string: expect => expect.toBeString(),
				symbol: expect => expect.toEqualTypeOf<symbol>(),
				typedArray: expect => expect.toEqualTypeOf<TypedArray>(),
				uint16Array: expect => expect.toEqualTypeOf<Uint16Array>(),
				uint32Array: expect => expect.toEqualTypeOf<Uint32Array>(),
				uint8Array: expect => expect.toEqualTypeOf<Uint8Array>(),
				uint8ClampedArray: expect => expect.toEqualTypeOf<Uint8ClampedArray>(),
				undefined: expect => expect.toEqualTypeOf<undefined>(),
				weakMap: expect => expect.toEqualTypeOf<WeakMap<object, unknown>>(),
				weakSet: expect => expect.toEqualTypeOf<WeakSet<object>>()
			};

			return tests;
		}
	];
}
