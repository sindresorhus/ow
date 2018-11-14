import test from 'ava';
import m from '..';
import {createAnyError} from './fixtures/create-error';

test('infer label', t => {
	const foo = 'f';

	t.throws(() => m(foo, m.string.minLength(2)), 'Expected string `foo` to have a minimum length of `2`, got `f`');
	t.throws(() => m(foo as any, m.number), 'Expected `foo` to be of type `number` but received type `string`');
});

test('infer object property label', t => {
	const hello = {
		world: 'f'
	};

	t.throws(() => m(hello.world, m.string.minLength(2)), 'Expected string `hello.world` to have a minimum length of `2`, got `f`');
});

test('overwrite inferred label', t => {
	const foo = 'f';

	t.throws(() => m(foo, '🦄', m.string.minLength(2)), 'Expected string `🦄` to have a minimum length of `2`, got `f`');
});

test('infer label in `any` predicate', t => {
	const foo = 'f';

	t.throws(() => m(foo, m.any(m.string.minLength(2), m.number)), createAnyError(
		'Expected string `foo` to have a minimum length of `2`, got `f`',
		'Expected `foo` to be of type `number` but received type `string`'
	));
});

test('overwrite inferred label in `any` predicate', t => {
	const foo = 'f';

	t.throws(() => m(foo, '🦄', m.any(m.string.minLength(2), m.number)), createAnyError(
		'Expected string `🦄` to have a minimum length of `2`, got `f`',
		'Expected `🦄` to be of type `number` but received type `string`'
	));
});
