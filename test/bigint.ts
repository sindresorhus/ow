import test from 'ava';
import ow from '../source';

test('bigint', t => {
	t.notThrows(() => {
		ow(BigInt(9007199254740991), ow.bigint);
	});

	t.notThrows(() => {
		ow(9007199254740991n, ow.bigint);
	});

	t.throws(() => {
		ow(10, ow.bigint);
	}, 'Expected argument to be of type `bigint` but received type `number`');
});
