import test from 'ava';
import ow from '../source';
import {createAnyError} from './fixtures/create-error';

test('infer label', t => {
	const foo = 'f';

	t.throws(() => {
		ow(foo, ow.string.minLength(2));
	}, 'Expected string `foo` to have a minimum length of `2`, got `f`');

	t.throws(() => {
		ow(foo as any, ow.number);
	}, 'Expected `foo` to be of type `number` but received type `string`');
});

test('infer object property label', t => {
	const hello = {
		world: 'f'
	};

	t.throws(() => {
		ow(hello.world, ow.string.minLength(2));
	}, 'Expected string `hello.world` to have a minimum length of `2`, got `f`');
});

test('overwrite inferred label', t => {
	const foo = 'f';

	t.throws(() => {
		ow(foo, '🦄', ow.string.minLength(2));
	}, 'Expected string `🦄` to have a minimum length of `2`, got `f`');
});

test('infer label in `any` predicate', t => {
	const foo = 'f';

	t.throws(() => {
		ow(foo, ow.any(ow.string.minLength(2), ow.number));
	}, createAnyError(
		'Expected string `foo` to have a minimum length of `2`, got `f`',
		'Expected `foo` to be of type `number` but received type `string`'
	));
});

test('overwrite inferred label in `any` predicate', t => {
	const foo = 'f';

	t.throws(() => {
		ow(foo, '🦄', ow.any(ow.string.minLength(2), ow.number));
	}, createAnyError(
		'Expected string `🦄` to have a minimum length of `2`, got `f`',
		'Expected `🦄` to be of type `number` but received type `string`'
	));
});
