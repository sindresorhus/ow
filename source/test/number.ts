import test from 'ava';
import m from '..';

test('number', t => {
	t.notThrows(() => m(1, m.number));
	t.throws(() => m('12' as any, m.number), 'Expected argument to be of type `number` but received type `string`');
	t.throws(() => m('12' as any, 'foo', m.number), 'Expected `foo` to be of type `number` but received type `string`');
});

test('number.inRange', t => {
	t.notThrows(() => m(10, m.number.inRange(0, 20)));
	t.notThrows(() => m(10, m.number.inRange(10, 20)));
	t.notThrows(() => m(10, m.number.inRange(0, 10)));
	t.throws(() => m(10 as any, m.number.inRange(0, 9)), 'Expected number to be in range [0..9], got 10');
	t.throws(() => m(10 as any, 'foo', m.number.inRange(0, 9)), 'Expected number `foo` to be in range [0..9], got 10');
	t.throws(() => m(10 as any, m.number.inRange(11, 20)), 'Expected number to be in range [11..20], got 10');
});

test('number.greaterThan', t => {
	t.notThrows(() => m(10, m.number.greaterThan(5)));
	t.notThrows(() => m(10, m.number.greaterThan(9)));
	t.throws(() => m(10 as any, m.number.greaterThan(10)), 'Expected number to be greater than 10, got 10');
	t.throws(() => m(10 as any, m.number.greaterThan(11)), 'Expected number to be greater than 11, got 10');
	t.throws(() => m(10 as any, m.number.greaterThan(20)), 'Expected number to be greater than 20, got 10');
});

test('number.greaterThanOrEqual', t => {
	t.notThrows(() => m(10, m.number.greaterThanOrEqual(5)));
	t.notThrows(() => m(10, m.number.greaterThanOrEqual(10)));
	t.throws(() => m(10 as any, m.number.greaterThanOrEqual(11)), 'Expected number to be greater than or equal to 11, got 10');
	t.throws(() => m(10 as any, m.number.greaterThanOrEqual(20)), 'Expected number to be greater than or equal to 20, got 10');
});

test('number.lessThan', t => {
	t.notThrows(() => m(10, m.number.lessThan(20)));
	t.notThrows(() => m(10, m.number.lessThan(11)));
	t.throws(() => m(10 as any, m.number.lessThan(10)), 'Expected number to be less than 10, got 10');
	t.throws(() => m(10 as any, m.number.lessThan(9)), 'Expected number to be less than 9, got 10');
	t.throws(() => m(10 as any, m.number.lessThan(0)), 'Expected number to be less than 0, got 10');
});

test('number.lessThanOrEqual', t => {
	t.notThrows(() => m(10, m.number.lessThanOrEqual(20)));
	t.notThrows(() => m(10, m.number.lessThanOrEqual(10)));
	t.throws(() => m(10 as any, m.number.lessThanOrEqual(9)), 'Expected number to be less than or equal to 9, got 10');
	t.throws(() => m(10 as any, m.number.lessThanOrEqual(0)), 'Expected number to be less than or equal to 0, got 10');
});

test('number.equal', t => {
	t.notThrows(() => m(10, m.number.equal(10)));
	t.throws(() => m(10 as any, m.number.equal(5)), 'Expected number to be equal to 5, got 10');
});

test('number.integer', t => {
	t.notThrows(() => m(10, m.number.integer));
	t.throws(() => m(10.1 as any, m.number.integer), 'Expected number to be an integer, got 10.1');
});

test('number.finite', t => {
	t.notThrows(() => m(10, m.number.finite));
	t.throws(() => m(Infinity as any, m.number.finite), 'Expected number to be finite, got Infinity');
});

test('number.infinite', t => {
	t.notThrows(() => m(Infinity, m.number.infinite));
	t.throws(() => m(10 as any, m.number.infinite), 'Expected number to be infinite, got 10');
});

test('number.positive', t => {
	t.notThrows(() => m(1, m.number.positive));
	t.throws(() => m(-1 as any, m.number.positive), 'Expected number to be positive, got -1');
});

test('number.negative', t => {
	t.notThrows(() => m(-1, m.number.negative));
	t.throws(() => m(1 as any, m.number.negative), 'Expected number to be negative, got 1');
});

test('number.integerOrInfinite', t => {
	t.notThrows(() => m(10, m.number.integerOrInfinite));
	t.notThrows(() => m(Infinity, m.number.integerOrInfinite));
	t.notThrows(() => m(-10, m.number.integerOrInfinite));
	t.throws(() => m(3.14, m.number.integerOrInfinite), 'Expected number to be an integer or infinite, got 3.14');
});
