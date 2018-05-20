import test from 'ava';
import m from '..';

test('weakMap', t => {
	t.notThrows(() => m(new WeakMap(), m.weakMap));
	t.notThrows(() => m(new WeakMap([[{foo: 'bar'}, '🦄']]), m.weakMap));
	t.notThrows(() => m(new WeakMap([[{foo: 'bar'}, '🦄']]), m.weakMap.label('foo')));
	t.throws(() => m(12 as any, m.weakMap), 'Expected argument to be of type `weakMap` but received type `number`');
	t.throws(() => m(12 as any, m.weakMap.label('foo')), 'Expected `foo` to be of type `weakMap` but received type `number`');
});

test('weakMap.hasKeys', t => {
	const unicorn: any = {unicorn: true};
	const rainbow = {rainbow: true};
	const keys = [{x: 1}, {x: 2}, {x: 3}, {x: 4}, {x: 5}, {x: 6}, {x: 7}, {x: 8}, {x: 9}, {x: 10}];

	t.notThrows(() => m(new WeakMap([[unicorn, '🦄']]), m.weakMap.hasKeys(unicorn)));
	t.notThrows(() => m(new WeakMap([[unicorn, '🦄']]), m.weakMap.label('foo').hasKeys(unicorn)));
	t.notThrows(() => m(new WeakMap([[unicorn, '🦄']]), m.weakMap.hasKeys(unicorn).label('foo')));
	t.throws(() => m(new WeakMap([[{rainbow: true}, '🌈']]), m.weakMap.hasKeys({rainbow: true})), 'Expected WeakMap to have keys `[{"rainbow":true}]`');
	t.throws(() => m(new WeakMap([[{rainbow: true}, '🌈']]), m.weakMap.label('foo').hasKeys({rainbow: true})), 'Expected WeakMap `foo` to have keys `[{"rainbow":true}]`');
	t.throws(() => m(new WeakMap([[{rainbow: true}, '🌈']]), m.weakMap.hasKeys({rainbow: true}).label('foo')), 'Expected WeakMap `foo` to have keys `[{"rainbow":true}]`');
	t.throws(() => m(new WeakMap([[unicorn, '🦄'], [rainbow, '🌈']]), m.weakMap.hasKeys(unicorn, {rainbow: true})), 'Expected WeakMap to have keys `[{"rainbow":true}]`');
	t.throws(() => m(new WeakMap([[keys[0], 1], [keys[2], 3]]), m.weakMap.hasKeys(...keys)), 'Expected WeakMap to have keys `[{"x":2},{"x":4},{"x":5},{"x":6},{"x":7}]`');
});

test('weakMap.hasAnyKeys', t => {
	const unicorn: any = {unicorn: true};
	const rainbow = {rainbow: true};
	const rocket = {rocket: true};

	t.notThrows(() => m(new WeakMap([[unicorn, '🦄']]), m.weakMap.hasAnyKeys(unicorn, rainbow)));
	t.notThrows(() => m(new WeakMap([[unicorn, '🦄'], [rainbow, '🌈']]), m.weakMap.hasAnyKeys(unicorn)));
	t.notThrows(() => m(new WeakMap([[unicorn, '🦄'], [rainbow, '🌈']]), m.weakMap.hasAnyKeys(unicorn, rainbow, rocket)));
	t.throws(() => m(new WeakMap([[unicorn, '🦄'], [rainbow, '🌈']]), m.weakMap.hasAnyKeys(rocket)), 'Expected WeakMap to have any key of `[{"rocket":true}]`');
});
