import test from 'ava';
import ow from '../source/index.js';

test('null', t => {
	const x = null;

	t.notThrows(() => {
		ow(null, ow.null);
	});

	t.notThrows(() => {
		ow(x, ow.null);
	});

	t.throws(() => {
		ow(undefined, ow.null);
	}, {
		message: 'Expected argument to be of type `null` but received type `undefined`'
	});

	t.throws(() => {
		ow(undefined, 'foo', ow.null);
	}, {
		message: 'Expected `foo` to be of type `null` but received type `undefined`'
	});

	t.throws(() => {
		ow('foo', ow.null);
	}, {
		message: 'Expected argument to be of type `null` but received type `string`'
	});
});
