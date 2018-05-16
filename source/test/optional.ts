import test from 'ava';
import m from '..';

test('optional', t => {
	t.notThrows(() => m('foo', m.optional.string));
	t.notThrows(() => m(undefined, m.optional.string));
});
