import test from 'ava';
import m from '..';

test('iterable', t => {
	t.notThrows(() => m([], m.iterable));
	t.notThrows(() => m('foo', m.iterable));
	t.notThrows(() => m(new Map(), m.iterable));
	t.throws(() => m(12 as any, m.iterable), 'Expected argument to be of type `iterable` but received type `number`');
});
