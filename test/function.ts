import test from 'ava';
import ow from '../source';

test('function', t => {
	t.notThrows(() => {
		/* eslint-disable-next-line @typescript-eslint/no-empty-function */
		ow(() => {}, ow.function);
	});

	t.throws(() => {
		ow('foo' as any, ow.function);
	}, 'Expected argument to be of type `Function` but received type `string`');

	t.throws(() => {
		ow('foo' as any, 'foo', ow.function);
	}, 'Expected `foo` to be of type `Function` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.function);
	}, 'Expected argument to be of type `Function` but received type `number`');
});
