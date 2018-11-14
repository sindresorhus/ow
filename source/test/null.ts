import test from 'ava';
import m from '..';

test('null', t => {
	const x = null;

	t.notThrows(() => m(null, m.null));
	t.notThrows(() => m(x, m.null));
	t.throws(() => m(undefined as any, m.null), 'Expected argument to be of type `null` but received type `undefined`');
	t.throws(() => m(undefined as any, 'foo', m.null), 'Expected `foo` to be of type `null` but received type `undefined`');
	t.throws(() => m('foo' as any, m.null), 'Expected argument to be of type `null` but received type `string`');
});
