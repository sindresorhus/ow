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
	}, {message: 'Expected argument to be of type `ArrayBuffer` but received type `string`'});

	t.throws(() => {
		ow('foo' as any, 'foo', ow.arrayBuffer);
	}, {message: 'Expected `foo` to be of type `ArrayBuffer` but received type `string`'});

	t.throws(() => {
		ow(12 as any, ow.arrayBuffer);
	}, {message: 'Expected argument to be of type `ArrayBuffer` but received type `number`'});
});

test('arrayBuffer.byteLength', t => {
	t.notThrows(() => {
		ow(new ArrayBuffer(1), ow.arrayBuffer.byteLength(1));
	});

	t.notThrows(() => {
		ow(new ArrayBuffer(2), ow.arrayBuffer.byteLength(2));
	});

	t.throws(() => {
		ow(new ArrayBuffer(1), ow.arrayBuffer.byteLength(2));
	}, {message: 'Expected ArrayBuffer to have byte length of `2`, got `1`'});

	t.throws(() => {
		ow(new ArrayBuffer(1), 'foo', ow.arrayBuffer.byteLength(2));
	}, {message: 'Expected ArrayBuffer `foo` to have byte length of `2`, got `1`'});
});

test('arrayBuffer.minByteLength', t => {
	t.notThrows(() => {
		ow(new ArrayBuffer(1), ow.arrayBuffer.minByteLength(1));
	});

	t.notThrows(() => {
		ow(new ArrayBuffer(2), ow.arrayBuffer.minByteLength(1));
	});

	t.throws(() => {
		ow(new ArrayBuffer(1), ow.arrayBuffer.minByteLength(2));
	}, {message: 'Expected ArrayBuffer to have a minimum byte length of `2`, got `1`'});
});

test('arrayBuffer.maxByteLength', t => {
	t.notThrows(() => {
		ow(new ArrayBuffer(1), ow.arrayBuffer.maxByteLength(1));
	});

	t.notThrows(() => {
		ow(new ArrayBuffer(2), ow.arrayBuffer.maxByteLength(4));
	});

	t.throws(() => {
		ow(new ArrayBuffer(2), ow.arrayBuffer.maxByteLength(1));
	}, {message: 'Expected ArrayBuffer to have a maximum byte length of `1`, got `2`'});
});
