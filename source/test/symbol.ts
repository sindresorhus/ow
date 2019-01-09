import test from 'ava';
import m from '..';

test('symbol', t => {
	t.notThrows(() => m(Symbol.iterator, m.symbol));
	t.notThrows(() => m(Symbol('foo'), m.symbol));
	t.throws(() => m(12 as any, m.symbol), 'Expected argument to be of type `symbol` but received type `number`');
	t.throws(() => m(12 as any, 'foo', m.symbol), 'Expected `foo` to be of type `symbol` but received type `number`');
});
