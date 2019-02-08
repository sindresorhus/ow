import test from 'ava';
import ow from '../source';

test('symbol', t => {
	t.notThrows(() => {
		ow(Symbol.iterator, ow.symbol);
	});

	t.notThrows(() => {
		ow(Symbol('foo'), ow.symbol);
	});

	t.throws(() => {
		ow(12 as any, ow.symbol);
	}, 'Expected argument to be of type `symbol` but received type `number`');

	t.throws(() => {
		ow(12 as any, 'foo', ow.symbol);
	}, 'Expected `foo` to be of type `symbol` but received type `number`');
});
