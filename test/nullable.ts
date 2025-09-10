import test from 'ava';
import ow from '../source/index.js';

test('nullable with basic types', t => {
	// Test with string
	t.notThrows(() => {
		ow('hello', ow.nullable.string);
	});

	t.notThrows(() => {
		ow(null, ow.nullable.string);
	});

	t.throws(() => {
		ow(undefined, ow.nullable.string);
	}, {message: 'Expected argument to be of type `string` but received type `undefined`'});

	t.throws(() => {
		ow(123 as any, ow.nullable.string);
	}, {message: 'Expected argument to be of type `string` but received type `number`'});

	// Test with number
	t.notThrows(() => {
		ow(42, ow.nullable.number);
	});

	t.notThrows(() => {
		ow(null, ow.nullable.number);
	});

	t.throws(() => {
		ow(undefined, ow.nullable.number);
	}, {message: 'Expected argument to be of type `number` but received type `undefined`'});

	t.throws(() => {
		ow('42' as any, ow.nullable.number);
	}, {message: 'Expected argument to be of type `number` but received type `string`'});

	// Test with string and additional validators
	t.notThrows(() => {
		ow('hello', ow.nullable.string.minLength(3));
	});

	t.notThrows(() => {
		ow(null, ow.nullable.string.minLength(3));
	});

	t.throws(() => {
		ow('hi', ow.nullable.string.minLength(3));
	}, {message: 'Expected string to have a minimum length of `3`, got `hi`'});

	// Test with object
	t.notThrows(() => {
		ow({}, ow.nullable.object);
	});

	t.notThrows(() => {
		ow(null, ow.nullable.object);
	});

	// Test with function
	t.notThrows(() => {
		ow(() => {}, ow.nullable.function);
	});

	t.notThrows(() => {
		ow(null, ow.nullable.function);
	});

	t.throws(() => {
		ow(undefined, ow.nullable.function);
	}, {message: 'Expected argument to be of type `Function` but received type `undefined`'});

	// Test with any
	t.notThrows(() => {
		ow('string', ow.nullable.any(ow.string, ow.number));
	});

	t.notThrows(() => {
		ow(42, ow.nullable.any(ow.string, ow.number));
	});

	t.notThrows(() => {
		ow(null, ow.nullable.any(ow.string, ow.number));
	});

	t.throws(() => {
		ow(true as any, ow.nullable.any(ow.string, ow.number));
	}, {message: /Any predicate failed/});
});

test('nullable vs optional vs both via any', t => {
	// Nullable only - accepts null but not undefined
	t.notThrows(() => {
		ow('hello', ow.nullable.string);
	});

	t.notThrows(() => {
		ow(null, ow.nullable.string);
	});

	t.throws(() => {
		ow(undefined, ow.nullable.string);
	}, {message: 'Expected argument to be of type `string` but received type `undefined`'});

	// Optional only - accepts undefined but not null
	t.notThrows(() => {
		ow('hello', ow.optional.string);
	});

	t.notThrows(() => {
		ow(undefined, ow.optional.string);
	});

	t.throws(() => {
		ow(null, ow.optional.string);
	}, {message: 'Expected argument to be of type `string` but received type `null`'});

	// To accept both null and undefined, use ow.any
	const nullableOrOptional = ow.any(ow.string, ow.null, ow.undefined);

	t.notThrows(() => {
		ow('hello', nullableOrOptional);
	});

	t.notThrows(() => {
		ow(null, nullableOrOptional);
	});

	t.notThrows(() => {
		ow(undefined, nullableOrOptional);
	});

	t.throws(() => {
		ow(123 as any, nullableOrOptional);
	}, {message: /Any predicate failed/});
});

test('nullable with nullOrUndefined predicate', t => {
	// This is redundant but should still work
	t.notThrows(() => {
		ow(null, ow.nullable.nullOrUndefined);
	});

	t.notThrows(() => {
		ow(undefined, ow.nullable.nullOrUndefined);
	});

	// NullOrUndefined already accepts null, so nullable shouldn't break it
	t.notThrows(() => {
		ow(null, ow.nullOrUndefined);
	});

	t.notThrows(() => {
		ow(undefined, ow.nullOrUndefined);
	});
});

test('nullable with null predicate', t => {
	// Test redundant null predicate with nullable modifier
	t.notThrows(() => {
		ow(null, ow.nullable.null);
	});

	// Regular null predicate
	t.notThrows(() => {
		ow(null, ow.null);
	});

	t.throws(() => {
		ow(undefined, ow.nullable.null);
	}, {message: 'Expected argument to be of type `null` but received type `undefined`'});
});

test('nullable with complex validations', t => {
	// Nullable with object shape validation
	t.notThrows(() => {
		ow({name: 'John', age: 30}, ow.nullable.object.exactShape({
			name: ow.string,
			age: ow.number,
		}));
	});

	t.notThrows(() => {
		ow(null, ow.nullable.object.exactShape({
			name: ow.string,
			age: ow.number,
		}));
	});

	t.throws(() => {
		ow({name: 'John'}, ow.nullable.object.exactShape({
			name: ow.string,
			age: ow.number,
		}));
	}, {message: /Expected property `age` to be of type `number` but received type `undefined`/});

	// Nullable with array validation
	t.notThrows(() => {
		ow([1, 2, 3], ow.nullable.array.ofType(ow.number));
	});

	t.notThrows(() => {
		ow(null, ow.nullable.array.ofType(ow.number));
	});

	t.throws(() => {
		ow(['1', '2', '3'] as any, ow.nullable.array.ofType(ow.number));
	}, {message: /Expected values to be of type `number` but received type `string`/});
});

test('nullable with custom validators', t => {
	// Custom validator with nullable
	const customValidator = ow.nullable.string.validate(value => ({
		validator: value === 'valid',
		message: 'Value must be "valid"',
	}));

	t.notThrows(() => {
		ow('valid', customValidator);
	});

	t.notThrows(() => {
		ow(null, customValidator);
	});

	t.throws(() => {
		ow('invalid', customValidator);
	}, {message: /Value must be "valid"/});
});

test('nullable with not operator', t => {
	// Not operator with nullable
	t.notThrows(() => {
		ow('hello', ow.nullable.string.not.empty);
	});

	t.notThrows(() => {
		ow(null, ow.nullable.string.not.empty);
	});

	t.throws(() => {
		ow('', ow.nullable.string.not.empty);
	}, {message: /Expected string to not be empty/});
});

test('nullable preserves label in error messages', t => {
	t.throws(() => {
		ow(123 as any, 'myVariable', ow.nullable.string);
	}, {message: 'Expected `myVariable` to be of type `string` but received type `number`'});

	t.throws(() => {
		ow(undefined, 'myVariable', ow.nullable.string);
	}, {message: 'Expected `myVariable` to be of type `string` but received type `undefined`'});
});

test('nullable with isValid', t => {
	t.true(ow.isValid('hello', ow.nullable.string));
	t.true(ow.isValid(null, ow.nullable.string));
	t.false(ow.isValid(undefined, ow.nullable.string));
	t.false(ow.isValid(123, ow.nullable.string));
});

test('nullable with create', t => {
	const checkNullableString = ow.create(ow.nullable.string.minLength(3));

	t.notThrows(() => {
		checkNullableString('hello');
	});

	t.notThrows(() => {
		checkNullableString(null);
	});

	t.throws(() => {
		checkNullableString('hi');
	}, {message: 'Expected string to have a minimum length of `3`, got `hi`'});

	t.throws(() => {
		checkNullableString(undefined);
	}, {message: /Expected argument to be of type `string` but received type `undefined`/});

	// With custom label
	const checkNullableNumber = ow.create('myNumber', ow.nullable.number.positive);

	t.throws(() => {
		checkNullableNumber(-5);
	}, {message: 'Expected number `myNumber` to be positive, got -5'});
});
