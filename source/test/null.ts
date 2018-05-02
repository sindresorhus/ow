import test from 'ava';
import m from '..';

test('null', t => {
	const x = null;

	t.notThrows(() => m(null, m.null));
	t.notThrows(() => m(x, m.null));
	t.throws(() => m(undefined, m.null), 'Expected argument to be of type `null` but received type `undefined`');
	t.throws(() => m('foo', m.null), 'Expected argument to be of type `null` but received type `string`');
});
