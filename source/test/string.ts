import test from 'ava';
import * as m from '..';

test('string', t => {
	t.notThrows(() => m('foo', m.string));
	t.throws(() => m(12, m.string), 'Expected argument to be of type `string` but received type `number`');
});

test('string.minLength', t => {
	t.notThrows(() => m('foo', m.string.length(3)));
	t.notThrows(() => m('foobar', m.string.length(6)));
	t.throws(() => m('foo', m.string.length(4)), 'Expected string length to be 4, got 3');
});

test('string.minLength', t => {
	t.notThrows(() => m('foo', m.string.minLength(2)));
	t.notThrows(() => m('foo', m.string.minLength(3)));
	t.throws(() => m('foo', m.string.minLength(4)), 'Expected string to have a minimum length of 4, got 3');
});

test('string.alphanumeric', t => {
	t.notThrows(() => m('Foo123', m.string.alphanumeric));
	t.throws(() => m('Foo123!', m.string.alphanumeric), 'Expected string to contain only alphanumeric characters but received `Foo123!`');
});
