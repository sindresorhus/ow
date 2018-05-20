import test from 'ava';
import m from '..';

test('symbol', t => {
	t.notThrows(() => m(Symbol.iterator, m.symbol));
	t.notThrows(() => m(Symbol('foo'), m.symbol));
	t.notThrows(() => m(Symbol('foo'), m.symbol.label('foo')));
	t.throws(() => m(12 as any, m.symbol), 'Expected argument to be of type `symbol` but received type `number`');
	t.throws(() => m(12 as any, m.symbol.label('foo')), 'Expected `foo` to be of type `symbol` but received type `number`');
});
