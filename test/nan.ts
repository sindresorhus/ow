import test from 'ava';
import ow from '../source/index.js';

test('nan', t => {
	t.notThrows(() => {
		ow(Number.NaN, ow.nan);
	});

	t.notThrows(() => {
		ow(Number.NaN, ow.nan);
	});

	t.notThrows(() => {
		ow(0 / 0, ow.nan);
	});

	t.throws(() => {
		ow(12, ow.nan);
	}, {message: 'Expected argument to be of type `nan` but received type `number`'});

	t.throws(() => {
		ow(12, 'foo', ow.nan);
	}, {message: 'Expected `foo` to be of type `nan` but received type `number`'});

	t.throws(() => {
		ow('12' as any, ow.nan);
	}, {message: 'Expected argument to be of type `nan` but received type `string`'});
});
