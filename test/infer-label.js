import test from 'ava';
/// import ow from '../source/index.js';
// import {createAnyError} from './fixtures/create-error.js';

// TODO: Disabled until we can figure out how to run the infer label tests using `ts-node`.

// test('x', t => {
// 	t.pass();
// });

// test('infer label', t => {
// 	const foo = 'f';

// 	t.throws(() => {
// 		ow(foo, ow.string.minLength(2));
// 	}, {
// 		message: 'Expected string `foo` to have a minimum length of `2`, got `f`'
// 	});

// 	t.throws(() => {
// 		ow(foo, ow.number);
// 	}, {
// 		message: 'Expected `foo` to be of type `number` but received type `string`'
// 	});
// });

// test('infer object property label', t => {
// 	const hello = {
// 		world: 'f'
// 	};

// 	t.throws(() => {
// 		ow(hello.world, ow.string.minLength(2));
// 	}, {
// 		message: 'Expected string `hello.world` to have a minimum length of `2`, got `f`'
// 	});

// test('overwrite inferred label', t => {
// 	const foo = 'f';

// 	t.throws(() => {
// 		ow(foo, '🦄', ow.string.minLength(2));
// 	}, {
// 		message: 'Expected string `🦄` to have a minimum length of `2`, got `f`'
// 	});
// });

// test('infer label in `any` predicate', t => {
// 	const foo = 'f';

// 	t.throws(() => {
// 		ow(foo, ow.any(ow.string.minLength(2), ow.number));
// 	}, {message: createAnyError(
// 		'Expected string `foo` to have a minimum length of `2`, got `f`',
// 		'Expected `foo` to be of type `number` but received type `string`'
// 	)});
// });

// test('overwrite inferred label in `any` predicate', t => {
// 	const foo = 'f';

// 	t.throws(() => {
// 		ow(foo, '🦄', ow.any(ow.string.minLength(2), ow.number));
// 	}, {message: createAnyError(
// 		'Expected string `🦄` to have a minimum length of `2`, got `f`',
// 		'Expected `🦄` to be of type `number` but received type `string`'
// 	)});
// });
