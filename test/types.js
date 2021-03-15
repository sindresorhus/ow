import test from 'ava';
import {expectTypeOf} from 'expect-type';
import ow from '../source/index.js';
test('type-level tests', t => {
	t.is(typeof typeTests, 'function');
});
// These tests will fail at compile-time, not runtime.
// The function isn't actually called, it's just a way of declaring scoped type-level tests
// that doesn't make the compiler angry about unused variables.
function typeTests(value) {
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
			expectTypeOf(value).toEqualTypeOf();
		},
		() => {
			ow(value, ow.iterable);
			expectTypeOf(value).toEqualTypeOf();
			ow(value, ow.array);
			expectTypeOf(value).toEqualTypeOf();
			ow(value, ow.array.ofType(ow.string));
			expectTypeOf(value).toEqualTypeOf();
		},
		() => {
			ow(value, ow.array.ofType(ow.any(ow.string, ow.number, ow.boolean, ow.nullOrUndefined)));
			expectTypeOf(value).toEqualTypeOf();
		},
		() => {
			ow(value, ow.object);
			expectTypeOf(value).toBeObject();
			ow(value, ow.object.partialShape({
				foo: ow.string
			}));
			expectTypeOf(value).toEqualTypeOf();
			ow(value, ow.object.exactShape({
				foo: ow.string,
				bar: ow.object.exactShape({
					baz: ow.number
				})
			}));
			expectTypeOf(value).toEqualTypeOf();
		},
		() => {
			// To make sure all validators are mapped to the correct type, create a `Tests` type which requires that
			// every property of `ow` has its type-mapping explicitly tested. If more properties are added this will
			// fail until a type assertion is added below.
			const tests = {
				array: expect => expect.toBeArray(),
				arrayBuffer: expect => expect.toEqualTypeOf(),
				boolean: expect => expect.toBeBoolean(),
				buffer: expect => expect.toEqualTypeOf(),
				dataView: expect => expect.toEqualTypeOf(),
				date: expect => expect.toEqualTypeOf(),
				error: expect => expect.toEqualTypeOf(),
				float32Array: expect => expect.toEqualTypeOf(),
				float64Array: expect => expect.toEqualTypeOf(),
				function: expect => expect.toEqualTypeOf(),
				int16Array: expect => expect.toEqualTypeOf(),
				int32Array: expect => expect.toEqualTypeOf(),
				int8Array: expect => expect.toEqualTypeOf(),
				iterable: expect => expect.toEqualTypeOf(),
				map: expect => expect.toEqualTypeOf(),
				nan: expect => expect.toEqualTypeOf(Number.NaN),
				null: expect => expect.toEqualTypeOf(),
				nullOrUndefined: expect => expect.toEqualTypeOf(),
				number: expect => expect.toBeNumber(),
				object: expect => expect.toBeObject(),
				promise: expect => expect.toEqualTypeOf(),
				regExp: expect => expect.toEqualTypeOf(),
				set: expect => expect.toEqualTypeOf(),
				sharedArrayBuffer: expect => expect.toEqualTypeOf(),
				string: expect => expect.toBeString(),
				symbol: expect => expect.toEqualTypeOf(),
				typedArray: expect => expect.toEqualTypeOf(),
				uint16Array: expect => expect.toEqualTypeOf(),
				uint32Array: expect => expect.toEqualTypeOf(),
				uint8Array: expect => expect.toEqualTypeOf(),
				uint8ClampedArray: expect => expect.toEqualTypeOf(),
				undefined: expect => expect.toEqualTypeOf(),
				weakMap: expect => expect.toEqualTypeOf(),
				weakSet: expect => expect.toEqualTypeOf()
			};
			return tests;
		}
	];
}
