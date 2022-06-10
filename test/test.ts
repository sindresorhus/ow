import test from 'ava';
import ow, {ArgumentError, AssertingValidator} from '../source';
import {createAnyError} from './fixtures/create-error';

test('not', t => {
	const foo = '';

	t.notThrows(() => {
		ow('foo!', ow.string.not.alphanumeric);
	});

	t.notThrows(() => {
		ow(1, ow.number.not.infinite);
	});

	t.notThrows(() => {
		ow(1, ow.number.not.infinite.not.greaterThan(5));
	});

	t.throws(() => {
		ow(6, ow.number.not.infinite.not.greaterThan(5));
	}, {message: 'Expected number to not be greater than 5, got 6'});

	t.notThrows(() => {
		ow('foo!', ow.string.not.alphabetical);
	});

	t.notThrows(() => {
		ow('foo!', ow.string.not.alphanumeric);
	});

	t.notThrows(() => {
		ow('foo!', 'foo', ow.string.not.alphanumeric);
	});

	t.notThrows(() => {
		ow('FOO!', ow.string.not.lowercase);
	});

	t.notThrows(() => {
		ow('foo!', ow.string.not.uppercase);
	});

	t.throws(() => {
		ow('', ow.string.not.empty);
	}, {message: 'Expected string to not be empty, got ``'});

	t.throws(() => {
		ow('', 'foo', ow.string.not.empty);
	}, {message: 'Expected string `foo` to not be empty, got ``'});

	t.throws(() => {
		ow(foo, ow.string.not.empty);
	}, {message: 'Expected string to not be empty, got ``'});

	t.notThrows(() => {
		ow('a', ow.string.not.minLength(3));
	});
	t.notThrows(() => {
		ow('ab', ow.string.not.minLength(3));
	});
	t.throws(() => {
		ow('abc', ow.string.not.minLength(3));
	}, {message: 'Expected string to have a maximum length of `2`, got `abc`'});

	t.notThrows(() => {
		ow('abcd', ow.string.not.maxLength(2));
	});
	t.notThrows(() => {
		ow('abcdef', ow.string.not.maxLength(2));
	});
	t.throws(() => {
		ow('a', ow.string.not.maxLength(3));
	}, {message: 'Expected string to have a minimum length of `4`, got `a`'});

	t.notThrows(() => {
		ow({a: 1}, ow.object.not.empty);
	});
	t.throws(() => {
		ow({}, ow.object.not.empty);
	}, {message: 'Expected object to not be empty, got `{}`'});

	t.notThrows(() => {
		ow(new Set([1]), ow.set.not.empty);
	});
	t.throws(() => {
		ow(new Set([]), ow.set.not.empty);
	}, {message: 'Expected Set to not be empty, got `[]`'});

	t.notThrows(() => {
		ow(new Set([1]), ow.set.not.minSize(3));
	});
	t.notThrows(() => {
		ow(new Set([1, 2]), ow.set.not.minSize(3));
	});
	t.throws(() => {
		ow(new Set([1, 2, 3]), ow.set.not.minSize(3));
	}, {message: 'Expected Set to have a maximum size of `2`, got `3`'});

	t.notThrows(() => {
		ow(new Set([1, 2]), ow.set.not.maxSize(1));
	});
	t.notThrows(() => {
		ow(new Set([1, 2, 3, 4]), ow.set.not.maxSize(1));
	});
	t.throws(() => {
		ow(new Set([1]), ow.set.not.maxSize(1));
	}, {message: 'Expected Set to have a minimum size of `2`, got `1`'});

	t.notThrows(() => {
		ow(new Map([[1, 1]]), ow.map.not.empty);
	});
	t.throws(() => {
		ow(new Map([]), ow.map.not.empty);
	}, {message: 'Expected Map to not be empty, got `[]`'});

	t.notThrows(() => {
		ow(new Map([[1, 1]]), ow.map.not.minSize(3));
	});
	t.notThrows(() => {
		ow(new Map([[1, 1], [2, 2]]), ow.map.not.minSize(3));
	});
	t.throws(() => {
		ow(new Map([[1, 1], [2, 2], [3, 3]]), ow.map.not.minSize(3));
	}, {message: 'Expected Map to have a maximum size of `2`, got `3`'});

	t.notThrows(() => {
		ow(new Map([[1, 1], [2, 2]]), ow.map.not.maxSize(1));
	});
	t.notThrows(() => {
		ow(new Map([[1, 1], [2, 2], [3, 3]]), ow.map.not.maxSize(1));
	});
	t.throws(() => {
		ow(new Map([[1, 1]]), ow.map.not.maxSize(1));
	}, {message: 'Expected Map to have a minimum size of `2`, got `1`'});

	t.notThrows(() => {
		ow(['foo'], ow.array.not.empty);
	});
	t.throws(() => {
		ow([], ow.array.not.empty);
	}, {message: 'Expected array to not be empty, got `[]`'});

	t.notThrows(() => {
		ow([1], ow.array.not.minLength(3));
	});
	t.notThrows(() => {
		ow([1, 2], ow.array.not.minLength(3));
	});
	t.throws(() => {
		ow([1, 2, 3], ow.array.not.minLength(3));
	}, {message: 'Expected array to have a maximum length of `2`, got `3`'});

	t.notThrows(() => {
		ow([1, 2, 3], ow.array.not.maxLength(2));
	});
	t.notThrows(() => {
		ow([1, 2, 3, 4], ow.array.not.maxLength(2));
	});
	t.throws(() => {
		ow([1], ow.array.not.maxLength(3));
	}, {message: 'Expected array to have a minimum length of `4`, got `1`'});

	t.notThrows(() => {
		ow(new Int8Array(1), ow.typedArray.not.minByteLength(3));
	});
	t.notThrows(() => {
		ow(new Int8Array(2), ow.typedArray.not.minByteLength(3));
	});
	t.throws(() => {
		ow(new Int8Array(3), ow.typedArray.not.minByteLength(3));
	}, {message: 'Expected TypedArray to have a maximum byte length of `2`, got `3`'});

	t.notThrows(() => {
		ow(new Uint8Array(4), ow.typedArray.not.maxByteLength(2));
	});
	t.notThrows(() => {
		ow(new Uint8Array(3), ow.typedArray.not.maxByteLength(2));
	});
	t.throws(() => {
		ow(new Uint8Array(2), ow.typedArray.not.maxByteLength(2));
	}, {message: 'Expected TypedArray to have a minimum byte length of `3`, got `2`'});

	t.notThrows(() => {
		ow(new Uint8ClampedArray(1), ow.typedArray.not.minLength(3));
	});
	t.notThrows(() => {
		ow(new Int16Array(2), ow.typedArray.not.minLength(3));
	});
	t.throws(() => {
		ow(new Float32Array(3), ow.typedArray.not.minLength(3));
	}, {message: 'Expected TypedArray to have a maximum length of `2`, got `3`'});

	t.notThrows(() => {
		ow(new Uint16Array(4), ow.typedArray.not.maxLength(2));
	});
	t.notThrows(() => {
		ow(new Uint32Array(3), ow.typedArray.not.maxLength(2));
	});
	t.throws(() => {
		ow(new Float64Array(2), ow.typedArray.not.maxLength(2));
	}, {message: 'Expected TypedArray to have a minimum length of `3`, got `2`'});

	t.notThrows(() => {
		ow(new ArrayBuffer(1), ow.arrayBuffer.not.minByteLength(3));
	});
	t.notThrows(() => {
		ow(new ArrayBuffer(2), ow.arrayBuffer.not.minByteLength(3));
	});
	t.throws(() => {
		ow(new ArrayBuffer(3), ow.arrayBuffer.not.minByteLength(3));
	}, {message: 'Expected ArrayBuffer to have a maximum byte length of `2`, got `3`'});

	t.notThrows(() => {
		ow(new ArrayBuffer(4), ow.arrayBuffer.not.maxByteLength(2));
	});
	t.notThrows(() => {
		ow(new ArrayBuffer(3), ow.arrayBuffer.not.maxByteLength(2));
	});
	t.throws(() => {
		ow(new ArrayBuffer(2), ow.arrayBuffer.not.maxByteLength(2));
	}, {message: 'Expected ArrayBuffer to have a minimum byte length of `3`, got `2`'});

	t.notThrows(() => {
		ow(new SharedArrayBuffer(4), ow.sharedArrayBuffer.not.maxByteLength(2));
	});
	t.notThrows(() => {
		ow(new SharedArrayBuffer(3), ow.sharedArrayBuffer.not.maxByteLength(2));
	});
	t.throws(() => {
		ow(new SharedArrayBuffer(2), ow.sharedArrayBuffer.not.maxByteLength(2));
	}, {message: 'Expected SharedArrayBuffer to have a minimum byte length of `3`, got `2`'});

	t.notThrows(() => {
		ow(new DataView(new ArrayBuffer(1)), ow.dataView.not.minByteLength(3));
	});
	t.notThrows(() => {
		ow(new DataView(new ArrayBuffer(2)), ow.dataView.not.minByteLength(3));
	});
	t.throws(() => {
		ow(new DataView(new ArrayBuffer(3)), ow.dataView.not.minByteLength(3));
	}, {message: 'Expected DataView to have a maximum byte length of `2`, got `3`'});

	t.notThrows(() => {
		ow(new DataView(new ArrayBuffer(4)), ow.dataView.not.maxByteLength(2));
	});
	t.notThrows(() => {
		ow(new DataView(new ArrayBuffer(3)), ow.dataView.not.maxByteLength(2));
	});
	t.throws(() => {
		ow(new DataView(new ArrayBuffer(2)), ow.dataView.not.maxByteLength(2));
	}, {message: 'Expected DataView to have a minimum byte length of `3`, got `2`'});
});

test('is', t => {
	const greaterThan = (max: number, x: number): string | true => x > max || `Expected \`${x}\` to be greater than \`${max}\``;

	t.notThrows(() => {
		ow(1, ow.number.is(x => x < 10));
	});

	t.throws(() => {
		ow(1, ow.number.is(x => x > 10));
	}, {message: 'Expected number `1` to pass custom validation function'});

	t.throws(() => {
		ow(1, 'foo', ow.number.is(x => x > 10));
	}, {message: 'Expected number `foo` `1` to pass custom validation function'});

	t.throws(() => {
		ow(5, ow.number.is(x => greaterThan(10, x)));
	}, {message: '(number) Expected `5` to be greater than `10`'});

	t.throws(() => {
		ow(5, 'foo', ow.number.is(x => greaterThan(10, x)));
	}, {message: '(number `foo`) Expected `5` to be greater than `10`'});
});

test('isValid', t => {
	t.true(ow.isValid(1, ow.number));
	t.true(ow.isValid(1, ow.number.equal(1)));
	t.true(ow.isValid('foo!', ow.string.not.alphanumeric));
	t.true(ow.isValid('foo!', ow.any(ow.string, ow.number)));
	t.true(ow.isValid(1, ow.any(ow.string, ow.number)));
	t.false(ow.isValid(1, ow.string));
	t.false(ow.isValid(1, ow.number.greaterThan(2)));
	t.false(ow.isValid(true, ow.any(ow.string, ow.number)));
});

test('reusable validator', t => {
	const checkUsername = ow.create(ow.string.minLength(3));
	const checkUsername1: AssertingValidator<typeof checkUsername> = checkUsername;
	const checkUsername2: AssertingValidator<typeof ow.string> = checkUsername;

	const value = 'x';
	const value_ = 'foo' as string | number;

	t.notThrows(() => {
		checkUsername('foo');
	});

	t.notThrows(() => {
		checkUsername('foobar');
	});

	t.notThrows(() => {
		checkUsername1(value_);
		((_: string): void => {})(value_); // The _ function should narrow the type. If it didn't, this would not compile
	});

	t.notThrows(() => {
		checkUsername2(value_);
		((_: string): void => {})(value_); // The __ function should narrow the type. If it didn't, this would not compile
	});

	t.throws(() => {
		checkUsername('fo');
	}, {message: 'Expected string to have a minimum length of `3`, got `fo`'});

	t.throws(() => {
		checkUsername(value);
	}, {message: 'Expected string to have a minimum length of `3`, got `x`'});

	const error = t.throws<ArgumentError>(() => {
		checkUsername(5);
	}, {
		message: [
			'Expected argument to be of type `string` but received type `number`',
			'Expected string to have a minimum length of `3`, got `5`',
		].join('\n'),
	});

	t.is(error.validationErrors.size, 1, 'There is one item in the `validationErrors` map');
	t.true(error.validationErrors.has('string'), 'Validation errors map has key `string`');

	const result1_ = error.validationErrors.get('string')!;

	t.is(result1_.size, 2, 'There are two reported errors for this input');
	t.deepEqual(result1_, new Set([
		'Expected argument to be of type `string` but received type `number`',
		'Expected string to have a minimum length of `3`, got `5`',
	]), 'There is an error for invalid input type, and one for minimum length not being satisfied');
});

test('reusable validator called with label', t => {
	const checkUsername = ow.create(ow.string.minLength(3));

	const value = 'x';
	const label = 'bar';

	t.notThrows(() => {
		checkUsername('foo', label);
	});

	t.notThrows(() => {
		checkUsername('foobar', label);
	});

	t.throws(() => {
		checkUsername('fo', label);
	}, {message: 'Expected string `bar` to have a minimum length of `3`, got `fo`'});

	t.throws(() => {
		checkUsername(value, label);
	}, {message: 'Expected string `bar` to have a minimum length of `3`, got `x`'});

	const error = t.throws<ArgumentError>(() => {
		checkUsername(5, label);
	}, {
		message: [
			'Expected `bar` to be of type `string` but received type `number`',
			'Expected string `bar` to have a minimum length of `3`, got `5`',
		].join('\n'),
	});

	t.is(error.validationErrors.size, 1, 'There is one item in the `validationErrors` map');
	t.true(error.validationErrors.has('bar'), 'Validation errors map has key `bar`');

	const result1_ = error.validationErrors.get('bar')!;

	t.is(result1_.size, 2, 'There are two reported errors for this input');
	t.deepEqual(result1_, new Set([
		'Expected `bar` to be of type `string` but received type `number`',
		'Expected string `bar` to have a minimum length of `3`, got `5`',
	]), 'There is an error for invalid input type, and one for minimum length not being satisfied');
});

test('reusable validator with label', t => {
	const checkUsername = ow.create('foo', ow.string.minLength(3));

	t.notThrows(() => {
		checkUsername('foo');
	});

	t.notThrows(() => {
		checkUsername('foobar');
	});

	t.throws(() => {
		checkUsername('fo');
	}, {message: 'Expected string `foo` to have a minimum length of `3`, got `fo`'});

	const error = t.throws<ArgumentError>(() => {
		checkUsername(5);
	}, {
		message: [
			'Expected `foo` to be of type `string` but received type `number`',
			'Expected string `foo` to have a minimum length of `3`, got `5`',
		].join('\n'),
	});

	t.is(error.validationErrors.size, 1, 'There is one item in the `validationErrors` map');
	t.true(error.validationErrors.has('foo'), 'Validation errors map has key `foo`');

	const result1_ = error.validationErrors.get('foo')!;

	t.is(result1_.size, 2, 'There are two reported errors for this input');
	t.deepEqual(result1_, new Set([
		'Expected `foo` to be of type `string` but received type `number`',
		'Expected string `foo` to have a minimum length of `3`, got `5`',
	]), 'There is an error for invalid input type, and one for minimum length not being satisfied');
});

test('reusable validator with label called with label', t => {
	const checkUsername = ow.create('foo', ow.string.minLength(3));

	const label = 'bar';

	t.notThrows(() => {
		checkUsername('foo', label);
	});

	t.notThrows(() => {
		checkUsername('foobar', label);
	});

	t.throws(() => {
		checkUsername('fo', label);
	}, {message: 'Expected string `bar` to have a minimum length of `3`, got `fo`'});

	const error = t.throws<ArgumentError>(() => {
		checkUsername(5, label);
	}, {
		message: [
			'Expected `bar` to be of type `string` but received type `number`',
			'Expected string `bar` to have a minimum length of `3`, got `5`',
		].join('\n'),
	});

	t.is(error.validationErrors.size, 1, 'There is one item in the `validationErrors` map');
	t.true(error.validationErrors.has('bar'), 'Validation errors map has key `bar`');

	const result1_ = error.validationErrors.get('bar')!;

	t.is(result1_.size, 2, 'There are two reported errors for this input');
	t.deepEqual(result1_, new Set([
		'Expected `bar` to be of type `string` but received type `number`',
		'Expected string `bar` to have a minimum length of `3`, got `5`',
	]), 'There is an error for invalid input type, and one for minimum length not being satisfied');
});

test('any-reusable validator', t => {
	const checkUsername = ow.create(ow.any(ow.string.includes('.'), ow.string.minLength(3)));

	t.notThrows(() => {
		checkUsername('foo');
	});

	t.notThrows(() => {
		checkUsername('f.');
	});

	t.throws(() => {
		checkUsername('fo');
	}, {
		message: createAnyError(
			'Expected string to include `.`, got `fo`',
			'Expected string to have a minimum length of `3`, got `fo`',
		),
	});

	t.throws(() => {
		checkUsername(5);
	}, {
		message: createAnyError(
			'Expected argument to be of type `string` but received type `number`',
			'Expected string to include `.`, got `5`',
			'Expected string to have a minimum length of `3`, got `5`',
		),
	});
});

test('custom validation function', t => {
	t.throws(() => {
		ow('🦄', 'unicorn', ow.string.validate(value => ({
			message: (label): string => `Expected ${label} to be \`🌈\`, got \`${value}\``,
			validator: value === '🌈',
		})));
	}, {message: 'Expected string `unicorn` to be `🌈`, got `🦄`'});

	t.throws(() => {
		ow('🦄', 'unicorn', ow.string.validate(value => ({
			message: 'Should be `🌈`',
			validator: value === '🌈',
		})));
	}, {message: '(string `unicorn`) Should be `🌈`'});

	t.notThrows(() => {
		ow('🦄', 'unicorn', ow.string.validate(value => ({
			message: (label): string => `Expected ${label} to be '🦄', got \`${value}\``,
			validator: value === '🦄',
		})));
	});
});

test('ow without valid arguments', t => {
	t.throws(() => {
		ow(5, {} as any);
	}, {message: 'Expected second argument to be a predicate or a string, got `object`'});

	t.throws(() => {
		ow(5, undefined);
	}, {message: 'Expected second argument to be a predicate or a string, got `undefined`'});
});

// Skipped because require is not defined in esm
// This test is to cover all paths of source/utils/generate-stacks.ts
// test('ow without Error.captureStackTrace', t => {
// 	const originalErrorStackTrace = Error.captureStackTrace;
// 	// @ts-ignore We are manually overwriting this
// 	Error.captureStackTrace = null;

// 	t.throws<ArgumentError>(() => {
// 		ow('owo', ow.string.equals('OwO'));
// 	}, { message: 'Expected string to be equal to `OwO`, got `owo`' });

// 	// eslint-disable-next-line @typescript-eslint/no-var-requires
// 	Object.defineProperty(require('../source/utils/node/is-node'), 'default', {
// 		value: false
// 	});

// 	t.throws<ArgumentError>(() => {
// 		ow('owo', ow.string.equals('OwO'));
// 	}, { message: 'Expected string to be equal to `OwO`, got `owo`' });

// 	// Re-set the properties back to their default values
// 	Error.captureStackTrace = originalErrorStackTrace;

// 	// eslint-disable-next-line @typescript-eslint/no-var-requires
// 	Object.defineProperty(require('../source/utils/node/is-node'), 'default', {
// 		value: true
// 	});
// });

// This test is to cover all paths of source/argument-error.ts
test('ArgumentError with missing errors map', t => {
	function throws(): void {
		throw new ArgumentError('Hi from tests!', throws);
	}

	const error1 = t.throws<ArgumentError>(() => {
		throws();
	}, {message: 'Hi from tests!'});

	t.deepEqual(error1.validationErrors, new Map(), 'Error should default to an empty error map');
});
