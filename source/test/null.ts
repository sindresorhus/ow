import test from 'ava';
import ow from '..';

test('null', t => {
	// tslint:disable-next-line no-null-keyword
	const x = null;

	t.notThrows(() => {
		// tslint:disable-next-line no-null-keyword
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
