import test from 'ava';
import m from '..';
import {createError} from './any';

test('not', t => {
	t.notThrows(() => m('foo!', m.string.not.alphanumeric));
	t.notThrows(() => m(1, m.number.not.infinite));
	t.notThrows(() => m(1, m.number.not.infinite.not.greaterThan(5)));
	t.throws(() => m(6, m.number.not.infinite.not.greaterThan(5)));
	t.notThrows(() => m('foo!', m.string.not.alphabetical));
	t.notThrows(() => m('foo!', m.string.not.alphanumeric));
	t.notThrows(() => m('foo!', m.string.label('foo').not.alphanumeric));
	t.notThrows(() => m('foo!', m.string.not.alphanumeric.label('foo')));
	t.notThrows(() => m('FOO!', m.string.not.lowercase));
	t.notThrows(() => m('foo!', m.string.not.uppercase));
	t.throws(() => m('', m.string.not.empty), '[NOT] Expected string to be empty, got ``');
	t.throws(() => m('', m.string.label('foo').not.empty), '[NOT] Expected string `foo` to be empty, got ``');
});

test('is', t => {
	const greaterThan = (max: number, x: number) => {
		return x > max || `Expected \`${x}\` to be greater than \`${max}\``;
	};

	t.notThrows(() => m(1, m.number.is(x => x < 10)));
	t.notThrows(() => m(1, m.number.label('foo').is(x => x < 10)));
	t.throws(() => m(1, m.number.is(x => x > 10)), 'Expected number `1` to pass custom validation function');
	t.throws(() => m(1, m.number.label('foo').is(x => x > 10)), 'Expected number `foo` `1` to pass custom validation function');
	t.throws(() => m(5, m.number.is(x => greaterThan(10, x))), '(number) Expected `5` to be greater than `10`');
	t.throws(() => m(5, m.number.label('foo').is(x => greaterThan(10, x))), '(number `foo`) Expected `5` to be greater than `10`');
});

test('isValid', t => {
	t.true(m.isValid(1, m.number));
	t.true(m.isValid(1, m.number.equal(1)));
	t.true(m.isValid('foo!', m.string.not.alphanumeric));
	t.true(m.isValid('foo!', m.any(m.string, m.number)));
	t.true(m.isValid(1, m.any(m.string, m.number)));
	t.false(m.isValid(1 as any, m.string));
	t.false(m.isValid(1 as any, m.number.greaterThan(2)));
	t.false(m.isValid(true as any, m.any(m.string, m.number)));
});

test('reusable validator', t => {
	const checkUsername = m.create(m.string.minLength(3));

	t.notThrows(() => checkUsername('foo'));
	t.notThrows(() => checkUsername('foobar'));
	t.throws(() => checkUsername('fo'), 'Expected string to have a minimum length of `3`, got `fo`');
	t.throws(() => checkUsername(5 as any), 'Expected argument to be of type `string` but received type `number`');
});

test('reusable validator with label', t => {
	const checkUsername = m.create(m.string.label('foo').minLength(3));

	t.notThrows(() => checkUsername('foo'));
	t.notThrows(() => checkUsername('foobar'));
	t.throws(() => checkUsername('fo'), 'Expected string `foo` to have a minimum length of `3`, got `fo`');
	t.throws(() => checkUsername(5 as any), 'Expected `foo` to be of type `string` but received type `number`');
});

test('any-reusable validator', t => {
	const checkUsername = m.create(m.any(m.string.includes('.'), m.string.minLength(3)));

	t.notThrows(() => checkUsername('foo'));
	t.notThrows(() => checkUsername('f.'));
	t.throws(() => checkUsername('fo'), createError(
		'Expected string to include `.`, got `fo`',
		'Expected string to have a minimum length of `3`, got `fo`'
	));
	t.throws(() => checkUsername(5 as any), createError(
		'Expected argument to be of type `string` but received type `number`',
		'Expected argument to be of type `string` but received type `number`'
	));
});

test('overwrite label', t => {
	t.notThrows(() => m('foo', m.string.label('foo').label('bar')));
	t.throws(() => m(12 as any, m.string.label('foo').label('bar')), 'Expected `bar` to be of type `string` but received type `number`');
});
