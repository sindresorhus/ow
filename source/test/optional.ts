import test from 'ava';
import m from '..';

test('optional', t => {
	t.notThrows(() => m(1, m.optional.number));
	t.notThrows(() => m(undefined, m.optional.number));
	t.notThrows(() => m(undefined, m.optional.any(m.string, m.number)));
	t.throws(() => m(null, m.optional.number), 'Expected argument to be of type `number` but received type `null`');
	t.throws(() => m('1' as any, m.optional.number), 'Expected argument to be of type `number` but received type `string`');
});
