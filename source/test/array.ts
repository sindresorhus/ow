import test from 'ava';
import * as m from '..';

test('array', t => {
	t.notThrows(() => m([], m.array));
	t.throws(() => m('12', m.array), 'Expected argument to be of type `array` but received type `string`');
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
