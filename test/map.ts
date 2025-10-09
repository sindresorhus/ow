import test from 'ava';
import ow from '../source/index.js';

test('map', t => {
	t.notThrows(() => {
		ow(new Map(), ow.map);
	});

	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map);
	});

	t.throws(() => {
		ow(12 as any, ow.map);
	}, {message: 'Expected argument to be of type `Map` but received type `number`'});

	t.throws(() => {
		ow(12 as any, 'foo', ow.map);
	}, {message: 'Expected `foo` to be of type `Map` but received type `number`'});
});

test('map.size', t => {
	t.notThrows(() => {
		ow(new Map(), ow.map.size(0));
	});

	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.size(1));
	});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.size(0));
	}, {message: 'Expected Map to have size `0`, got `1`'});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄']]), 'foo', ow.map.size(0));
	}, {message: 'Expected Map `foo` to have size `0`, got `1`'});
});

test('map.minSize', t => {
	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.minSize(1));
	});

	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.minSize(1));
	});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.minSize(2));
	}, {message: 'Expected Map to have a minimum size of `2`, got `1`'});
});

test('map.maxSize', t => {
	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.maxSize(1));
	});

	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.maxSize(4));
	});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.maxSize(1));
	}, {message: 'Expected Map to have a maximum size of `1`, got `2`'});
});

test('map.hasKeys', t => {
	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.hasKeys('unicorn'));
	});

	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.hasKeys('unicorn', 'rainbow'));
	});

	t.notThrows(() => {
		ow(new Map([[1, '🦄'], [2, '🌈']]), ow.map.hasKeys(1, 2));
	});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.hasKeys('foo'));
	}, {message: 'Expected Map to have keys `["foo"]`'});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄'], ['foo', '🌈']]), ow.map.hasKeys('foo', 'bar'));
	}, {message: 'Expected Map to have keys `["bar"]`'});

	t.throws(() => {
		ow(new Map([[2, '🦄'], [4, '🌈']]), ow.map.hasKeys(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
	}, {message: 'Expected Map to have keys `[1,3,5,6,7]`'});
});

test('map.hasAnyKeys', t => {
	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.hasAnyKeys('unicorn', 'rainbow'));
	});

	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.hasAnyKeys('unicorn'));
	});

	t.notThrows(() => {
		ow(new Map([[1, '🦄'], [2, '🌈']]), ow.map.hasAnyKeys(1, 2, 3, 4));
	});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.hasAnyKeys('foo'));
	}, {message: 'Expected Map to have any key of `["foo"]`'});
});

test('map.hasValues', t => {
	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.hasValues('🦄'));
	});

	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.hasValues('🦄', '🌈'));
	});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.hasValues('🦄', '🌦️'));
	}, {message: 'Expected Map to have values `["🌦️"]`'});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.hasValues('🌈', '⚡', '👓', '🐬', '🎃', '🎶', '❤', '️🐳', '🍀', '👽'));
	}, {message: 'Expected Map to have values `["⚡","👓","🐬","🎃","🎶"]`'});
});

test('map.hasAnyValues', t => {
	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.hasAnyValues('🦄', '🌈'));
	});

	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.hasAnyValues('🦄'));
	});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.hasAnyValues('🌦️'));
	}, {message: 'Expected Map to have any value of `["🌦️"]`'});
});

test('map.keysOfType', t => {
	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.keysOfType(ow.string));
	});

	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄'], ['rainbow', '🌈']]), ow.map.keysOfType(ow.string.minLength(3)));
	});

	t.notThrows(() => {
		ow(new Map([[1, '🦄']]), ow.map.keysOfType(ow.number));
	});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.keysOfType(ow.number));
	}, {message: '(Map) Expected keys to be of type `number` but received type `string`'});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄']]), 'foo', ow.map.keysOfType(ow.number));
	}, {message: '(Map `foo`) Expected keys to be of type `number` but received type `string`'});

	t.notThrows(() => {
		ow(new Map([['foo', 1], [2, 3]]), ow.map.keysOfType(ow.any(ow.string, ow.number)));
	});

	t.throws(() => {
		ow(new Map([['foo', 1], [true, 3]]), ow.map.keysOfType(ow.any(ow.string, ow.number)));
	}, {message: /Any predicate failed/});
});

test('map.valuesOfType', t => {
	t.notThrows(() => {
		ow(new Map([['unicorn', 1]]), ow.map.valuesOfType(ow.number));
	});

	t.notThrows(() => {
		ow(new Map([['unicorn', 10], ['rainbow', 11]]), ow.map.valuesOfType(ow.number.greaterThanOrEqual(10)));
	});

	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.valuesOfType(ow.string));
	});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.valuesOfType(ow.number));
	}, {message: '(Map) Expected values to be of type `number` but received type `string`'});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄']]), 'foo', ow.map.valuesOfType(ow.number));
	}, {message: '(Map `foo`) Expected values to be of type `number` but received type `string`'});

	t.notThrows(() => {
		ow(new Map([['foo', 'bar'], ['baz', 123]]), ow.map.valuesOfType(ow.any(ow.string, ow.number)));
	});

	t.throws(() => {
		ow(new Map([['foo', 'bar'], ['baz', true]]), ow.map.valuesOfType(ow.any(ow.string, ow.number)));
	}, {message: /Any predicate failed/});
});

test('map.empty', t => {
	t.notThrows(() => {
		ow(new Map(), ow.map.empty);
	});

	t.notThrows(() => {
		ow(new Map<string, string>([]), ow.map.empty);
	});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.empty);
	}, {message: 'Expected Map to be empty, got `[["unicorn","🦄"]]`'});
});

test('map.notEmpty', t => {
	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.nonEmpty);
	});

	t.throws(() => {
		ow(new Map(), ow.map.nonEmpty);
	}, {message: 'Expected Map to not be empty'});
});

test('map.deepEqual', t => {
	t.notThrows(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.deepEqual(new Map([['unicorn', '🦄']])));
	});

	t.notThrows(() => {
		ow(new Map([['foo', {foo: 'bar'}]]), ow.map.deepEqual(new Map([['foo', {foo: 'bar'}]])));
	});

	t.throws(() => {
		ow(new Map([['unicorn', '🦄']]), ow.map.deepEqual(new Map([['rainbow', '🌈']])));
	}, {message: 'Expected Map to be deeply equal to `[["rainbow","🌈"]]`, got `[["unicorn","🦄"]]`'});

	t.throws(() => {
		ow(new Map([['foo', {foo: 'bar'}]]), ow.map.deepEqual(new Map([['foo', {foo: 'baz'}]])));
	}, {message: 'Expected Map to be deeply equal to `[["foo",{"foo":"baz"}]]`, got `[["foo",{"foo":"bar"}]]`'});
});
