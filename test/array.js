import test from 'ava';
import ow from '../source/index.js';

test('array', t => {
	t.notThrows(() => {
		ow([], ow.array);
	});

	t.notThrows(() => {
		ow([], 'foo', ow.array);
	});

	t.throws(() => {
		ow('12', ow.array);
	}, {
		message: 'Expected argument to be of type `array` but received type `string`'
	});

	t.throws(() => {
		ow('12', 'foo', ow.array);
	}, {
		message: 'Expected `foo` to be of type `array` but received type `string`'
	});
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
	}, {
		message: 'Expected array to have length `2`, got `1`'
	});

	t.throws(() => {
		ow(['foo'], 'foo', ow.array.length(2));
	}, {
		message: 'Expected array `foo` to have length `2`, got `1`'
	});
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
	}, {
		message: 'Expected array to have a minimum length of `2`, got `1`'
	});
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
	}, {
		message: 'Expected array to have a maximum length of `1`, got `2`'
	});
});

test('array.startsWith', t => {
	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.startsWith('foo'));
	});

	t.throws(() => {
		ow(['foo', 'bar'], ow.array.startsWith('bar'));
	}, {
		message: 'Expected array to start with `bar`, got `foo`'
	});
});

test('array.endsWith', t => {
	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.endsWith('bar'));
	});

	t.throws(() => {
		ow(['foo', 'bar'], ow.array.endsWith('foo'));
	}, {
		message: 'Expected array to end with `foo`, got `bar`'
	});
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
	}, {
		message: 'Expected array to include all elements of `["foo","unicorn"]`, got `["foo","bar"]`'
	});
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
	}, {
		message: 'Expected array to include any element of `["unicorn"]`, got `["foo","bar"]`'
	});
});

test('array.empty', t => {
	t.notThrows(() => {
		ow([], ow.array.empty);
	});

	t.throws(() => {
		ow(['foo'], ow.array.empty);
	}, {
		message: 'Expected array to be empty, got `["foo"]`'
	});
});

test('array.nonEmpty', t => {
	t.notThrows(() => {
		ow(['foo'], ow.array.nonEmpty);
	});

	t.throws(() => {
		ow([], ow.array.nonEmpty);
	}, {
		message: 'Expected array to not be empty'
	});
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
	}, {
		message: 'Expected array to be deeply equal to `["foo",{"id":2}]`, got `["foo",{"id":1}]`'
	});
});

test('array.ofType', t => {
	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.ofType(ow.string));
	});

	t.notThrows(() => {
		ow(['foo', 'bar'], ow.array.ofType(ow.string.minLength(3)));
	});

	t.notThrows(() => {
		ow(['a', 1], ow.array.ofType(ow.any(ow.string, ow.number)));
	});

	t.throws(() => {
		ow(['foo', 'b'], ow.array.ofType(ow.string.minLength(3)));
	}, {
		message: '(array) Expected string to have a minimum length of `3`, got `b`'
	});

	t.throws(() => {
		ow(['foo', 'b'], 'foo', ow.array.ofType(ow.string.minLength(3)));
	}, {
		message: '(array `foo`) Expected string to have a minimum length of `3`, got `b`'
	});
});

test('array.exactShape', t => {
	t.notThrows(() => {
		ow(['🦄', 2, 3, true, {isFirstCommit: true}], ow.array.exactShape([ow.string, ow.number, ow.number, ow.boolean, ow.object.exactShape({isFirstCommit: ow.boolean})]));
	});

	t.throws(() => {
		ow(['🦄', 2, 'nope', true, {isFirstCommit: true}], ow.array.exactShape([ow.string, ow.number, ow.number, ow.boolean, ow.object.exactShape({isFirstCommit: ow.string})]));
	}, {
		message: 'Expected element `2` to be of type `number` but received type `string` in array'
	});

	t.throws(() => {
		ow(['🦄', 'nope', {isFirstCommit: true}], ow.array.exactShape([ow.string, ow.string, ow.object.exactShape({isFirstCommit: ow.boolean}), ow.number, ow.boolean]));
	}, {
		message: 'Expected element `3` to be of type `number` but received type `undefined` in array'
	});

	t.throws(() => {
		ow(['🦄', {isFirstCommit: true}, 'nope', 5, {accepted: false}], ow.array.exactShape([ow.string, ow.object.exactShape({isFirstCommit: ow.boolean}), ow.string]));
	}, {
		message: 'Did not expect element `3` to exist, got `5` in array'
	});
});
