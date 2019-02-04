import test from 'ava';
import ow from '../source';

test('nan', t => {
	t.notThrows(() => {
		ow(NaN, ow.nan);
	});

	t.notThrows(() => {
		ow(Number.NaN, ow.nan);
	});

	t.notThrows(() => {
		ow(0 / 0, ow.nan);
	});

	t.throws(() => {
		ow(12, ow.nan);
	}, 'Expected argument to be of type `nan` but received type `number`');

	t.throws(() => {
		ow(12, 'foo', ow.nan);
	}, 'Expected `foo` to be of type `nan` but received type `number`');

	t.throws(() => {
		ow('12' as any, ow.nan);
	}, 'Expected argument to be of type `nan` but received type `string`');
});
