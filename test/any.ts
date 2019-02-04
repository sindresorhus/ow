import test from 'ava';
import ow from '../source';
import {createAnyError} from './fixtures/create-error';

test('any', t => {
	t.notThrows(() => {
		ow(1, ow.any(ow.number));
	});

	t.notThrows(() => {
		ow(1, ow.any(ow.number, ow.string));
	});

	t.notThrows(() => {
		ow(1, ow.any(ow.number, ow.string));
	});

	t.notThrows(() => {
		ow(true, ow.any(ow.number, ow.string, ow.boolean));
	});

	t.throws(() => {
		ow(1 as any, ow.any(ow.string));
	}, createAnyError('Expected argument to be of type `string` but received type `number`'));

	t.throws(() => {
		ow(true as any, ow.any(ow.number, ow.string));
	}, createAnyError(
		'Expected argument to be of type `number` but received type `boolean`',
		'Expected argument to be of type `string` but received type `boolean`'
	));
});

test('any inception', t => {
	t.notThrows(() => {
		ow(1, ow.any(ow.number, ow.any(ow.string, ow.boolean)));
	});

	t.notThrows(() => {
		ow('1', ow.any(ow.number, ow.any(ow.string, ow.boolean)));
	});

	t.notThrows(() => {
		ow(true, ow.any(ow.number, ow.any(ow.string, ow.boolean)));
	});
});
