import test from 'ava';
import ow from '../source';

test('promise', t => {
	t.notThrows(() => {
		ow(Promise.resolve(), ow.promise);
	});

	t.notThrows(() => {
		const promise = new Promise<void>(resolve => {
			resolve();
		});
		ow(promise, ow.promise);
	});

	t.throws(() => {
		ow('foo' as any, ow.promise);
	}, 'Expected argument to be of type `Promise` but received type `string`');

	t.throws(() => {
		ow('foo' as any, 'foo', ow.promise);
	}, 'Expected `foo` to be of type `Promise` but received type `string`');

	t.throws(() => {
		ow(12 as any, ow.promise);
	}, 'Expected argument to be of type `Promise` but received type `number`');
});
