import test from 'ava';
import m from '..';

test('boolean', t => {
	t.notThrows(() => m(true, m.boolean));
	t.throws(() => m('12' as any, m.boolean), 'Expected argument to be of type `boolean` but received type `string`');
	t.throws(() => m('12' as any, 'foo', m.boolean), 'Expected `foo` to be of type `boolean` but received type `string`');
});

test('boolean.true', t => {
	t.notThrows(() => m(true, m.boolean.true));
	t.notThrows(() => m(Boolean(true), m.boolean.true));
	t.notThrows(() => m(Boolean(1), m.boolean.true));
	t.throws(() => m(false, m.boolean.true), 'Expected boolean to be true, got false');
	t.throws(() => m(false, 'foo', m.boolean.true), 'Expected boolean `foo` to be true, got false');
	t.throws(() => m(Boolean(0), m.boolean.true), 'Expected boolean to be true, got false');
});

test('boolean.false', t => {
	t.notThrows(() => m(false, m.boolean.false));
	t.notThrows(() => m(Boolean(false), m.boolean.false));
	t.notThrows(() => m(Boolean(0), m.boolean.false));
	t.throws(() => m(true, m.boolean.false), 'Expected boolean to be false, got true');
	t.throws(() => m(Boolean(1), m.boolean.false), 'Expected boolean to be false, got true');
});
