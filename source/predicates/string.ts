import is from '@sindresorhus/is';
import valiDate from 'vali-date';
import {Predicate, PredicateOptions} from './predicate';
import addValidator from '../utils/add-validator';

export class StringPredicate extends Predicate<string> {
	/**
	 * @hidden
	 */
	constructor(options?: PredicateOptions) {
		super('string', options);
	}

	/**
	 * Test a string to have a specific length.
	 *
	 * @param length The length of the string.
	 */
	length(length: number) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value}\``,
			validator: value => value.length === length
		});
	}

	/**
	 * Test a string to have a minimum length.
	 *
	 * @param length The minimum length of the string.
	 */
	minLength(length: number) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value}\``,
			validator: value => value.length >= length
		});
	}

	/**
	 * Test a string to have a maximum length.
	 *
	 * @param length The maximum length of the string.
	 */
	maxLength(length: number) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value}\``,
			validator: value => value.length <= length
		});
	}

	/**
	 * Test a string against a regular expression.
	 *
	 * @param regeExp The regular expression to match the value with.
	 */
	matches(regExp: RegExp) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to match \`${regExp}\`, got \`${value}\``,
			validator: value => regExp.test(value)
		});
	}

	/**
	 * Test a string to start with a specific value.
	 *
	 * @param searchString The value that should be the start of the string.
	 */
	startsWith(searchString: string) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to start with \`${searchString}\`, got \`${value}\``,
			validator: value => value.startsWith(searchString)
		});
	}

	/**
	 * Test a string to end with a specific value.
	 *
	 * @param searchString The value that should be the end of the string.
	 */
	endsWith(searchString: string) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to end with \`${searchString}\`, got \`${value}\``,
			validator: value => value.endsWith(searchString)
		});
	}

	/**
	 * Test a string to include a specific value.
	 *
	 * @param searchString The value that should be included in the string.
	 */
	includes(searchString: string) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to include \`${searchString}\`, got \`${value}\``,
			validator: value => value.includes(searchString)
		});
	}

	/**
	 * Test if the string is an element of the provided list.
	 *
	 * @param list List of possible values.
	 */
	oneOf(list: string[]) {
		return addValidator(this, {
			message: (value, label) => {
				let printedList = JSON.stringify(list);

				if (list.length > 10) {
					const overflow = list.length - 10;
					printedList = JSON.stringify(list.slice(0, 10)).replace(/]$/, `,…+${overflow} more]`);
				}

				return `Expected ${label} to be one of \`${printedList}\`, got \`${value}\``;
			},
			validator: value => list.includes(value)
		});
	}

	/**
	 * Test a string to be empty.
	 */
	get empty() {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to be empty, got \`${value}\``,
			validator: value => value === ''
		});
	}

	/**
	 * Test a string to be not empty.
	 */
	get nonEmpty() {
		return addValidator(this, {
			message: (_, label) => `Expected ${label} to not be empty`,
			validator: value => value !== ''
		});
	}

	/**
	 * Test a string to be equal to a specified string.
	 *
	 * @param expected Expected value to match.
	 */
	equals(expected: string) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to be equal to \`${expected}\`, got \`${value}\``,
			validator: value => value === expected
		});
	}

	/**
	 * Test a string to be alphanumeric.
	 */
	get alphanumeric() {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to be alphanumeric, got \`${value}\``,
			validator: value => /^[a-z\d]+$/i.test(value)
		});
	}

	/**
	 * Test a string to be alphabetical.
	 */
	get alphabetical() {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to be alphabetical, got \`${value}\``,
			validator: value => /^[a-z]+$/ig.test(value)
		});
	}

	/**
	 * Test a string to be numeric.
	 */
	get numeric() {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to be numeric, got \`${value}\``,
			validator: value => /^(\+|-)?\d+$/i.test(value)
		});
	}

	/**
	 * Test a string to be a valid date.
	 */
	get date() {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to be a date, got \`${value}\``,
			validator: valiDate
		});
	}

	/**
	 * Test a non-empty string to be lowercase. Matching both alphabetical & numbers.
	 */
	get lowercase() {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to be lowercase, got \`${value}\``,
			validator: value => value.trim() !== '' && value === value.toLowerCase()
		});
	}

	/**
	 * Test a non-empty string to be uppercase. Matching both alphabetical & numbers.
	 */
	get uppercase() {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to be uppercase, got \`${value}\``,
			validator: value => value.trim() !== '' && value === value.toUpperCase()
		});
	}

	/**
	 * Test a string to be a valid URL.
	 */
	get url() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be a URL, got \`${value}\``,
			validator: is.urlString
		});
	}
}
