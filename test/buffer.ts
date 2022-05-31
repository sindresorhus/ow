import {Buffer} from 'node:buffer';
import test from 'ava';
import ow from '../source/index.js';

test('buffer', t => {
	t.notThrows(() => {
		ow(Buffer.alloc(2), ow.buffer);
	});

	t.notThrows(() => {
		ow(Buffer.from('f'), ow.buffer);
	});

	t.throws(() => {
		ow('foo' as any, ow.buffer);
	}, {message: 'Expected argument to be of type `Buffer` but received type `string`'});

	t.throws(() => {
		ow('foo' as any, 'foo', ow.buffer);
	}, {message: 'Expected `foo` to be of type `Buffer` but received type `string`'});

	t.throws(() => {
		ow(12 as any, ow.buffer);
	}, {message: 'Expected argument to be of type `Buffer` but received type `number`'});
});
