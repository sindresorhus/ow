import test from 'ava';
import ow from '../source';

test('boolean', t => {
	t.notThrows(() => {
		ow(true, ow.boolean);
	});
	t.throws(() => {
		ow('12' as any, ow.boolean);
	}, 'Expected argument to be of type `boolean` but received type `string`');
	t.throws(() => {
		ow('12' as any, 'foo', ow.boolean);
	}, 'Expected `foo` to be of type `boolean` but received type `string`');
});

test('boolean.true', t => {
	t.notThrows(() => {
		ow(true, ow.boolean.true);
	});

	t.notThrows(() => {
		ow(Boolean(true), ow.boolean.true);
	});

	t.notThrows(() => {
		ow(Boolean(1), ow.boolean.true);
	});

	t.throws(() => {
		ow(false, ow.boolean.true);
	}, 'Expected boolean to be true, got false');

	t.throws(() => {
		ow(false, 'foo', ow.boolean.true);
	}, 'Expected boolean `foo` to be true, got false');

	t.throws(() => {
		ow(Boolean(0), ow.boolean.true);
	}, 'Expected boolean to be true, got false');
});

test('boolean.false', t => {
	t.notThrows(() => {
		ow(false, ow.boolean.false);
	});

	t.notThrows(() => {
		ow(Boolean(false), ow.boolean.false);
	});

	t.notThrows(() => {
		ow(Boolean(0), ow.boolean.false);
	});

	t.throws(() => {
		ow(true, ow.boolean.false);
	}, 'Expected boolean to be false, got true');

	t.throws(() => {
		ow(Boolean(1), ow.boolean.false);
	}, 'Expected boolean to be false, got true');
});
