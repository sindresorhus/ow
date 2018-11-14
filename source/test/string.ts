import test from 'ava';
import m from '..';

test('string', t => {
	const bar: any = 12;

	t.notThrows(() => m('foo', m.string));
	t.throws(() => m(12 as any, m.string), 'Expected argument to be of type `string` but received type `number`');
	t.throws(() => m(12 as any, 'bar', m.string), 'Expected `bar` to be of type `string` but received type `number`');
	t.throws(() => m(bar, m.string), 'Expected `bar` to be of type `string` but received type `number`');
});

test('string.length', t => {
	t.notThrows(() => m('foo', m.string.length(3)));
	t.notThrows(() => m('foobar', m.string.length(6)));
	t.throws(() => m('foo' as any, m.string.length(4)), 'Expected string to have length `4`, got `foo`');
	t.throws(() => m('foo' as any, 'foo', m.string.length(4)), 'Expected string `foo` to have length `4`, got `foo`');
});

test('string.minLength', t => {
	t.notThrows(() => m('foo', m.string.minLength(2)));
	t.notThrows(() => m('foo', m.string.minLength(3)));
	t.throws(() => m('foo' as any, m.string.minLength(4)), 'Expected string to have a minimum length of `4`, got `foo`');
});

test('string.maxLength', t => {
	t.notThrows(() => m('foo', m.string.maxLength(3)));
	t.notThrows(() => m('foo', m.string.maxLength(5)));
	t.throws(() => m('foo' as any, m.string.maxLength(2)), 'Expected string to have a maximum length of `2`, got `foo`');
});

test('string.matches', t => {
	t.notThrows(() => m('foo', m.string.matches(/^f.o$/)));
	t.notThrows(() => m('Foo', m.string.matches(/^f.o$/i)));
	t.throws(() => m('Foo' as any, m.string.matches(/^f.o$/)), 'Expected string to match `/^f.o$/`, got `Foo`');
	t.throws(() => m('bar' as any, m.string.matches(/^f.o$/i)), 'Expected string to match `/^f.o$/i`, got `bar`');
});

test('string.startsWith', t => {
	t.notThrows(() => m('foo', m.string.startsWith('fo')));
	t.notThrows(() => m('foo', m.string.startsWith('f')));
	t.throws(() => m('foo' as any, m.string.startsWith('oo')), 'Expected string to start with `oo`, got `foo`');
	t.throws(() => m('foo' as any, m.string.startsWith('b')), 'Expected string to start with `b`, got `foo`');
});

test('string.endsWith', t => {
	t.notThrows(() => m('foo', m.string.endsWith('oo')));
	t.notThrows(() => m('foo', m.string.endsWith('o')));
	t.throws(() => m('foo' as any, m.string.endsWith('fo')), 'Expected string to end with `fo`, got `foo`');
	t.throws(() => m('foo' as any, m.string.endsWith('ar')), 'Expected string to end with `ar`, got `foo`');
});

test('string.includes', t => {
	t.notThrows(() => m('foo', m.string.includes('fo')));
	t.throws(() => m('foo' as any, m.string.includes('bar')), 'Expected string to include `bar`, got `foo`');
});

test('string.oneOf', t => {
	t.notThrows(() => m('foo', m.string.oneOf(['foo', 'bar'])));
	t.throws(() => m('foo', m.string.oneOf(['unicorn', 'rainbow'])), 'Expected string to be one of `["unicorn","rainbow"]`, got `foo`');
	t.throws(() => m('foo', 'hello', m.string.oneOf(['unicorn', 'rainbow'])), 'Expected string `hello` to be one of `["unicorn","rainbow"]`, got `foo`');
	t.throws(() => m('foo', m.string.oneOf(['a', 'b', 'c', 'd', 'e'])), 'Expected string to be one of `["a","b","c","d","e"]`, got `foo`');
	t.throws(() => m('foo', m.string.oneOf(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'])), 'Expected string to be one of `["1","2","3","4","5","6","7","8","9","10",…+3 more]`, got `foo`');
});

test('string.empty', t => {
	t.notThrows(() => m('', m.string.empty));
	t.throws(() => m('foo' as any, m.string.empty), 'Expected string to be empty, got `foo`');
});

test('string.nonEmpty', t => {
	t.notThrows(() => m('foo', m.string.nonEmpty));
	t.throws(() => m('' as any, m.string.nonEmpty), 'Expected string to not be empty');
});

test('string.equals', t => {
	t.notThrows(() => m('foo', m.string.equals('foo')));
	t.throws(() => m('bar' as any, m.string.equals('foo')), 'Expected string to be equal to `foo`, got `bar`');
});

test('string.alphabetical', t => {
	t.notThrows(() => m('foo', m.string.alphabetical));
	t.notThrows(() => m('FOO', m.string.alphabetical));
	t.throws(() => m('foo123', m.string.alphabetical), 'Expected string to be alphabetical, got `foo123`');
	t.throws(() => m('', m.string.alphabetical), 'Expected string to be alphabetical, got ``');
});

test('string.alphanumeric', t => {
	t.notThrows(() => m('Foo123', m.string.alphanumeric));
	t.throws(() => m('Foo123!' as any, m.string.alphanumeric), 'Expected string to be alphanumeric, got `Foo123!`');
});

test('string.numeric', t => {
	t.notThrows(() => m('123', m.string.numeric));
	t.notThrows(() => m('-123', m.string.numeric));
	t.notThrows(() => m('+123', m.string.numeric));
	t.throws(() => m('Foo123', m.string.numeric), 'Expected string to be numeric, got `Foo123`');
	t.throws(() => m('++123', m.string.numeric), 'Expected string to be numeric, got `++123`');
	t.throws(() => m('1+1', m.string.numeric), 'Expected string to be numeric, got `1+1`');
	t.throws(() => m('11-', m.string.numeric), 'Expected string to be numeric, got `11-`');
	t.throws(() => m('--123', m.string.numeric), 'Expected string to be numeric, got `--123`');
	t.throws(() => m('+-123', m.string.numeric), 'Expected string to be numeric, got `+-123`');
});

test('string.date', t => {
	t.notThrows(() => m('2017-03-02', m.string.date));
	t.notThrows(() => m('2017-03-02T10:00:00Z', m.string.date));
	t.throws(() => m('foo' as any, m.string.date), 'Expected string to be a date, got `foo`');
	t.throws(() => m('foo' as any, 'bar', m.string.date), 'Expected string `bar` to be a date, got `foo`');
});

test('string.lowercase', t => {
	t.notThrows(() => m('foo', m.string.lowercase));
	t.notThrows(() => m('foo123', m.string.lowercase));
	t.notThrows(() => m('123', m.string.lowercase));
	t.throws(() => m('FOO', m.string.lowercase), 'Expected string to be lowercase, got `FOO`');
	t.throws(() => m('', m.string.lowercase), 'Expected string to be lowercase, got ``');
});

test('string.uppercase', t => {
	t.notThrows(() => m('FOO', m.string.uppercase));
	t.notThrows(() => m('FOO123', m.string.uppercase));
	t.notThrows(() => m('123', m.string.uppercase));
	t.throws(() => m('foo', m.string.uppercase), 'Expected string to be uppercase, got `foo`');
	t.throws(() => m('', m.string.uppercase), 'Expected string to be uppercase, got ``');
});
