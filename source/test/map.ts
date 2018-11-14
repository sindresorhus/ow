import test from 'ava';
import m from '..';

test('map', t => {
	t.notThrows(() => m(new Map(), m.map));
	t.notThrows(() => m(new Map([['unicorn', '🦄']]), m.map));
	t.throws(() => m(12 as any, m.map), 'Expected argument to be of type `Map` but received type `number`');
	t.throws(() => m(12 as any, 'foo', m.map), 'Expected `foo` to be of type `Map` but received type `number`');
});

test('map.size', t => {
	t.notThrows(() => m(new Map(), m.map.size(0)));
	t.notThrows(() => m(new Map([['unicorn', '🦄']]), m.map.size(1)));
	t.throws(() => m(new Map([['unicorn', '🦄']]), m.map.size(0)), 'Expected Map to have size `0`, got `1`');
	t.throws(() => m(new Map([['unicorn', '🦄']]), 'foo', m.map.size(0)), 'Expected Map `foo` to have size `0`, got `1`');
});

test('map.minSize', t => {
	t.notThrows(() => m(new Map([['unicorn', '🦄']]), m.map.minSize(1)));
	t.notThrows(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.minSize(1)));
	t.throws(() => m(new Map([['unicorn', '🦄']]), m.map.minSize(2)), 'Expected Map to have a minimum size of `2`, got `1`');
});

test('map.maxSize', t => {
	t.notThrows(() => m(new Map([['unicorn', '🦄']]), m.map.maxSize(1)));
	t.notThrows(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.maxSize(4)));
	t.throws(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.maxSize(1)), 'Expected Map to have a maximum size of `1`, got `2`');
});

test('map.hasKeys', t => {
	t.notThrows(() => m(new Map([['unicorn', '🦄']]), m.map.hasKeys('unicorn')));
	t.notThrows(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.hasKeys('unicorn', 'rainbow')));
	t.notThrows(() => m(new Map([[1, '🦄'], [2, '🌈']]), m.map.hasKeys(1, 2)));
	t.throws(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.hasKeys('foo')), 'Expected Map to have keys `["foo"]`');
	t.throws(() => m(new Map([['unicorn', '🦄'], ['foo', '🌈']]), m.map.hasKeys('foo', 'bar')), 'Expected Map to have keys `["bar"]`');
	t.throws(() => m(new Map([[2, '🦄'], [4, '🌈']]), m.map.hasKeys(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)), 'Expected Map to have keys `[1,3,5,6,7]`');
});

test('map.hasAnyKeys', t => {
	t.notThrows(() => m(new Map([['unicorn', '🦄']]), m.map.hasAnyKeys('unicorn', 'rainbow')));
	t.notThrows(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.hasAnyKeys('unicorn')));
	t.notThrows(() => m(new Map([[1, '🦄'], [2, '🌈']]), m.map.hasAnyKeys(1, 2, 3, 4)));
	t.throws(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.hasAnyKeys('foo')), 'Expected Map to have any key of `["foo"]`');
});

test('map.hasValues', t => {
	t.notThrows(() => m(new Map([['unicorn', '🦄']]), m.map.hasValues('🦄')));
	t.notThrows(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.hasValues('🦄', '🌈')));
	t.throws(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.hasValues('🦄', '🌦️')), 'Expected Map to have values `["🌦️"]`');
	t.throws(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.hasValues('🌈', '⚡', '👓', '🐬', '🎃', '🎶', '❤', '️🐳', '🍀', '👽')), 'Expected Map to have values `["⚡","👓","🐬","🎃","🎶"]`');
});

test('map.hasAnyValues', t => {
	t.notThrows(() => m(new Map([['unicorn', '🦄']]), m.map.hasAnyValues('🦄', '🌈')));
	t.notThrows(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.hasAnyValues('🦄')));
	t.throws(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.hasAnyValues('🌦️')), 'Expected Map to have any value of `["🌦️"]`');
});

test('map.keysOfType', t => {
	t.notThrows(() => m(new Map([['unicorn', '🦄']]), m.map.keysOfType(m.string)));
	t.notThrows(() => m(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), m.map.keysOfType(m.string.minLength(3))));
	t.notThrows(() => m(new Map([[1, '🦄']]), m.map.keysOfType(m.number)));
	t.throws(() => m(new Map([['unicorn', '🦄']]), m.map.keysOfType(m.number)), '(Map) Expected argument to be of type `number` but received type `string`');
	t.throws(() => m(new Map([['unicorn', '🦄']]), 'foo', m.map.keysOfType(m.number)), '(Map `foo`) Expected argument to be of type `number` but received type `string`');
});

test('map.valuesOfType', t => {
	t.notThrows(() => m(new Map([['unicorn', 1]]), m.map.valuesOfType(m.number)));
	t.notThrows(() => m(new Map([['unicorn', 10], ['rainbow', 11]]), m.map.valuesOfType(m.number.greaterThanOrEqual(10))));
	t.notThrows(() => m(new Map([['unicorn', '🦄']]), m.map.valuesOfType(m.string)));
	t.throws(() => m(new Map([['unicorn', '🦄']]), m.map.valuesOfType(m.number)), '(Map) Expected argument to be of type `number` but received type `string`');
	t.throws(() => m(new Map([['unicorn', '🦄']]), 'foo', m.map.valuesOfType(m.number)), '(Map `foo`) Expected argument to be of type `number` but received type `string`');
});

test('map.empty', t => {
	t.notThrows(() => m(new Map(), m.map.empty));
	t.notThrows(() => m(new Map([]), m.map.empty));
	t.throws(() => m(new Map([['unicorn', '🦄']]), m.map.empty), 'Expected Map to be empty, got `[["unicorn","🦄"]]`');
});

test('map.notEmpty', t => {
	t.notThrows(() => m(new Map([['unicorn', '🦄']]), m.map.nonEmpty));
	t.throws(() => m(new Map(), m.map.nonEmpty), 'Expected Map to not be empty');
});

test('map.deepEqual', t => {
	t.notThrows(() => m(new Map([['unicorn', '🦄']]), m.map.deepEqual(new Map([['unicorn', '🦄']]))));
	t.notThrows(() => m(new Map([['foo', {foo: 'bar'}]]), m.map.deepEqual(new Map([['foo', {foo: 'bar'}]]))));
	t.throws(() => m(new Map([['unicorn', '🦄']]), m.map.deepEqual(new Map([['rainbow', '🌈']]))), 'Expected Map to be deeply equal to `[["rainbow","🌈"]]`, got `[["unicorn","🦄"]]`');
	t.throws(() => m(new Map([['foo', {foo: 'bar'}]]), m.map.deepEqual(new Map([['foo', {foo: 'baz'}]]))), 'Expected Map to be deeply equal to `[["foo",{"foo":"baz"}]]`, got `[["foo",{"foo":"bar"}]]`');
});
