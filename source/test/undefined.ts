import test from 'ava';
import m from '..';

test('undefined', t => {
	const x = undefined;
	const y = 12;

	t.notThrows(() => m(undefined, m.undefined));
	t.notThrows(() => m(x, m.undefined));
	t.notThrows(() => m(x, 'foo', m.undefined));
	t.throws(() => m(y as any, m.undefined), 'Expected `y` to be of type `undefined` but received type `number`');
	t.throws(() => m(y as any, 'foo', m.undefined), 'Expected `foo` to be of type `undefined` but received type `number`');
	t.throws(() => m(null as any, m.undefined), 'Expected argument to be of type `undefined` but received type `null`');
	t.throws(() => m('foo' as any, m.undefined), 'Expected argument to be of type `undefined` but received type `string`');
});
