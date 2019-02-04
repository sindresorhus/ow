import test from 'ava';
import ow from '../source';

test('set', t => {
	t.notThrows(() => {
		ow(new Set(), ow.set);
	});

	t.notThrows(() => {
		ow(new Set(['🦄']), ow.set);
	});

	t.throws(() => {
		ow(12 as any, ow.set);
	}, 'Expected argument to be of type `Set` but received type `number`');

	t.throws(() => {
		ow(12 as any, 'foo', ow.set);
	}, 'Expected `foo` to be of type `Set` but received type `number`');
});

test('set.size', t => {
	t.notThrows(() => {
		ow(new Set(), ow.set.size(0));
	});

	t.notThrows(() => {
		ow(new Set(['🦄']), ow.set.size(1));
	});

	t.throws(() => {
		ow(new Set(['🦄']), ow.set.size(0));
	}, 'Expected Set to have size `0`, got `1`');

	t.throws(() => {
		ow(new Set(['🦄']), 'foo', ow.set.size(0));
	}, 'Expected Set `foo` to have size `0`, got `1`');
});

test('set.minSize', t => {
	t.notThrows(() => {
		ow(new Set(['🦄']), ow.set.minSize(1));
	});

	t.notThrows(() => {
		ow(new Set(['🦄', '🌈']), ow.set.minSize(1));
	});

	t.throws(() => {
		ow(new Set(['🦄']), ow.set.minSize(2));
	}, 'Expected Set to have a minimum size of `2`, got `1`');
});

test('set.maxSize', t => {
	t.notThrows(() => {
		ow(new Set(['🦄']), ow.set.maxSize(1));
	});

	t.notThrows(() => {
		ow(new Set(['🦄', '🌈']), ow.set.maxSize(4));
	});

	t.throws(() => {
		ow(new Set(['🦄', '🌈']), ow.set.maxSize(1));
	}, 'Expected Set to have a maximum size of `1`, got `2`');
});

test('set.hasKeys', t => {
	t.notThrows(() => {
		ow(new Set(['unicorn']), ow.set.has('unicorn'));
	});

	t.notThrows(() => {
		ow(new Set(['unicorn', 'rainbow']), ow.set.has('unicorn', 'rainbow'));
	});

	t.notThrows(() => {
		ow(new Set([1, 2]), ow.set.has(1, 2));
	});

	t.throws(() => {
		ow(new Set(['unicorn', 'rainbow']), ow.set.has('foo'));
	}, 'Expected Set to have items `["foo"]`');

	t.throws(() => {
		ow(new Set(['unicorn', 'foo']), ow.set.has('foo', 'bar'));
	}, 'Expected Set to have items `["bar"]`');

	t.throws(() => {
		ow(new Set([2, 4]), ow.set.has(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
	}, 'Expected Set to have items `[1,3,5,6,7]`');
});

test('set.hasAny', t => {
	t.notThrows(() => {
		ow(new Set(['unicorn']), ow.set.hasAny('unicorn', 'rainbow'));
	});

	t.notThrows(() => {
		ow(new Set(['unicorn', 'rainbow']), ow.set.hasAny('unicorn'));
	});

	t.notThrows(() => {
		ow(new Set([1, 2]), ow.set.hasAny(1, 2, 3, 4));
	});

	t.throws(() => {
		ow(new Set(['unicorn', 'rainbow']), ow.set.hasAny('foo'));
	}, 'Expected Set to have any item of `["foo"]`');
});

test('set.ofType', t => {
	t.notThrows(() => {
		ow(new Set(['unicorn']), ow.set.ofType(ow.string));
	});

	t.notThrows(() => {
		ow(new Set(['unicorn', 'rainbow']), ow.set.ofType(ow.string.minLength(3)));
	});

	t.notThrows(() => {
		ow(new Set([1]), ow.set.ofType(ow.number));
	});

	t.throws(() => {
		ow(new Set(['unicorn']), ow.set.ofType(ow.number));
	}, '(Set) Expected argument to be of type `number` but received type `string`');

	t.throws(() => {
		ow(new Set(['unicorn']), 'foo', ow.set.ofType(ow.number));
	}, '(Set `foo`) Expected argument to be of type `number` but received type `string`');
});

test('set.empty', t => {
	t.notThrows(() => {
		ow(new Set(), ow.set.empty);
	});

	t.notThrows(() => {
		ow(new Set([]), ow.set.empty);
	});

	t.throws(() => {
		ow(new Set(['unicorn']), ow.set.empty);
	}, 'Expected Set to be empty, got `["unicorn"]`');
});

test('set.notEmpty', t => {
	t.notThrows(() => {
		ow(new Set(['unicorn']), ow.set.nonEmpty);
	});

	t.throws(() => {
		ow(new Set(), ow.set.nonEmpty);
	}, 'Expected Set to not be empty');
});

test('set.deepEqual', t => {
	t.notThrows(() => {
		ow(new Set(['unicorn']), ow.set.deepEqual(new Set(['unicorn'])));
	});

	t.notThrows(() => {
		ow(new Set([{foo: 'bar'}]), ow.set.deepEqual(new Set([{foo: 'bar'}])));
	});

	t.throws(() => {
		ow(new Set(['unicorn']), ow.set.deepEqual(new Set(['rainbow'])));
	}, 'Expected Set to be deeply equal to `["rainbow"]`, got `["unicorn"]`');

	t.throws(() => {
		ow(new Set([{foo: 'bar'}]), ow.set.deepEqual(new Set([{foo: 'baz'}])));
	}, 'Expected Set to be deeply equal to `[{"foo":"baz"}]`, got `[{"foo":"bar"}]`');
});
