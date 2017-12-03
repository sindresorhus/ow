import test from 'ava';
import m from '..';

test('buffer', t => {
	t.notThrows(() => m(Buffer.alloc(2), m.buffer));
	t.notThrows(() => m(Buffer.from('f'), m.buffer));
	t.throws(() => m('foo', m.buffer), 'Expected argument to be of type `buffer` but received type `string`');
	t.throws(() => m(12, m.buffer), 'Expected argument to be of type `buffer` but received type `number`');
});
