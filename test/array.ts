import test from 'ava';
import ow from '../source';

test('array', t => {
	t.notThrows(() => {
		ow([], ow.array);
	});

	t.notThrows(() => {
		ow([], 'foo', ow.array);
	});

	t.throws(() => {
		ow('12' as any, ow.array);
	}, 'Expected argument to be of type `array` but received type `string`');

	t.throws(() => {
		ow('12' as any, 'foo', ow.array);
	}, 'Expected `foo` to be of type `array` but received type `string`');
});

test('array.length', t => {
	t.notThrows(() => {
		ow(['foo'], ow.array.length(1));
	});

	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.length(2));
	});

	t.throws(() => {
		ow(['foo'], ow.array.length(2));
	}, 'Expected array to have length `2`, got `1`');

	t.throws(() => {
		ow(['foo'], 'foo', ow.array.length(2));
	}, 'Expected array `foo` to have length `2`, got `1`');
});

test('array.minLength', t => {
	t.notThrows(() => {
		ow(['foo'], ow.array.minLength(1));
	});

	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.minLength(1));
	});

	t.throws(() => {
		ow(['foo'], ow.array.minLength(2));
	}, 'Expected array to have a minimum length of `2`, got `1`');
});

test('array.maxLength', t => {
	t.notThrows(() => {
		ow(['foo'], ow.array.maxLength(1));
	});

	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.maxLength(4));
	});

	t.throws(() => {
		ow(['foo', 'bar'], ow.array.maxLength(1));
	}, 'Expected array to have a maximum length of `1`, got `2`');
});

test('array.startsWith', t => {
	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.startsWith('foo'));
	});

	t.throws(() => {
		ow(['foo', 'bar'], ow.array.startsWith('bar'));
	}, 'Expected array to start with `bar`, got `foo`');
});

test('array.endsWith', t => {
	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.endsWith('bar'));
	});

	t.throws(() => {
		ow(['foo', 'bar'], ow.array.endsWith('foo'));
	}, 'Expected array to end with `foo`, got `bar`');
});

test('array.includes', t => {
	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.includes('foo'));
	});

	t.notThrows(() => {
		ow(['foo', 'bar', 'unicorn'], ow.array.includes('foo', 'bar'));
	});

	t.throws(() => {
		ow(['foo', 'bar'], ow.array.includes('foo', 'unicorn'));
	}, 'Expected array to include all elements of `["foo","unicorn"]`, got `["foo","bar"]`');
});

test('array.includesAny', t => {
	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.includesAny('foo'));
	});

	t.notThrows(() => {
		ow(['foo', 'bar', 'unicorn'], ow.array.includesAny('unicorn', 'rainbow'));
	});

	t.throws(() => {
		ow(['foo', 'bar'], ow.array.includesAny('unicorn'));
	}, 'Expected array to include any element of `["unicorn"]`, got `["foo","bar"]`');
});

test('array.empty', t => {
	t.notThrows(() => {
		ow([], ow.array.empty);
	});

	t.throws(() => {
		ow(['foo'], ow.array.empty);
	}, 'Expected array to be empty, got `["foo"]`');
});

test('array.nonEmpty', t => {
	t.notThrows(() => {
		ow(['foo'], ow.array.nonEmpty);
	});

	t.throws(() => {
		ow([], ow.array.nonEmpty);
	}, 'Expected array to not be empty');
});

test('array.deepEqual', t => {
	t.notThrows(() => {
		ow(['foo'], ow.array.deepEqual(['foo']));
	});

	t.notThrows(() => {
		ow(['foo', {id: 1}], ow.array.deepEqual(['foo', {id: 1}]));
	});

	t.throws(() => {
		ow(['foo', {id: 1}], ow.array.deepEqual(['foo', {id: 2}]));
	}, 'Expected array to be deeply equal to `["foo",{"id":2}]`, got `["foo",{"id":1}]`');
});

test('array.ofType', t => {
	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.ofType(ow.string));
	});

	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.ofType(ow.string.minLength(3)));
	});

	t.throws(() => {
		ow(['foo', 'b'], ow.array.ofType(ow.string.minLength(3)));
	}, '(array) Expected string to have a minimum length of `3`, got `b`');

	t.throws(() => {
		ow(['foo', 'b'], 'foo', ow.array.ofType(ow.string.minLength(3)));
	}, '(array `foo`) Expected string to have a minimum length of `3`, got `b`');
});
