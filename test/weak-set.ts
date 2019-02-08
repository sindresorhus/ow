import test from 'ava';
import ow from '../source';

const unicorn = {unicorn: '🦄'};
const rainbow = {rainbow: '🌈'};
const rocket = {rocket: '🚀'};

test('weakSet', t => {
	t.notThrows(() => {
		ow(new WeakSet(), ow.weakSet);
	});

	t.notThrows(() => {
		ow(new WeakSet([{unicorn: '🦄'}]), ow.weakSet);
	});

	t.notThrows(() => {
		ow(new WeakSet([unicorn]), ow.weakSet);
	});

	t.throws(() => {
		ow(12 as any, ow.weakSet);
	}, 'Expected argument to be of type `WeakSet` but received type `number`');

	t.throws(() => {
		ow(12 as any, 'foo', ow.weakSet);
	}, 'Expected `foo` to be of type `WeakSet` but received type `number`');
});

test('weakSet.has', t => {
	const keys = [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}, {x: 6}, {x: 7}, {x: 8}, {x: 9}, {x: 10}];

	t.notThrows(() => {
		ow(new WeakSet([unicorn]), ow.weakSet.has(unicorn));
	});

	t.notThrows(() => {
		ow(new WeakSet([unicorn, rainbow]), ow.weakSet.has(unicorn, rainbow));
	});

	t.throws(() => {
		ow(new WeakSet([unicorn, rainbow]), ow.weakSet.has(rocket));
	}, 'Expected WeakSet to have items `[{"rocket":"🚀"}]`');

	t.throws(() => {
		ow(new WeakSet([unicorn, rainbow]), 'foo', ow.weakSet.has(rocket));
	}, 'Expected WeakSet `foo` to have items `[{"rocket":"🚀"}]`');

	t.throws(() => {
		ow(new WeakSet([unicorn, rocket]), ow.weakSet.has(rainbow, rocket));
	}, 'Expected WeakSet to have items `[{"rainbow":"🌈"}]`');

	t.throws(() => {
		ow(new WeakSet([keys[1], keys[3]]), ow.weakSet.has(...keys));
	}, 'Expected WeakSet to have items `[{"x":1},{"x":3},{"x":5},{"x":6},{"x":7}]`');
});

test('weakSet.hasAny', t => {
	t.notThrows(() => {
		ow(new WeakSet([unicorn]), ow.weakSet.hasAny(unicorn, rainbow));
	});

	t.notThrows(() => {
		ow(new WeakSet([unicorn, rainbow]), ow.weakSet.hasAny(unicorn));
	});

	t.throws(() => {
		ow(new WeakSet([unicorn, rainbow]), ow.weakSet.hasAny(rocket));
	}, 'Expected WeakSet to have any item of `[{"rocket":"🚀"}]`');
});
