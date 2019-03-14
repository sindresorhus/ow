import test from 'ava';
import ow from '../source';
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
	});

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
	}, '[NOT] Expected string to be empty, got ``');

	t.throws(() => {
		ow('', 'foo', ow.string.not.empty);
	}, '[NOT] Expected string `foo` to be empty, got ``');

	t.throws(() => {
		ow(foo, ow.string.not.empty);
	}, '[NOT] Expected string `foo` to be empty, got ``');
});

test('is', t => {
	const greaterThan = (max: number, x: number) => {
		return x > max || `Expected \`${x}\` to be greater than \`${max}\``;
	};

	t.notThrows(() => {
		ow(1, ow.number.is(x => x < 10));
	});

	t.throws(() => {
		ow(1, ow.number.is(x => x > 10));
	}, 'Expected number `1` to pass custom validation function');

	t.throws(() => {
		ow(1, 'foo', ow.number.is(x => x > 10));
	}, 'Expected number `foo` `1` to pass custom validation function');

	t.throws(() => {
		ow(5, ow.number.is(x => greaterThan(10, x)));
	}, '(number) Expected `5` to be greater than `10`');

	t.throws(() => {
		ow(5, 'foo', ow.number.is(x => greaterThan(10, x)));
	}, '(number `foo`) Expected `5` to be greater than `10`');
});

test('isValid', t => {
	t.true(ow.isValid(1, ow.number));
	t.true(ow.isValid(1, ow.number.equal(1)));
	t.true(ow.isValid('foo!', ow.string.not.alphanumeric));
	t.true(ow.isValid('foo!', ow.any(ow.string, ow.number)));
	t.true(ow.isValid(1, ow.any(ow.string, ow.number)));
	t.false(ow.isValid(1 as any, ow.string));
	t.false(ow.isValid(1 as any, ow.number.greaterThan(2)));
	t.false(ow.isValid(true as any, ow.any(ow.string, ow.number)));
});

test('reusable validator', t => {
	const checkUsername = ow.create(ow.string.minLength(3));

	const value = 'x';

	t.notThrows(() => {
		checkUsername('foo');
	});

	t.notThrows(() => {
		checkUsername('foobar');
	});

	t.throws(() => {
		checkUsername('fo');
	}, 'Expected string to have a minimum length of `3`, got `fo`');

	t.throws(() => {
		checkUsername(value);
	}, 'Expected string `value` to have a minimum length of `3`, got `x`');

	t.throws(() => {
		checkUsername(5 as any);
	}, 'Expected argument to be of type `string` but received type `number`');
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
	}, 'Expected string `foo` to have a minimum length of `3`, got `fo`');

	t.throws(() => {
		checkUsername(5 as any);
	}, 'Expected `foo` to be of type `string` but received type `number`');
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
	}, createAnyError(
		'Expected string to include `.`, got `fo`',
		'Expected string to have a minimum length of `3`, got `fo`'
	));

	t.throws(() => {
		checkUsername(5 as any);
	}, createAnyError(
		'Expected argument to be of type `string` but received type `number`',
		'Expected argument to be of type `string` but received type `number`'
	));
});

test('custom validation function', t => {
	t.throws(() => {
		ow('🦄', 'unicorn', ow.string.validate(value => ({
			message: (label: string) => `Expected ${label} to be \`🌈\`, got \`${value}\``,
			validator: value === '🌈'
		})));
	}, 'Expected string `unicorn` to be `🌈`, got `🦄`');

	t.throws(() => {
		ow('🦄', 'unicorn', ow.string.validate(value => ({
			message: 'Should be `🌈`',
			validator: value === '🌈'
		})));
	}, '(string `unicorn`) Should be `🌈`');
});
