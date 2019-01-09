import test from 'ava';
import m from '..';
import {createAnyError} from './fixtures/create-error';

test('any', t => {
	t.notThrows(() => m(1, m.any(m.number)));
	t.notThrows(() => m(1, m.any(m.number, m.string)));
	t.notThrows(() => m(1, m.any(m.number, m.string)));
	t.notThrows(() => m(true, m.any(m.number, m.string, m.boolean)));
	t.throws(() => m(1 as any, m.any(m.string)), createAnyError('Expected argument to be of type `string` but received type `number`'));
	t.throws(() => m(true as any, m.any(m.number, m.string)), createAnyError(
		'Expected argument to be of type `number` but received type `boolean`',
		'Expected argument to be of type `string` but received type `boolean`'
	));
});

test('any inception', t => {
	t.notThrows(() => m(1, m.any(m.number, m.any(m.string, m.boolean))));
	t.notThrows(() => m('1', m.any(m.number, m.any(m.string, m.boolean))));
	t.notThrows(() => m(true, m.any(m.number, m.any(m.string, m.boolean))));
});
