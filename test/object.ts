import test from 'ava';
import ow from '../source/index.js';

class Unicorn {} // eslint-disable-line @typescript-eslint/no-extraneous-class

test('object', t => {
	t.notThrows(() => {
		ow({}, ow.object);
	});

	t.notThrows(() => {
		ow(new Error('foo'), ow.object);
	});

	t.throws(() => {
		ow('foo' as any, ow.object);
	}, {message: 'Expected argument to be of type `object` but received type `string`'});

	t.throws(() => {
		ow('foo' as any, 'foo', ow.object);
	}, {message: 'Expected `foo` to be of type `object` but received type `string`'});

	t.throws(() => {
		ow(1 as any, ow.object);
	}, {message: 'Expected argument to be of type `object` but received type `number`'});
});

test('object.plain', t => {
	t.notThrows(() => {
		ow({}, ow.object.plain);
	});

	t.throws(() => {
		ow(new Error('foo'), ow.object.plain);
	}, {message: 'Expected object to be a plain object'});

	t.throws(() => {
		ow(new Error('foo'), 'foo', ow.object.plain);
	}, {message: 'Expected object `foo` to be a plain object'});
});

test('object.empty', t => {
	t.notThrows(() => {
		ow({}, ow.object.empty);
	});

	t.throws(() => {
		ow({unicorn: '🦄'}, ow.object.empty);
	}, {message: 'Expected object to be empty, got `{"unicorn":"🦄"}`'});
});

test('object.nonEmpty', t => {
	t.notThrows(() => {
		ow({unicorn: '🦄'}, ow.object.nonEmpty);
	});
	t.throws(() => {
		ow({}, ow.object.nonEmpty);
	}, {message: 'Expected object to not be empty'});
});

test('object.valuesOfType', t => {
	t.notThrows(() => {
		ow({unicorn: '🦄'}, ow.object.valuesOfType(ow.string));
	});

	t.notThrows(() => {
		ow({unicorn: '🦄', rainbow: '🌈'}, ow.object.valuesOfType(ow.string));
	});

	t.notThrows(() => {
		ow({unicorn: 1, rainbow: 2}, ow.object.valuesOfType(ow.number));
	});

	t.notThrows(() => {
		ow(['🦄', true], ow.object.valuesOfType(ow.any(ow.string, ow.boolean)));
	});

	t.throws(() => {
		ow({unicorn: '🦄', rainbow: 2}, ow.object.valuesOfType(ow.string));
	}, {message: '(object) Expected values to be of type `string` but received type `number`'});

	t.throws(() => {
		ow({unicorn: '🦄', rainbow: 2}, 'foo', ow.object.valuesOfType(ow.string));
	}, {message: '(object `foo`) Expected values to be of type `string` but received type `number`'});

	t.throws(() => {
		ow({unicorn: 'a', rainbow: 'b'}, ow.object.valuesOfType(ow.string.minLength(2)));
	}, {message: '(object) Expected string values to have a minimum length of `2`, got `a`'});

	t.throws(() => {
		ow(['🦄', true, 1], ow.object.valuesOfType(ow.any(ow.string, ow.boolean)));
	}, {message: '(object) Any predicate failed with the following errors:\n  - Expected values to be of type `string` but received type `number`\n  - Expected values to be of type `boolean` but received type `number`'});
});

test('object.valuesOfTypeDeep', t => {
	t.notThrows(() => {
		ow({unicorn: '🦄'}, ow.object.deepValuesOfType(ow.string));
	});

	t.notThrows(() => {
		ow({unicorn: '🦄', rainbow: '🌈'}, ow.object.deepValuesOfType(ow.string));
	});

	t.notThrows(() => {
		ow({unicorn: {key: '🦄', value: '🌈'}}, ow.object.deepValuesOfType(ow.string));
	});

	t.notThrows(() => {
		ow({a: {b: {c: {d: 1}, e: 2}, f: 3}}, ow.object.deepValuesOfType(ow.number));
	});

	t.throws(() => {
		ow({unicorn: {key: '🦄', value: 1}}, ow.object.deepValuesOfType(ow.string));
	}, {message: '(object) Expected deep values to be of type `string` but received type `number`'});

	t.throws(() => {
		ow({unicorn: {key: '🦄', value: 1}}, 'foo', ow.object.deepValuesOfType(ow.string));
	}, {message: '(object `foo`) Expected deep values to be of type `string` but received type `number`'});

	t.throws(() => {
		ow({a: {b: {c: {d: 1}, e: '2'}, f: 3}}, ow.object.deepValuesOfType(ow.number));
	}, {message: '(object) Expected deep values to be of type `number` but received type `string`'});
});

test('object.deepEqual', t => {
	t.notThrows(() => {
		ow({unicorn: '🦄'}, ow.object.deepEqual({unicorn: '🦄'}));
	});

	t.notThrows(() => {
		ow({unicorn: '🦄', rain: {bow: '🌈'}}, ow.object.deepEqual({unicorn: '🦄', rain: {bow: '🌈'}}));
	});

	t.throws(() => {
		ow({unicorn: '🦄'}, ow.object.deepEqual({rainbow: '🌈'}));
	}, {message: 'Expected object to be deeply equal to `{"rainbow":"🌈"}`, got `{"unicorn":"🦄"}`'});
});

test('object.instanceOf', t => {
	t.notThrows(() => {
		ow(new Error('🦄'), ow.object.instanceOf(Error));
	});

	t.notThrows(() => {
		ow(new Unicorn(), ow.object.instanceOf(Unicorn));
	});

	t.throws(() => {
		ow(new Unicorn(), ow.object.instanceOf(Error));
	}, {message: 'Expected object `Unicorn` to be of type `Error`'});

	t.throws(() => {
		ow(new Unicorn(), 'foo', ow.object.instanceOf(Error));
	}, {message: 'Expected object `foo` `Unicorn` to be of type `Error`'});

	t.throws(() => {
		ow(new Error('🦄'), ow.object.instanceOf(Unicorn));
	}, {message: 'Expected object `Error` to be of type `Unicorn`'});

	t.throws(() => {
		ow({unicorn: '🦄'}, ow.object.instanceOf(Unicorn));
	}, {message: 'Expected object `{"unicorn":"🦄"}` to be of type `Unicorn`'});

	t.throws(() => {
		ow(null, ow.object.instanceOf(Unicorn));
	}, {message: /Expected object `null` to be of type `Unicorn`/});

	t.throws(() => {
		ow(undefined, ow.object.instanceOf(Unicorn));
	}, {message: /Expected object `undefined` to be of type `Unicorn`/});
});

test('object.hasKeys', t => {
	t.notThrows(() => {
		ow({unicorn: '🦄'}, ow.object.hasKeys('unicorn'));
	});

	t.notThrows(() => {
		ow({unicorn: {value: '🦄'}}, ow.object.hasKeys('unicorn'));
	});

	t.notThrows(() => {
		ow({unicorn: {value: '🦄'}}, ow.object.hasKeys('unicorn.value'));
	});

	t.notThrows(() => {
		ow({unicorn: '🦄', rainbow: '🌈'}, ow.object.hasKeys('unicorn', 'rainbow'));
	});

	t.throws(() => {
		ow({unicorn: '🦄'}, ow.object.hasKeys('unicorn', 'rainbow'));
	}, {message: 'Expected object to have keys `["rainbow"]`'});

	t.throws(() => {
		ow({unicorn: {value: '🦄'}}, ow.object.hasKeys('unicorn.foo'));
	}, {message: 'Expected object to have keys `["unicorn.foo"]`'});
});

test('object.hasAnyKeys', t => {
	t.notThrows(() => {
		ow({unicorn: '🦄'}, ow.object.hasAnyKeys('unicorn', 'rainbow', 'foo.bar'));
	});

	t.notThrows(() => {
		ow({unicorn: {value: '🦄'}}, ow.object.hasAnyKeys('unicorn', 'rainbow'));
	});

	t.notThrows(() => {
		ow({unicorn: {value: '🦄'}}, ow.object.hasAnyKeys('unicorn.value', 'rainbow'));
	});

	t.notThrows(() => {
		ow({unicorn: '🦄', rainbow: '🌈'}, ow.object.hasAnyKeys('unicorn'));
	});

	t.throws(() => {
		ow({unicorn: '🦄'}, ow.object.hasAnyKeys('foo'));
	}, {message: 'Expected object to have any key of `["foo"]`'});

	t.throws(() => {
		ow({unicorn: '🦄'}, ow.object.hasAnyKeys('unicorn.value'));
	}, {message: 'Expected object to have any key of `["unicorn.value"]`'});
});

test('object.exactShape', t => {
	t.notThrows(() => {
		ow({unicorn: '🦄'}, ow.object.exactShape({
			unicorn: ow.string,
		}));
	});

	t.notThrows(() => {
		ow({unicorn: '🦄'}, ow.object.exactShape({
			unicorn: ow.string,
		}));
	});

	t.notThrows(() => {
		ow({unicorn: '🦄', rainbow: {value: '🌈'}}, ow.object.exactShape({
			unicorn: ow.string,
			rainbow: {
				value: ow.string,
			},
		}));
	});

	t.throws(() => {
		ow({unicorn: '🦄', rainbow: {value: '🌈'}}, ow.object.exactShape({
			unicorn: ow.string,
			rainbow: {
				foo: ow.string,
			},
		}));
	}, {message: 'Expected property `rainbow.foo` to be of type `string` but received type `undefined` in object'});

	t.throws(() => {
		ow({unicorn: '🦄', rainbow: '🌈'}, ow.object.exactShape({
			unicorn: ow.string,
		}));
	}, {message: 'Did not expect property `rainbow` to exist, got `🌈` in object'});

	const foo = {unicorn: '🦄', rainbow: {valid: true, value: '🌈'}};

	t.throws(() => {
		ow(foo, ow.object.exactShape({
			unicorn: ow.string,
			rainbow: {
				valid: ow.boolean,
			},
		}));
	}, {message: 'Did not expect property `rainbow.value` to exist, got `🌈` in object'});

	t.throws(() => {
		ow({unicorn: '🦄'}, ow.object.exactShape({
			unicorn: ow.string,
			rainbow: {
				valid: ow.boolean,
			},
		}));
	}, {message: 'Expected property `rainbow` to exist in object'});
});

test('object.partialShape', t => {
	t.notThrows(() => {
		ow({unicorn: '🦄'}, ow.object.partialShape({
			unicorn: ow.string,
		}));
	});

	t.throws(() => {
		ow({unicorn: '🦄'}, ow.object.partialShape({
			unicorn: ow.number,
		}));
	}, {message: 'Expected property `unicorn` to be of type `number` but received type `string` in object'});

	t.throws(() => {
		ow({unicorn: '🦄', rainbow: {value: '🌈'}}, ow.object.partialShape({
			unicorn: ow.string,
			rainbow: {
				value: ow.number,
			},
		}));
	}, {message: 'Expected property `rainbow.value` to be of type `number` but received type `string` in object'});

	t.throws(() => {
		ow({unicorn: '🦄', rainbow: {rocket: {value: '🌈'}}}, ow.object.partialShape({
			unicorn: ow.string,
			rainbow: {
				rocket: {
					value: ow.number,
				},
			},
		}));
	}, {message: 'Expected property `rainbow.rocket.value` to be of type `number` but received type `string` in object'});

	const foo = {unicorn: '🦄'};

	t.throws(() => {
		ow(foo, ow.object.partialShape({
			unicorn: ow.number,
		}));
	}, {message: 'Expected property `unicorn` to be of type `number` but received type `string` in object'});
});
