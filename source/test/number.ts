import test from 'ava';
import * as m from '..';

test('number', t => {
	t.notThrows(() => m(1, m.number));
	t.throws(() => m('12', m.number), 'Expected argument to be of type `number` but received type `string`');
});

test('number.inRange', t => {
	t.notThrows(() => m(10, m.number.inRange(0, 20)));
	t.notThrows(() => m(10, m.number.inRange(10, 20)));
	t.notThrows(() => m(10, m.number.inRange(0, 10)));
	t.throws(() => m(10, m.number.inRange(0, 9)), 'Expected 10 to be in range [0..9]');
	t.throws(() => m(10, m.number.inRange(11, 20)), 'Expected 10 to be in range [11..20]');
});

test('number.min', t => {
	t.notThrows(() => m(10, m.number.min(5)));
	t.notThrows(() => m(10, m.number.min(10)));
	t.throws(() => m(10, m.number.min(11)), 'Expected 10 to be greater than or equal to 11');
	t.throws(() => m(10, m.number.min(20)), 'Expected 10 to be greater than or equal to 20');
});

test('number.max', t => {
	t.notThrows(() => m(10, m.number.max(20)));
	t.notThrows(() => m(10, m.number.max(10)));
	t.throws(() => m(10, m.number.max(9)), 'Expected 10 to be less than or equal to 9');
	t.throws(() => m(10, m.number.max(0)), 'Expected 10 to be less than or equal to 0');
});

test('number.equal', t => {
	t.notThrows(() => m(10, m.number.equal(10)));
	t.throws(() => m(10, m.number.equal(5)), 'Expected 10 to be equal to 5');
});

test('number.integer', t => {
	t.notThrows(() => m(10, m.number.integer));
	t.throws(() => m(10.1, m.number.integer), 'Expected 10.1 to be an integer');
});

test('number.finite', t => {
	t.notThrows(() => m(10, m.number.finite));
	t.throws(() => m(Infinity, m.number.finite), 'Expected Infinity to be finite');
});

test('number.positive', t => {
	t.notThrows(() => m(1, m.number.positive));
	t.throws(() => m(-1, m.number.positive), 'Expected -1 to be positive');
});

test('number.negative', t => {
	t.notThrows(() => m(-1, m.number.negative));
	t.throws(() => m(1, m.number.negative), 'Expected 1 to be negative');
});
