import test from 'ava';
import ow from '../source';

test('weakMap', t => {
	t.notThrows(() => {
		ow(new WeakMap(), ow.weakMap);
	});

	t.notThrows(() => {
		ow(new WeakMap([[{foo: 'bar'}, '🦄']]), ow.weakMap);
	});

	t.throws(() => {
		ow(12 as any, ow.weakMap);
	}, 'Expected argument to be of type `WeakMap` but received type `number`');

	t.throws(() => {
		ow(12 as any, 'foo', ow.weakMap);
	}, 'Expected `foo` to be of type `WeakMap` but received type `number`');
});

test('weakMap.hasKeys', t => {
	const unicorn: any = {unicorn: true};
	const rainbow = {rainbow: true};
	const keys = [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}, {x: 6}, {x: 7}, {x: 8}, {x: 9}, {x: 10}];

	t.notThrows(() => {
		ow(new WeakMap([[unicorn, '🦄']]), ow.weakMap.hasKeys(unicorn));
	});

	t.throws(() => {
		ow(new WeakMap([[{rainbow: true}, '🌈']]), ow.weakMap.hasKeys({rainbow: true}));
	}, 'Expected WeakMap to have keys `[{"rainbow":true}]`');

	t.throws(() => {
		ow(new WeakMap([[{rainbow: true}, '🌈']]), 'foo', ow.weakMap.hasKeys({rainbow: true}));
	}, 'Expected WeakMap `foo` to have keys `[{"rainbow":true}]`');

	t.throws(() => {
		ow(new WeakMap([[unicorn, '🦄'], [rainbow, '🌈']]), ow.weakMap.hasKeys(unicorn, {rainbow: true}));
	}, 'Expected WeakMap to have keys `[{"rainbow":true}]`');

	t.throws(() => {
		ow(new WeakMap([[keys[0], 1], [keys[2], 3]]), ow.weakMap.hasKeys(...keys));
	}, 'Expected WeakMap to have keys `[{"x":2},{"x":4},{"x":5},{"x":6},{"x":7}]`');
});

test('weakMap.hasAnyKeys', t => {
	const unicorn: any = {unicorn: true};
	const rainbow = {rainbow: true};
	const rocket = {rocket: true};

	t.notThrows(() => {
		ow(new WeakMap([[unicorn, '🦄']]), ow.weakMap.hasAnyKeys(unicorn, rainbow));
	});

	t.notThrows(() => {
		ow(new WeakMap([[unicorn, '🦄'], [rainbow, '🌈']]), ow.weakMap.hasAnyKeys(unicorn));
	});

	t.notThrows(() => {
		ow(new WeakMap([[unicorn, '🦄'], [rainbow, '🌈']]), ow.weakMap.hasAnyKeys(unicorn, rainbow, rocket));
	});

	t.throws(() => {
		ow(new WeakMap([[unicorn, '🦄'], [rainbow, '🌈']]), ow.weakMap.hasAnyKeys(rocket));
	}, 'Expected WeakMap to have any key of `[{"rocket":true}]`');
});
