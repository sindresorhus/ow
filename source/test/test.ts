import test from 'ava';
import m from '..';

test('not', t => {
	t.notThrows(() => m(1, m.number.not.infinite));
	t.notThrows(() => m(1, m.number.not.infinite.greaterThan(5)));
	t.notThrows(() => m('foo!', m.string.not.alphanumeric));
	t.notThrows(() => m('', m.string.not.not.empty));
	t.notThrows(() => m('foo!', m.string.not.not.not.empty));
	t.throws(() => m('', m.string.not.empty), '[NOT] Expected string to be empty, got ``');
	t.throws(() => m('foo!', m.string.not.not.empty), 'Expected string to be empty, got `foo!`');
	t.throws(() => m('', m.string.not.not.not.empty), '[NOT] Expected string to be empty, got ``');
});

test('is', t => {
	const greaterThan = (max: number, x: number) => {
		return x > max || `Expected \`${x}\` to be greater than \`${max}\``;
	};

	t.notThrows(() => m(1, m.number.is(x => x < 10)));
	t.throws(() => m(1, m.number.is(x => x > 10)), 'Expected `1` to pass custom validation function');
	t.throws(() => m(5, m.number.is(x => greaterThan(10, x))), 'Expected `5` to be greater than `10`');
});

test('reusable validator', t => {
	const checkUsername = m.create(m.string.minLength(3));

	t.notThrows(() => checkUsername('foo'));
	t.notThrows(() => checkUsername('foobar'));
	t.throws(() => checkUsername('fo'), 'Expected string to have a minimum length of `3`, got `fo`');
	t.throws(() => checkUsername(5 as any), 'Expected argument to be of type `string` but received type `number`');
});
