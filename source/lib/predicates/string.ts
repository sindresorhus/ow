import valiDate from 'vali-date';
import {Predicate, Context} from './predicate';

export class StringPredicate extends Predicate<string> {
	/**
	 * @hidden
	 */
	constructor(context?: Context<string>) {
		super('string', context);
	}

	/**
	 * Test a string to have a specific length.
	 *
	 * @param length The length of the string.
	 */
	length(length: number) {
		return this.addValidator({
			message: value => `Expected string to have length \`${length}\`, got \`${value}\``,
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
			message: value => `Expected string to have a minimum length of \`${length}\`, got \`${value}\``,
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
			message: value => `Expected string to have a maximum length of \`${length}\`, got \`${value}\``,
			validator: value => value.length <= length
		});
	}

	/**
	 * Test a string against a regular expression.
	 *
	 * @param regeExp The regular expression to match the value with.
	 */
	matches(regExp: RegExp) {
		return this.addValidator({
			message: value => `Expected string to match \`${regExp}\`, got \`${value}\``,
			validator: value => regExp.test(value)
		});
	}

	/**
	 * Test a string to start with a specific value.
	 *
	 * @param searchString The value that should be the start of the string.
	 */
	startsWith(searchString: string) {
		return this.addValidator({
			message: value => `Expected string to start with \`${searchString}\`, got \`${value}\``,
			validator: value => value.startsWith(searchString)
		});
	}

	/**
	 * Test a string to end with a specific value.
	 *
	 * @param searchString The value that should be the end of the string.
	 */
	endsWith(searchString: string) {
		return this.addValidator({
			message: value => `Expected string to end with \`${searchString}\`, got \`${value}\``,
			validator: value => value.endsWith(searchString)
		});
	}

	/**
	 * Test a string to include a specific value.
	 *
	 * @param searchString The value that should be included in the string.
	 */
	includes(searchString: string) {
		return this.addValidator({
			message: value => `Expected string to include \`${searchString}\`, got \`${value}\``,
			validator: value => value.includes(searchString)
		});
	}

	/**
	 * Test a string to be empty.
	 */
	get empty() {
		return this.addValidator({
			message: value => `Expected string to be empty, got \`${value}\``,
			validator: value => value === ''
		});
	}

	/**
	 * Test a string to be not empty.
	 */
	get nonEmpty() {
		return this.addValidator({
			message: () => 'Expected string to not be empty',
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
			message: value => `Expected string to be equal to \`${expected}\`, got \`${value}\``,
			validator: value => value === expected
		});
	}

	/**
	 * Test a string to be alphanumeric.
	 */
	get alphanumeric() {
		return this.addValidator({
			message: value => `Expected string to be alphanumeric, got \`${value}\``,
			validator: value => /^[a-z\d]+$/i.test(value)
		});
	}

	/**
	 * Test a string to be numeric.
	 */
	get numeric() {
		return this.addValidator({
			message: value => `Expected string to be numeric, got \`${value}\``,
			validator: value => /^\d+$/i.test(value)
		});
	}

	/**
	 * Test a string to be a valid date.
	 */
	get date() {
		return this.addValidator({
			message: value => `Expected string to be a date, got \`${value}\``,
			validator: value => valiDate(value)
		});
	}
}
