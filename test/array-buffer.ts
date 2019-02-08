import test from 'ava';
import ow from '../source';

test('arrayBuffer', t => {
	t.notThrows(() => {
		ow(new ArrayBuffer(1), ow.arrayBuffer);
	});

	t.notThrows(() => {
		ow(new ArrayBuffer(1), 'foo', ow.arrayBuffer);
	});

	t.throws(() => {
		ow('foo' as any, ow.arrayBuffer);
	}, 'Expected argument to be of type `ArrayBuffer` but received type `string`');

	t.throws(() => {
		ow('foo' as any, 'foo', ow.arrayBuffer);
	}, 'Expected `foo` to be of type `ArrayBuffer` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.arrayBuffer);
	}, 'Expected argument to be of type `ArrayBuffer` but received type `number`');
});
