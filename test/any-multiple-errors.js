import test from 'ava';
import ow from '../source/index.js';
import {testSymbol} from '../source/predicates/base-predicate.js';
import {createAnyError, createAnyPredicateError} from './fixtures/create-error.js';

test('any predicate', t => {
	// #region Tests line 49 of predicates/any.ts and lines 16-21 of utils/generate-argument-error-message.ts
	const error1 = t.throws(() => {
		ow(5, ow.any(ow.string));
	}, {message: createAnyError('Expected argument to be of type `string` but received type `number`')});

	t.is(error1.validationErrors.size, 1, 'There should be only one error');

	const reportedError11 = error1.validationErrors.get('string');

	t.is(reportedError11.size, 1, 'There should be only one element');
	t.deepEqual(reportedError11, new Set([
		'Expected argument to be of type `string` but received type `number`'
	]));

	// #endregion

	// #region Tests line 49 of predicates/any.ts and lines 36-41 of utils/generate-argument-error-message.ts
	const error2 = t.throws(() => {
		ow(21, ow.any(
			ow.string.url.minLength(24),
			ow.number.greaterThan(42)
		));
	}, {message: createAnyPredicateError([
		'string',
		[
			'Expected argument to be of type `string` but received type `number`',
			'Expected string to be a URL, got `21`',
			'Expected string to have a minimum length of `24`, got `21`'
		]
	], [
		'number',
		['Expected number to be greater than 42, got 21']
	])});

	t.is(error2.validationErrors.size, 2, 'There should be two types of errors reported');

	const reportedError21 = error2.validationErrors.get('string');
	const reportedError22 = error2.validationErrors.get('number');

	t.is(reportedError21.size, 3, 'There should be three errors reported for the string predicate');
	t.is(reportedError22.size, 1, 'There should be one error reported for the number predicate');

	t.deepEqual(reportedError21, new Set([
		'Expected argument to be of type `string` but received type `number`',
		'Expected string to be a URL, got `21`',
		'Expected string to have a minimum length of `24`, got `21`'
	]));

	t.deepEqual(reportedError22, new Set([
		'Expected number to be greater than 42, got 21'
	]));

	// #endregion

	// #region Tests line 49 of predicates/any.ts and lines 31-33 of utils/generate-argument-error-message.ts
	const error3 = t.throws(() => {
		ow(null, ow.any(
			ow.string,
			ow.number
		));
	}, {message: createAnyError(
		'Expected argument to be of type `string` but received type `null`',
		'Expected argument to be of type `number` but received type `null`'
	)});

	t.is(error3.validationErrors.size, 2, 'There should be two types of errors reported');

	const reportedError31 = error3.validationErrors.get('string');
	const reportedError32 = error3.validationErrors.get('number');

	t.is(reportedError31.size, 1, 'There should be one error reported for the string predicate');
	t.is(reportedError32.size, 1, 'There should be one error reported for the number predicate');

	t.deepEqual(reportedError31, new Set([
		'Expected argument to be of type `string` but received type `null`'
	]));
	t.deepEqual(reportedError32, new Set([
		'Expected argument to be of type `number` but received type `null`'
	]));

	const error4 = t.throws(() => {
		ow(21, ow.any(
			ow.string.url.minLength(21),
			ow.string.url.minLength(42)
		));
	}, {message: createAnyError(
		'Expected argument to be of type `string` but received type `number`',
		'Expected string to be a URL, got `21`',
		'Expected string to have a minimum length of `21`, got `21`',
		'Expected string to have a minimum length of `42`, got `21`'
	)});

	t.is(error4.validationErrors.size, 1, 'There should be one type of error reported');

	const reportedError41 = error4.validationErrors.get('string');

	t.is(reportedError41.size, 4, 'There should be four errors reported for the string predicate');

	t.deepEqual(reportedError41, new Set([
		'Expected argument to be of type `string` but received type `number`',
		'Expected string to be a URL, got `21`',
		'Expected string to have a minimum length of `21`, got `21`',
		'Expected string to have a minimum length of `42`, got `21`'
	]));
	// #endregion

	// #region Tests line 47,65
	class CustomPredicate {
		[testSymbol](_value, _main, _label) {
			throw new Error('Custom error.');
		}
	}

	t.notThrows(() => {
		ow(5, ow.any(new CustomPredicate()));
	}, 'It should not throw when the thrown error from the predicate is not an ArgumentError');
	// #endregion
});
