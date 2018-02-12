import test from 'ava';
import m from '..';

class Unicorn {}			// tslint:disable-line

test('object', t => {
	t.notThrows(() => m({}, m.object));
	t.notThrows(() => m(new Error('foo'), m.object));
	t.throws(() => m('foo' as any, m.object), 'Expected argument to be of type `object` but received type `string`');
	t.throws(() => m(1 as any, m.object), 'Expected argument to be of type `object` but received type `number`');
});

test('object.plain', t => {
	t.notThrows(() => m({}, m.object.plain));
	t.throws(() => m(new Error('foo'), m.object.plain), 'Expected object to be a plain object');
});

test('object.empty', t => {
	t.notThrows(() => m({}, m.object.empty));
	t.throws(() => m({unicorn: '🦄'}, m.object.empty), 'Expected object to be empty, got `{"unicorn":"🦄"}`');
});

test('object.nonEmpty', t => {
	t.notThrows(() => m({unicorn: '🦄'}, m.object.nonEmpty));
	t.throws(() => m({}, m.object.nonEmpty), 'Expected object to not be empty');
});

test('object.valuesOfType', t => {
	t.notThrows(() => m({unicorn: '🦄'}, m.object.valuesOfType(m.string)));
	t.notThrows(() => m({unicorn: '🦄', rainbow: '🌈'}, m.object.valuesOfType(m.string)));
	t.notThrows(() => m({unicorn: 1, rainbow: 2}, m.object.valuesOfType(m.number)));
	t.throws(() => m({unicorn: '🦄', rainbow: 2}, m.object.valuesOfType(m.string)), 'Expected argument to be of type `string` but received type `number`');
	t.throws(() => m({unicorn: 'a', rainbow: 'b'}, m.object.valuesOfType(m.string.minLength(2))), 'Expected string to have a minimum length of `2`, got `a`');
});

test('object.deepEqual', t => {
	t.notThrows(() => m({unicorn: '🦄'}, m.object.deepEqual({unicorn: '🦄'})));
	t.notThrows(() => m({unicorn: '🦄', rain: {bow: '🌈'}}, m.object.deepEqual({unicorn: '🦄', rain: {bow: '🌈'}})));
	t.throws(() => m({unicorn: '🦄'}, m.object.deepEqual({rainbow: '🌈'})), 'Expected object to be deeply equal to `{"rainbow":"🌈"}`, got `{"unicorn":"🦄"}`');
});

test('object.instanceOf', t => {
	t.notThrows(() => m(new Error('🦄'), m.object.instanceOf(Error)));
	t.notThrows(() => m(new Unicorn(), m.object.instanceOf(Unicorn)));
	t.throws(() => m(new Unicorn(), m.object.instanceOf(Error)), 'Expected `Unicorn` to be of type `Error`');
	t.throws(() => m(new Error('🦄'), m.object.instanceOf(Unicorn)), 'Expected `Error` to be of type `Unicorn`');
	t.throws(() => m({unicorn: '🦄'}, m.object.instanceOf(Unicorn)), 'Expected `{"unicorn":"🦄"}` to be of type `Unicorn`');
});

test('object.hasKeys', t => {
	t.notThrows(() => m({unicorn: '🦄'}, m.object.hasKeys('unicorn')));
	t.notThrows(() => m({unicorn: {value: '🦄'}}, m.object.hasKeys('unicorn')));
	t.notThrows(() => m({unicorn: {value: '🦄'}}, m.object.hasKeys('unicorn.value')));
	t.notThrows(() => m({unicorn: '🦄', rainbow: '🌈'}, m.object.hasKeys('unicorn', 'rainbow')));
	t.throws(() => m({unicorn: '🦄'}, m.object.hasKeys('unicorn', 'rainbow')), 'Expected object to have keys `["rainbow"]`');
	t.throws(() => m({unicorn: {value: '🦄'}}, m.object.hasKeys('unicorn.foo')), 'Expected object to have keys `["unicorn.foo"]`');
});

test('object.hasAnyKeys', t => {
	t.notThrows(() => m({unicorn: '🦄'}, m.object.hasAnyKeys('unicorn', 'rainbow', 'foo.bar')));
	t.notThrows(() => m({unicorn: {value: '🦄'}}, m.object.hasAnyKeys('unicorn', 'rainbow')));
	t.notThrows(() => m({unicorn: {value: '🦄'}}, m.object.hasAnyKeys('unicorn.value', 'rainbow')));
	t.notThrows(() => m({unicorn: '🦄', rainbow: '🌈'}, m.object.hasAnyKeys('unicorn')));
	t.throws(() => m({unicorn: '🦄'}, m.object.hasAnyKeys('foo')), 'Expected object to have any key of `["foo"]`');
	t.throws(() => m({unicorn: '🦄'}, m.object.hasAnyKeys('unicorn.value')), 'Expected object to have any key of `["unicorn.value"]`');
});
