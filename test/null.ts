import test from 'ava';
import ow from '../source';

test('null', t => {
	const x = null;

	t.notThrows(() => {
		ow(null, ow.null);
	});

	t.notThrows(() => {
		ow(x, ow.null);
	});

	t.throws(() => {
		ow(undefined as any, ow.null);
	}, 'Expected argument to be of type `null` but received type `undefined`');

	t.throws(() => {
		ow(undefined as any, 'foo', ow.null);
	}, 'Expected `foo` to be of type `null` but received type `undefined`');

	t.throws(() => {
		ow('foo' as any, ow.null);
	}, 'Expected argument to be of type `null` but received type `string`');
});
