/* eslint-disable @typescript-eslint/naming-convention */
import test from 'ava';
import ow, {ArgumentError, BasePredicate, Main} from '../source';
import {testSymbol} from '../source/predicates/base-predicate';
import {createAnyError, createAnyPredicateError} from './fixtures/create-error';

test('any predicate', t => {
	// #region Tests line 49 of predicates/any.ts and lines 16-21 of utils/generate-argument-error-message.ts
	const error_1 = t.throws<ArgumentError>(() => {
		ow(5 as any, ow.any(ow.string));
	}, {
		message: createAnyError('Expected argument to be of type `string` but received type `number`'),
	});

	t.is(error_1.validationErrors.size, 1, 'There should be only one error');

	const reportedError_1_1 = error_1.validationErrors.get('string')!;

	t.is(reportedError_1_1.size, 1, 'There should be only one element');
	t.deepEqual(reportedError_1_1, new Set([
		'Expected argument to be of type `string` but received type `number`',
	]));

	// #endregion

	// #region Tests line 49 of predicates/any.ts and lines 36-41 of utils/generate-argument-error-message.ts
	const error_2 = t.throws<ArgumentError>(() => {
		ow(21 as any, ow.any(
			ow.string.url.minLength(24),
			ow.number.greaterThan(42),
		));
	},
	{
		message: createAnyPredicateError([
			'string',
			[
				'Expected argument to be of type `string` but received type `number`',
				'Expected string to be a URL, got `21`',
				'Expected string to have a minimum length of `24`, got `21`',
			],
		], [
			'number',
			['Expected number to be greater than 42, got 21'],
		]),
	});

	t.is(error_2.validationErrors.size, 2, 'There should be two types of errors reported');

	const reportedError_2_1 = error_2.validationErrors.get('string')!;
	const reportedError_2_2 = error_2.validationErrors.get('number')!;

	t.is(reportedError_2_1.size, 3, 'There should be three errors reported for the string predicate');
	t.is(reportedError_2_2.size, 1, 'There should be one error reported for the number predicate');

	t.deepEqual(reportedError_2_1, new Set([
		'Expected argument to be of type `string` but received type `number`',
		'Expected string to be a URL, got `21`',
		'Expected string to have a minimum length of `24`, got `21`',
	]));

	t.deepEqual(reportedError_2_2, new Set([
		'Expected number to be greater than 42, got 21',
	]));

	// #endregion

	// #region Tests line 49 of predicates/any.ts and lines 31-33 of utils/generate-argument-error-message.ts
	const error_3 = t.throws<ArgumentError>(() => {
		ow(null as any, ow.any(
			ow.string,
			ow.number,
		));
	}, {
		message: createAnyError(
			'Expected argument to be of type `string` but received type `null`',
			'Expected argument to be of type `number` but received type `null`',
		),
	});

	t.is(error_3.validationErrors.size, 2, 'There should be two types of errors reported');

	const reportedError_3_1 = error_3.validationErrors.get('string')!;
	const reportedError_3_2 = error_3.validationErrors.get('number')!;

	t.is(reportedError_3_1.size, 1, 'There should be one error reported for the string predicate');
	t.is(reportedError_3_2.size, 1, 'There should be one error reported for the number predicate');

	t.deepEqual(reportedError_3_1, new Set([
		'Expected argument to be of type `string` but received type `null`',
	]));
	t.deepEqual(reportedError_3_2, new Set([
		'Expected argument to be of type `number` but received type `null`',
	]));

	const error_4 = t.throws<ArgumentError>(() => {
		ow(21 as any, ow.any(
			ow.string.url.minLength(21),
			ow.string.url.minLength(42),
		));
	}, {
		message: createAnyError(
			'Expected argument to be of type `string` but received type `number`',
			'Expected string to be a URL, got `21`',
			'Expected string to have a minimum length of `21`, got `21`',
			'Expected string to have a minimum length of `42`, got `21`',
		),
	});

	t.is(error_4.validationErrors.size, 1, 'There should be one type of error reported');

	const reportedError_4_1 = error_4.validationErrors.get('string')!;

	t.is(reportedError_4_1.size, 4, 'There should be four errors reported for the string predicate');

	t.deepEqual(reportedError_4_1, new Set([
		'Expected argument to be of type `string` but received type `number`',
		'Expected string to be a URL, got `21`',
		'Expected string to have a minimum length of `21`, got `21`',
		'Expected string to have a minimum length of `42`, got `21`',
	]));
	// #endregion

	// #region Tests line 47,65
	class CustomPredicate implements BasePredicate<string> {
		[testSymbol](_value: string, _main: Main, _label: string | Function): void {
			throw new Error('Custom error.');
		}
	}

	t.notThrows(() => {
		ow(5 as any, ow.any(new CustomPredicate()));
	}, 'It should not throw when the thrown error from the predicate is not an ArgumentError');
	// #endregion
});
