import test from 'ava';
import m from '..';

test('arrayBuffer', t => {
	t.notThrows(() => m(new ArrayBuffer(1), m.arrayBuffer));
	t.notThrows(() => m(new ArrayBuffer(1), 'foo', m.arrayBuffer));
	t.throws(() => m('foo' as any, m.arrayBuffer), 'Expected argument to be of type `ArrayBuffer` but received type `string`');
	t.throws(() => m('foo' as any, 'foo', m.arrayBuffer), 'Expected `foo` to be of type `ArrayBuffer` but received type `string`');
	t.throws(() => m(12 as any, m.arrayBuffer), 'Expected argument to be of type `ArrayBuffer` but received type `number`');
});
