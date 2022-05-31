import test from 'ava';
import ow from '../source/index.js';

test('nullOrUndefined', t => {
	const x = null;
	const y = undefined;

	t.notThrows(() => {
		ow(null, ow.nullOrUndefined);
	});

	t.notThrows(() => {
		ow(undefined, ow.nullOrUndefined);
	});

	t.notThrows(() => {
		ow(x, ow.nullOrUndefined);
	});

	t.notThrows(() => {
		ow(y, ow.nullOrUndefined);
	});

	t.throws(() => {
		ow('foo' as any, ow.nullOrUndefined);
	}, {message: 'Expected argument to be of type `nullOrUndefined` but received type `string`'});

	t.throws(() => {
		ow('foo' as any, 'foo', ow.nullOrUndefined);
	}, {message: 'Expected `foo` to be of type `nullOrUndefined` but received type `string`'});
});
