import test from 'ava';
import ow from '../source';

test('bigint', t => {
	t.notThrows(() => {
		// eslint-disable-next-line node/no-unsupported-features/es-builtins
		ow(BigInt(9007199254740991), ow.bigint);
	});

	t.notThrows(() => {
		// eslint-disable-next-line node/no-unsupported-features/es-syntax
		ow(9007199254740991n, ow.bigint);
	});

	t.throws(() => {
		ow(10, ow.bigint);
	}, 'Expected argument to be of type `bigint` but received type `number`');
});
