import * as valiDate from 'vali-date';
import { Predicate, Context } from './predicate';

export class StringPredicate extends Predicate<string> {

	constructor(context?: Context) {
		super('string', context);
	}

	/**
	 * Test a string to have a specific minimum length.
	 *
	 * @param length The length of the string.
	 */
	length(length: number) {
		return this.addValidator({
			message: value => `Expected string length to be ${length}, got ${value.length}`,
			validator: value => value.length === length
		});
	}

	/**
	 * Test a string to have a minimum length.
	 *
	 * @param length The minimum length of the string.
	 */
	minLength(length: number) {
		return this.addValidator({
			message: value => `Expected string to have a minimum length of ${length}, got ${value.length}`,
			validator: value => value.length >= length
		});
	}

	/**
	 * Test a string to have a maximum length.
	 *
	 * @param length The maximum length of the string.
	 */
	maxLength(length: number) {
		return this.addValidator({
			message: value => `Expected string to have a maximum length of ${length}, got ${value.length}`,
			validator: value => value.length <= length
		});
	}

	match() {
		// TODO
	}

	/**
	 * Test a string to start with a specific value.
	 *
	 * @param searchString The value that should be the start of the string.
	 */
	startsWith(searchString: string) {
		return this.addValidator({
			message: value => `Expected ${value} to start with ${searchString}`,
			validator: value => value.startsWith(value)
		});
	}

	/**
	 * Test a string to end with a specific value.
	 *
	 * @param searchString The value that should be the end of the string.
	 */
	endsWith(searchString: string) {
		return this.addValidator({
			message: value => `Expected ${value} to end with ${searchString}`,
			validator: value => value.endsWith(value)
		});
	}

	/**
	 * Test a string to include a specific value.
	 *
	 * @param searchString The value that should be included in the string.
	 */
	includes(searchString: string) {
		return this.addValidator({
			message: value => `Expected ${value} to include ${searchString}`,
			validator: value => value.includes(searchString)
		});
	}

	/**
	 * Test a string to be empty.
	 */
	get empty() {
		return this.addValidator({
			message: value => `Expected \`${value}\` to be empty`,
			validator: value => value === ''
		});
	}

	/**
	 * Test a string to be not empty.
	 */
	get nonEmpty() {
		return this.addValidator({
			message: () => 'Expected value to be not empty',
			validator: value => value !== ''
		});
	}

	/**
	 * Test a string to be equal to a specified string.
	 *
	 * @param expected Expected value to match.
	 */
	equals(expected: string) {
		return this.addValidator({
			message: value => `Expected ${value} to equal to ${expected}`,
			validator: value => value === expected
		});
	}

	/**
	 * Test a string to be alphanumeric.
	 */
	get alphanumeric() {
		return this.addValidator({
			message: value => `Expected string to contain only alphanumeric characters but received \`${value}\``,
			validator: value => /^[a-z\d]+$/i.test(value)
		});
	}

	/**
	 * Test a string to be alphanumeric.
	 */
	get numeric() {
		return this.addValidator({
			message: value => `Expected string to contain only numeric characters but received \`${value}\``,
			validator: value => /^[\d]+$/i.test(value)
		});
	}

	/**
	 * Test a string to be a valid date.
	 */
	get date() {
		return this.addValidator({
			message: value => `Expected \`${value}\` to be a valid date`,
			validator: value => valiDate(value)
		});
	}
}
