import test from 'ava';
import m from '..';

test('set', t => {
	t.notThrows(() => m(new Set(), m.set));
	t.notThrows(() => m(new Set(['🦄']), m.set));
	t.throws(() => m(12 as any, m.set), 'Expected argument to be of type `set` but received type `number`');
});

test('set.size', t => {
	t.notThrows(() => m(new Set(), m.set.size(0)));
	t.notThrows(() => m(new Set(['🦄']), m.set.size(1)));
	t.throws(() => m(new Set(['🦄']), m.set.size(0)), 'Expected Set to have size `0`, got `1`');
});

test('set.minSize', t => {
	t.notThrows(() => m(new Set(['🦄']), m.set.minSize(1)));
	t.notThrows(() => m(new Set(['🦄', '🌈']), m.set.minSize(1)));
	t.throws(() => m(new Set(['🦄']), m.set.minSize(2)), 'Expected Set to have a minimum size of `2`, got `1`');
});

test('set.maxSize', t => {
	t.notThrows(() => m(new Set(['🦄']), m.set.maxSize(1)));
	t.notThrows(() => m(new Set(['🦄', '🌈']), m.set.maxSize(4)));
	t.throws(() => m(new Set(['🦄', '🌈']), m.set.maxSize(1)), 'Expected Set to have a maximum size of `1`, got `2`');
});

test('set.hasKeys', t => {
	t.notThrows(() => m(new Set(['unicorn']), m.set.has('unicorn')));
	t.notThrows(() => m(new Set(['unicorn', 'rainbow']), m.set.has('unicorn', 'rainbow')));
	t.notThrows(() => m(new Set([1, 2]), m.set.has(1, 2)));
	t.throws(() => m(new Set(['unicorn', 'rainbow']), m.set.has('foo')), 'Expected Set to have items `["foo"]`');
	t.throws(() => m(new Set(['unicorn', 'foo']), m.set.has('foo', 'bar')), 'Expected Set to have items `["bar"]`');
	t.throws(() => m(new Set([2, 4]), m.set.has(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)), 'Expected Set to have items `[1,3,5,6,7]`');
});

test('set.hasAny', t => {
	t.notThrows(() => m(new Set(['unicorn']), m.set.hasAny('unicorn', 'rainbow')));
	t.notThrows(() => m(new Set(['unicorn', 'rainbow']), m.set.hasAny('unicorn')));
	t.notThrows(() => m(new Set([1, 2]), m.set.hasAny(1, 2, 3, 4)));
	t.throws(() => m(new Set(['unicorn', 'rainbow']), m.set.hasAny('foo')), 'Expected Set to have any item of `["foo"]`');
});

test('set.ofType', t => {
	t.notThrows(() => m(new Set(['unicorn']), m.set.ofType(m.string)));
	t.notThrows(() => m(new Set(['unicorn', 'rainbow']), m.set.ofType(m.string.minLength(3))));
	t.notThrows(() => m(new Set([1]), m.set.ofType(m.number)));
	t.throws(() => m(new Set(['unicorn']), m.set.ofType(m.number)), 'Expected argument to be of type `number` but received type `string`');
});

test('set.empty', t => {
	t.notThrows(() => m(new Set(), m.set.empty));
	t.notThrows(() => m(new Set([]), m.set.empty));
	t.throws(() => m(new Set(['unicorn']), m.set.empty), 'Expected Set to be empty, got `["unicorn"]`');
});

test('set.notEmpty', t => {
	t.notThrows(() => m(new Set(['unicorn']), m.set.nonEmpty));
	t.throws(() => m(new Set(), m.set.nonEmpty), 'Expected Set to not be empty');
});

test('set.deepEqual', t => {
	t.notThrows(() => m(new Set(['unicorn']), m.set.deepEqual(new Set(['unicorn']))));
	t.notThrows(() => m(new Set([{foo: 'bar'}]), m.set.deepEqual(new Set([{foo: 'bar'}]))));
	t.throws(() => m(new Set(['unicorn']), m.set.deepEqual(new Set(['rainbow']))), 'Expected Set to be deeply equal to `["rainbow"]`, got `["unicorn"]`');
	t.throws(() => m(new Set([{foo: 'bar'}]), m.set.deepEqual(new Set([{foo: 'baz'}]))), 'Expected Set to be deeply equal to `[{"foo":"baz"}]`, got `[{"foo":"bar"}]`');
});
