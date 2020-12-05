import test from 'ava';
import ow from '../source';

test('optional', t => {
	t.notThrows(() => {
		ow(1, ow.optional.number);
	});

	t.notThrows(() => {
		ow(undefined, ow.optional.number);
	});

	t.notThrows(() => {
		ow(undefined, ow.optional.string.minLength(3));
	});

	t.notThrows(() => {
		ow(undefined, ow.optional.any(ow.string, ow.number));
	});

	t.notThrows(() => {
		ow(undefined, ow.optional.function);
	});

	t.notThrows(() => {
		ow((() => {}) as any as ((() => void) | undefined), ow.optional.function);
	});

	t.throws(() => {
		ow(null, ow.optional.function);
	}, 'Expected argument to be of type `Function` but received type `null`');

	t.throws(() => {
		ow(null, ow.optional.number);
	}, 'Expected argument to be of type `number` but received type `null`');

	t.throws(() => {
		ow('1' as any, ow.optional.number);
	}, 'Expected argument to be of type `number` but received type `string`');
});
