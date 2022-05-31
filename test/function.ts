import test from 'ava';
import ow from '../source/index.js';

test('function', t => {
	t.notThrows(() => {
		ow(() => {}, ow.function);
	});

	t.throws(() => {
		ow('foo' as any, ow.function);
	}, {message: 'Expected argument to be of type `Function` but received type `string`'});

	t.throws(() => {
		ow('foo' as any, 'foo', ow.function);
	}, {message: 'Expected `foo` to be of type `Function` but received type `string`'});

	t.throws(() => {
		ow(12 as any, ow.function);
	}, {message: 'Expected argument to be of type `Function` but received type `number`'});
});
