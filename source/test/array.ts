import test from 'ava';
import m from '..';

test('array', t => {
	t.notThrows(() => m([], m.array));
	t.throws(() => m('12' as any, m.array), 'Expected argument to be of type `array` but received type `string`');
});

test('array.length', t => {
	t.notThrows(() => m(['foo'], m.array.length(1)));
	t.notThrows(() => m(['foo', 'bar'], m.array.length(2)));
	t.throws(() => m(['foo'], m.array.length(2)), 'Expected array to have length `2`, got `1`');
});

test('array.minLength', t => {
	t.notThrows(() => m(['foo'], m.array.minLength(1)));
	t.notThrows(() => m(['foo', 'bar'], m.array.minLength(1)));
	t.throws(() => m(['foo'], m.array.minLength(2)), 'Expected array to have a minimum length of `2`, got `1`');
});

test('array.maxLength', t => {
	t.notThrows(() => m(['foo'], m.array.maxLength(1)));
	t.notThrows(() => m(['foo', 'bar'], m.array.maxLength(4)));
	t.throws(() => m(['foo', 'bar'], m.array.maxLength(1)), 'Expected array to have a maximum length of `1`, got `2`');
});

test('array.startsWith', t => {
	t.notThrows(() => m(['foo', 'bar'], m.array.startsWith('foo')));
	t.throws(() => m(['foo', 'bar'], m.array.startsWith('bar')), 'Expected array to start with `bar`, got `foo`');
});

test('array.endsWith', t => {
	t.notThrows(() => m(['foo', 'bar'], m.array.endsWith('bar')));
	t.throws(() => m(['foo', 'bar'], m.array.endsWith('foo')), 'Expected array to end with `foo`, got `bar`');
});

test('array.includes', t => {
	t.notThrows(() => m(['foo', 'bar'], m.array.includes('foo')));
	t.notThrows(() => m(['foo', 'bar', 'unicorn'], m.array.includes('foo', 'bar')));
	t.throws(() => m(['foo', 'bar'], m.array.includes('foo', 'unicorn')), 'Expected array to include all elements of `["foo","unicorn"]`, got `["foo","bar"]`');
});

test('array.includesAny', t => {
	t.notThrows(() => m(['foo', 'bar'], m.array.includesAny('foo')));
	t.notThrows(() => m(['foo', 'bar', 'unicorn'], m.array.includesAny('unicorn', 'rainbow')));
	t.throws(() => m(['foo', 'bar'], m.array.includesAny('unicorn')), 'Expected array to include any element of `["unicorn"]`, got `["foo","bar"]`');
});

test('array.empty', t => {
	t.notThrows(() => m([], m.array.empty));
	t.throws(() => m(['foo'], m.array.empty), 'Expected array to be empty, got `["foo"]`');
});

test('array.nonEmpty', t => {
	t.notThrows(() => m(['foo'], m.array.nonEmpty));
	t.throws(() => m([], m.array.nonEmpty), 'Expected array to not be empty');
});

test('array.deepEqual', t => {
	t.notThrows(() => m(['foo'], m.array.deepEqual(['foo'])));
	t.notThrows(() => m(['foo', {id: 1}], m.array.deepEqual(['foo', {id: 1}])));
	t.throws(() => m(['foo', {id: 1}], m.array.deepEqual(['foo', {id: 2}])), 'Expected array to be deeply equal to `["foo",{"id":2}]`, got `["foo",{"id":1}]`');
});

test('array.ofType', t => {
	t.notThrows(() => m(['foo', 'bar'], m.array.ofType(m.string)));
	t.notThrows(() => m(['foo', 'bar'], m.array.ofType(m.string.minLength(3))));
	t.throws(() => m(['foo', 'b'], m.array.ofType(m.string.minLength(3))), 'Expected string to have a minimum length of `3`, got `b`');
});
