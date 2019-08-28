import test from 'ava';
import ow from '../source';

test('inverted', t => {
	t.throws(() => {
		ow(1, ow.not.number);
	}, 'Expected argument not to be of type `number`');

	t.throws(() => {
		ow(undefined, ow.not.undefined);
	}, 'Expected argument not to be of type `undefined`');

	t.throws(() => {
		ow(undefined, ow.any(ow.not.undefined, ow.string));
	});

	t.notThrows(() => {
		ow(1, ow.any(ow.not.undefined, ow.number));
	});

	t.notThrows(() => {
		ow('1', ow.not.undefined);
	});

	t.notThrows(() => {
		ow(1, ow.not.undefined);
	});
});
