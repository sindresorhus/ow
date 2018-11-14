import test from 'ava';
import m from '..';

test('buffer', t => {
	t.notThrows(() => m(Buffer.alloc(2), m.buffer));
	t.notThrows(() => m(Buffer.from('f'), m.buffer));
	t.throws(() => m('foo' as any, m.buffer), 'Expected argument to be of type `Buffer` but received type `string`');
	t.throws(() => m('foo' as any, 'foo', m.buffer), 'Expected `foo` to be of type `Buffer` but received type `string`');
	t.throws(() => m(12 as any, m.buffer), 'Expected argument to be of type `Buffer` but received type `number`');
});
