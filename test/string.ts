import test from 'ava';
import ow from '../source';

test('string', t => {
	const bar: any = 12;

	t.notThrows(() => {
		ow('foo', ow.string);
	});

	t.throws(() => {
		ow(12 as any, ow.string);
	}, 'Expected argument to be of type `string` but received type `number`');

	t.throws(() => {
		ow(12 as any, 'bar', ow.string);
	}, 'Expected `bar` to be of type `string` but received type `number`');

	t.throws(() => {
		ow(bar, ow.string);
	}, 'Expected `bar` to be of type `string` but received type `number`');
});

test('string.length', t => {
	t.notThrows(() => {
		ow('foo', ow.string.length(3));
	});

	t.notThrows(() => {
		ow('foobar', ow.string.length(6));
	});

	t.throws(() => {
		ow('foo' as any, ow.string.length(4));
	}, 'Expected string to have length `4`, got `foo`');

	t.throws(() => {
		ow('foo' as any, 'foo', ow.string.length(4));
	}, 'Expected string `foo` to have length `4`, got `foo`');
});

test('string.minLength', t => {
	t.notThrows(() => {
		ow('foo', ow.string.minLength(2));
	});

	t.notThrows(() => {
		ow('foo', ow.string.minLength(3));
	});

	t.throws(() => {
		ow('foo' as any, ow.string.minLength(4));
	}, 'Expected string to have a minimum length of `4`, got `foo`');
});

test('string.maxLength', t => {
	t.notThrows(() => {
		ow('foo', ow.string.maxLength(3));
	});

	t.notThrows(() => {
		ow('foo', ow.string.maxLength(5));
	});

	t.throws(() => {
		ow('foo' as any, ow.string.maxLength(2));
	}, 'Expected string to have a maximum length of `2`, got `foo`');
});

test('string.matches', t => {
	t.notThrows(() => {
		ow('foo', ow.string.matches(/^f.o$/));
	});

	t.notThrows(() => {
		ow('Foo', ow.string.matches(/^f.o$/i));
	});

	t.throws(() => {
		ow('Foo' as any, ow.string.matches(/^f.o$/));
	}, 'Expected string to match `/^f.o$/`, got `Foo`');

	t.throws(() => {
		ow('bar' as any, ow.string.matches(/^f.o$/i));
	}, 'Expected string to match `/^f.o$/i`, got `bar`');
});

test('string.startsWith', t => {
	t.notThrows(() => {
		ow('foo', ow.string.startsWith('fo'));
	});

	t.notThrows(() => {
		ow('foo', ow.string.startsWith('f'));
	});

	t.throws(() => {
		ow('foo' as any, ow.string.startsWith('oo'));
	}, 'Expected string to start with `oo`, got `foo`');

	t.throws(() => {
		ow('foo' as any, ow.string.startsWith('b'));
	}, 'Expected string to start with `b`, got `foo`');
});

test('string.endsWith', t => {
	t.notThrows(() => {
		ow('foo', ow.string.endsWith('oo'));
	});

	t.notThrows(() => {
		ow('foo', ow.string.endsWith('o'));
	});

	t.throws(() => {
		ow('foo' as any, ow.string.endsWith('fo'));
	}, 'Expected string to end with `fo`, got `foo`');

	t.throws(() => {
		ow('foo' as any, ow.string.endsWith('ar'));
	}, 'Expected string to end with `ar`, got `foo`');
});

test('string.includes', t => {
	t.notThrows(() => {
		ow('foo', ow.string.includes('fo'));
	});

	t.throws(() => {
		ow('foo' as any, ow.string.includes('bar'));
	}, 'Expected string to include `bar`, got `foo`');
});

test('string.oneOf', t => {
	t.notThrows(() => {
		ow('foo', ow.string.oneOf(['foo', 'bar']));
	});

	t.throws(() => {
		ow('foo', ow.string.oneOf(['unicorn', 'rainbow']));
	}, 'Expected string to be one of `["unicorn","rainbow"]`, got `foo`');

	t.throws(() => {
		ow('foo', 'hello', ow.string.oneOf(['unicorn', 'rainbow']));
	}, 'Expected string `hello` to be one of `["unicorn","rainbow"]`, got `foo`');

	t.throws(() => {
		ow('foo', ow.string.oneOf(['a', 'b', 'c', 'd', 'e']));
	}, 'Expected string to be one of `["a","b","c","d","e"]`, got `foo`');

	t.throws(() => {
		ow('foo', ow.string.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']));
	}, 'Expected string to be one of `["1","2","3","4","5","6","7","8","9","10",…+3 more]`, got `foo`');
});

test('string.empty', t => {
	t.notThrows(() => {
		ow('', ow.string.empty);
	});

	t.throws(() => {
		ow('foo' as any, ow.string.empty);
	}, 'Expected string to be empty, got `foo`');
});

test('string.nonEmpty', t => {
	t.notThrows(() => {
		ow('foo', ow.string.nonEmpty);
	});

	t.throws(() => {
		ow('' as any, ow.string.nonEmpty);
	}, 'Expected string to not be empty');
});

test('string.equals', t => {
	t.notThrows(() => {
		ow('foo', ow.string.equals('foo'));
	});

	t.throws(() => {
		ow('bar' as any, ow.string.equals('foo'));
	}, 'Expected string to be equal to `foo`, got `bar`');
});

test('string.alphabetical', t => {
	t.notThrows(() => {
		ow('foo', ow.string.alphabetical);
	});

	t.notThrows(() => {
		ow('FOO', ow.string.alphabetical);
	});

	t.throws(() => {
		ow('foo123', ow.string.alphabetical);
	}, 'Expected string to be alphabetical, got `foo123`');

	t.throws(() => {
		ow('', ow.string.alphabetical);
	}, 'Expected string to be alphabetical, got ``');
});

test('string.alphanumeric', t => {
	t.notThrows(() => {
		ow('Foo123', ow.string.alphanumeric);
	});

	t.throws(() => {
		ow('Foo123!' as any, ow.string.alphanumeric);
	}, 'Expected string to be alphanumeric, got `Foo123!`');
});

test('string.numeric', t => {
	t.notThrows(() => {
		ow('123', ow.string.numeric);
	});

	t.notThrows(() => {
		ow('-123', ow.string.numeric);
	});

	t.notThrows(() => {
		ow('+123', ow.string.numeric);
	});

	t.throws(() => {
		ow('Foo123', ow.string.numeric);
	}, 'Expected string to be numeric, got `Foo123`');

	t.throws(() => {
		ow('++123', ow.string.numeric);
	}, 'Expected string to be numeric, got `++123`');

	t.throws(() => {
		ow('1+1', ow.string.numeric);
	}, 'Expected string to be numeric, got `1+1`');

	t.throws(() => {
		ow('11-', ow.string.numeric);
	}, 'Expected string to be numeric, got `11-`');

	t.throws(() => {
		ow('--123', ow.string.numeric);
	}, 'Expected string to be numeric, got `--123`');

	t.throws(() => {
		ow('+-123', ow.string.numeric);
	}, 'Expected string to be numeric, got `+-123`');
});

test('string.date', t => {
	t.notThrows(() => {
		ow('2017-03-02', ow.string.date);
	});

	t.notThrows(() => {
		ow('2017-03-02T10:00:00Z', ow.string.date);
	});

	t.throws(() => {
		ow('foo' as any, ow.string.date);
	}, 'Expected string to be a date, got `foo`');

	t.throws(() => {
		ow('foo' as any, 'bar', ow.string.date);
	}, 'Expected string `bar` to be a date, got `foo`');
});

test('string.lowercase', t => {
	t.notThrows(() => {
		ow('foo', ow.string.lowercase);
	});

	t.notThrows(() => {
		ow('foo123', ow.string.lowercase);
	});

	t.notThrows(() => {
		ow('123', ow.string.lowercase);
	});

	t.throws(() => {
		ow('FOO', ow.string.lowercase);
	}, 'Expected string to be lowercase, got `FOO`');

	t.throws(() => {
		ow('', ow.string.lowercase);
	}, 'Expected string to be lowercase, got ``');
});

test('string.uppercase', t => {
	t.notThrows(() => {
		ow('FOO', ow.string.uppercase);
	});

	t.notThrows(() => {
		ow('FOO123', ow.string.uppercase);
	});

	t.notThrows(() => {
		ow('123', ow.string.uppercase);
	});

	t.throws(() => {
		ow('foo', ow.string.uppercase);
	}, 'Expected string to be uppercase, got `foo`');

	t.throws(() => {
		ow('', ow.string.uppercase);
	}, 'Expected string to be uppercase, got ``');
});

test('string.url', t => {
	t.notThrows(() => {
		ow('https://sindresorhus.com', ow.string.url);
	});

	t.notThrows(() => {
		ow('file:///path/to/an/awesome/file', ow.string.url);
	});

	t.throws(() => {
		ow('foo' as any, ow.string.url);
	}, 'Expected string to be a URL, got `foo`');

	t.throws(() => {
		ow('foo' as any, 'bar', ow.string.url);
	}, 'Expected string `bar` to be a URL, got `foo`');
});
