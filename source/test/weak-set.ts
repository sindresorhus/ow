import test from 'ava';
import m from '..';

const unicorn = {unicorn: '🦄'};
const rainbow = {rainbow: '🌈'};
const rocket = {rocket: '🚀'};

test('weakSet', t => {
	t.notThrows(() => m(new WeakSet(), m.weakSet));
	t.notThrows(() => m(new WeakSet([{unicorn: '🦄'}]), m.weakSet));
	t.notThrows(() => m(new WeakSet([unicorn]), m.weakSet));
	t.throws(() => m(12 as any, m.weakSet), 'Expected argument to be of type `WeakSet` but received type `number`');
	t.throws(() => m(12 as any, 'foo', m.weakSet), 'Expected `foo` to be of type `WeakSet` but received type `number`');
});

test('weakSet.has', t => {
	const keys = [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}, {x: 6}, {x: 7}, {x: 8}, {x: 9}, {x: 10}];

	t.notThrows(() => m(new WeakSet([unicorn]), m.weakSet.has(unicorn)));
	t.notThrows(() => m(new WeakSet([unicorn, rainbow]), m.weakSet.has(unicorn, rainbow)));
	t.throws(() => m(new WeakSet([unicorn, rainbow]), m.weakSet.has(rocket)), 'Expected WeakSet to have items `[{"rocket":"🚀"}]`');
	t.throws(() => m(new WeakSet([unicorn, rainbow]), 'foo', m.weakSet.has(rocket)), 'Expected WeakSet `foo` to have items `[{"rocket":"🚀"}]`');
	t.throws(() => m(new WeakSet([unicorn, rocket]), m.weakSet.has(rainbow, rocket)), 'Expected WeakSet to have items `[{"rainbow":"🌈"}]`');
	t.throws(() => m(new WeakSet([keys[1], keys[3]]), m.weakSet.has(...keys)), 'Expected WeakSet to have items `[{"x":1},{"x":3},{"x":5},{"x":6},{"x":7}]`');
});

test('weakSet.hasAny', t => {
	t.notThrows(() => m(new WeakSet([unicorn]), m.weakSet.hasAny(unicorn, rainbow)));
	t.notThrows(() => m(new WeakSet([unicorn, rainbow]), m.weakSet.hasAny(unicorn)));
	t.throws(() => m(new WeakSet([unicorn, rainbow]), m.weakSet.hasAny(rocket)), 'Expected WeakSet to have any item of `[{"rocket":"🚀"}]`');
});
