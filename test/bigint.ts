import test from 'ava';
import ow from '../source/index.js';

test('bigint', t => {
	t.notThrows(() => {
		ow(BigInt(9_007_199_254_740_991), ow.bigint);
	});

	// TODO: Enable when targeting Node.js 14.
	// t.notThrows(() => {
	// 	ow(9007199254740991n, ow.bigint);
	// });

	t.throws(() => {
		ow(10, ow.bigint);
	}, {message: 'Expected argument to be of type `bigint` but received type `number`'});
});
