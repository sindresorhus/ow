import test from 'ava';
import ow from '../source';

test('iterable', t => {
	t.notThrows(() => {
		ow([], ow.iterable);
	});

	t.notThrows(() => {
		ow('foo', ow.iterable);
	});

	t.notThrows(() => {
		ow(new Map(), ow.iterable);
	});

	t.throws(() => {
		ow(12 as any, ow.iterable);
	}, 'Expected argument to be of type `Iterable` but received type `number`');

	t.throws(() => {
		ow(12 as any, 'foo', ow.iterable);
	}, 'Expected `foo` to be of type `Iterable` but received type `number`');
});
