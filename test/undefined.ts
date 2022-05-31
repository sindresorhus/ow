import test from 'ava';
import ow from '../source/index.js';

test('undefined', t => {
	const x = undefined;
	const y = 12;

	t.notThrows(() => {
		ow(undefined, ow.undefined);
	});

	t.notThrows(() => {
		ow(x, ow.undefined);
	});

	t.notThrows(() => {
		ow(x, 'foo', ow.undefined);
	});

	t.throws(() => {
		ow(y as any, ow.undefined);
	}, {message: 'Expected argument to be of type `undefined` but received type `number`'});

	t.throws(() => {
		ow(y as any, 'foo', ow.undefined);
	}, {message: 'Expected `foo` to be of type `undefined` but received type `number`'});

	t.throws(() => {
		ow(null as any, ow.undefined);
	}, {message: 'Expected argument to be of type `undefined` but received type `null`'});

	t.throws(() => {
		ow('foo' as any, ow.undefined);
	}, {message: 'Expected argument to be of type `undefined` but received type `string`'});
});
