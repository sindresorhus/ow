import test from 'ava';
import m from '..';

test('number', t => {
	t.notThrows(() => m(1, m.number));
	t.notThrows(() => m(1, m.number.label('foo')));
	t.throws(() => m('12' as any, m.number), 'Expected argument to be of type `number` but received type `string`');
	t.throws(() => m('12' as any, m.number.label('foo')), 'Expected `foo` to be of type `number` but received type `string`');
});

test('number.inRange', t => {
	t.notThrows(() => m(10, m.number.inRange(0, 20)));
	t.notThrows(() => m(10, m.number.inRange(10, 20)));
	t.notThrows(() => m(10, m.number.inRange(0, 10)));
	t.notThrows(() => m(10, m.number.label('foo').inRange(0, 10)));
	t.notThrows(() => m(10, m.number.inRange(0, 10).label('foo')));
	t.throws(() => m(10 as any, m.number.inRange(0, 9)), 'Expected number 10 to be in range [0..9]');
	t.throws(() => m(10 as any, m.number.label('foo').inRange(0, 9)), 'Expected number `foo` 10 to be in range [0..9]');
	t.throws(() => m(10 as any, m.number.inRange(0, 9).label('foo')), 'Expected number `foo` 10 to be in range [0..9]');
	t.throws(() => m(10 as any, m.number.inRange(11, 20)), 'Expected number 10 to be in range [11..20]');
});

test('number.greaterThan', t => {
	t.notThrows(() => m(10, m.number.greaterThan(5)));
	t.notThrows(() => m(10, m.number.greaterThan(9)));
	t.throws(() => m(10 as any, m.number.greaterThan(10)), 'Expected number 10 to be greater than 10');
	t.throws(() => m(10 as any, m.number.greaterThan(11)), 'Expected number 10 to be greater than 11');
	t.throws(() => m(10 as any, m.number.greaterThan(20)), 'Expected number 10 to be greater than 20');
});

test('number.greaterThanOrEqual', t => {
	t.notThrows(() => m(10, m.number.greaterThanOrEqual(5)));
	t.notThrows(() => m(10, m.number.greaterThanOrEqual(10)));
	t.throws(() => m(10 as any, m.number.greaterThanOrEqual(11)), 'Expected number 10 to be greater than or equal to 11');
	t.throws(() => m(10 as any, m.number.greaterThanOrEqual(20)), 'Expected number 10 to be greater than or equal to 20');
});

test('number.lessThan', t => {
	t.notThrows(() => m(10, m.number.lessThan(20)));
	t.notThrows(() => m(10, m.number.lessThan(11)));
	t.throws(() => m(10 as any, m.number.lessThan(10)), 'Expected number 10 to be less than 10');
	t.throws(() => m(10 as any, m.number.lessThan(9)), 'Expected number 10 to be less than 9');
	t.throws(() => m(10 as any, m.number.lessThan(0)), 'Expected number 10 to be less than 0');
});

test('number.lessThanOrEqual', t => {
	t.notThrows(() => m(10, m.number.lessThanOrEqual(20)));
	t.notThrows(() => m(10, m.number.lessThanOrEqual(10)));
	t.throws(() => m(10 as any, m.number.lessThanOrEqual(9)), 'Expected number 10 to be less than or equal to 9');
	t.throws(() => m(10 as any, m.number.lessThanOrEqual(0)), 'Expected number 10 to be less than or equal to 0');
});

test('number.equal', t => {
	t.notThrows(() => m(10, m.number.equal(10)));
	t.throws(() => m(10 as any, m.number.equal(5)), 'Expected number 10 to be equal to 5');
});

test('number.integer', t => {
	t.notThrows(() => m(10, m.number.integer));
	t.throws(() => m(10.1 as any, m.number.integer), 'Expected number 10.1 to be an integer');
});

test('number.finite', t => {
	t.notThrows(() => m(10, m.number.finite));
	t.throws(() => m(Infinity as any, m.number.finite), 'Expected number Infinity to be finite');
});

test('number.infinite', t => {
	t.notThrows(() => m(Infinity, m.number.infinite));
	t.throws(() => m(10 as any, m.number.infinite), 'Expected number 10 to be infinite');
});

test('number.positive', t => {
	t.notThrows(() => m(1, m.number.positive));
	t.throws(() => m(-1 as any, m.number.positive), 'Expected number -1 to be positive');
});

test('number.negative', t => {
	t.notThrows(() => m(-1, m.number.negative));
	t.throws(() => m(1 as any, m.number.negative), 'Expected number 1 to be negative');
});
