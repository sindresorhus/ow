import test from 'ava';
import m from '..';

test('boolean', t => {
	t.notThrows(() => m(true, m.boolean));
	t.throws(() => m('12' as any, m.boolean), 'Expected argument to be of type `boolean` but received type `string`');
});

test('boolean.true', t => {
	t.notThrows(() => m(true, m.boolean.true));
	t.notThrows(() => m(Boolean(true), m.boolean.true));
	t.notThrows(() => m(Boolean(1), m.boolean.true));
	t.throws(() => m(false as any, m.boolean.true), 'Expected false to be true');
	t.throws(() => m(Boolean(0) as any, m.boolean.true), 'Expected false to be true');
});

test('boolean.false', t => {
	t.notThrows(() => m(false, m.boolean.false));
	t.notThrows(() => m(Boolean(false), m.boolean.false));
	t.notThrows(() => m(Boolean(0), m.boolean.false));
	t.throws(() => m(true as any, m.boolean.false), 'Expected true to be false');
	t.throws(() => m(Boolean(1) as any, m.boolean.false), 'Expected true to be false');
});
