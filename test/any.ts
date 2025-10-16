import test from 'ava';
import ow from '../source/index.js';
import {createAnyError} from './fixtures/create-error.js';

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
	}, {
		message: createAnyError('Expected argument to be of type `string` but received type `number`'),
	});

	t.throws(() => {
		ow(true as any, ow.any(ow.number, ow.string));
	}, {
		message: createAnyError(
			'Expected argument to be of type `number` but received type `boolean`',
			'Expected argument to be of type `string` but received type `boolean`',
		),
	});
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

test('any with nan', t => {
	t.notThrows(() => {
		ow(1, ow.any(ow.number, ow.nan));
	});

	t.notThrows(() => {
		ow(Number.NaN, ow.any(ow.number, ow.nan));
	});

	t.throws(() => {
		ow('' as any, ow.any(ow.number, ow.nan));
	}, {message: /Any predicate failed/});

	t.throws(() => {
		ow([] as any, ow.any(ow.number, ow.nan));
	}, {message: /Any predicate failed/});

	t.throws(() => {
		ow(null as any, ow.any(ow.number, ow.nan));
	}, {message: /Any predicate failed/});

	t.throws(() => {
		ow(undefined as any, ow.any(ow.number, ow.nan));
	}, {message: /Any predicate failed/});
});

test('any in array.ofType', t => {
	t.notThrows(() => {
		ow([], ow.array.ofType(ow.any(ow.string, ow.number, ow.null)));
	});

	t.notThrows(() => {
		ow(['', 1, null], ow.array.ofType(ow.any(ow.string, ow.number, ow.null)));
	});

	t.throws(() => {
		ow([[]] as any, ow.array.ofType(ow.any(ow.string, ow.number, ow.null)));
	}, {message: /Any predicate failed/});

	t.throws(() => {
		ow([{}] as any, ow.array.ofType(ow.any(ow.string, ow.number, ow.null)));
	}, {message: /Any predicate failed/});
});
