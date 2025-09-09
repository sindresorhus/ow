import is from '@sindresorhus/is';
import {Predicate, type PredicateOptions, type Validator} from './predicate.js';

export class StringPredicate extends Predicate<string> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions, validators?: Array<Validator<string>>) {
		super('string', options, validators);
	}

	/**
	Test a string to have a specific length.

	@param length - The length of the string.
	*/
	length(length: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value}\``,
			validator: value => value.length === length,
		});
	}

	/**
	Test a string to have a minimum length.

	@param length - The minimum length of the string.
	*/
	minLength(length: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value}\``,
			validator: value => value.length >= length,
			negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value}\``,
		});
	}

	/**
	Test a string to have a maximum length.

	@param length - The maximum length of the string.
	*/
	maxLength(length: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value}\``,
			validator: value => value.length <= length,
			negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value}\``,
		});
	}

	/**
	Test a string against a regular expression.

	@param regex - The regular expression to match the value with.
	*/
	matches(regex: RegExp): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to match \`${regex}\`, got \`${value}\``,
			validator: value => regex.test(value),
		});
	}

	/**
	Test a string to start with a specific value.

	@param searchString - The value that should be the start of the string.
	*/
	startsWith(searchString: string): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to start with \`${searchString}\`, got \`${value}\``,
			validator: value => value.startsWith(searchString),
		});
	}

	/**
	Test a string to end with a specific value.

	@param searchString - The value that should be the end of the string.
	*/
	endsWith(searchString: string): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to end with \`${searchString}\`, got \`${value}\``,
			validator: value => value.endsWith(searchString),
		});
	}

	/**
	Test a string to include a specific value.

	@param searchString - The value that should be included in the string.
	*/
	includes(searchString: string): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to include \`${searchString}\`, got \`${value}\``,
			validator: value => value.includes(searchString),
		});
	}

	/**
	Test if the string is an element of the provided list.

	@param list - List of possible values.
	*/
	oneOf(list: readonly string[]): this {
		return this.addValidator({
			message(value, label) {
				let printedList = JSON.stringify(list);

				if (list.length > 10) {
					const overflow = list.length - 10;
					printedList = JSON.stringify(list.slice(0, 10)).replace(/]$/, `,…+${overflow} more]`);
				}

				return `Expected ${label} to be one of \`${printedList}\`, got \`${value}\``;
			},
			validator: value => list.includes(value),
		});
	}

	/**
	Test a string to be empty.
	*/
	get empty(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be empty, got \`${value}\``,
			validator: value => value === '',
		});
	}

	/**
	Test a string to contain at least 1 non-whitespace character.
	*/
	get nonBlank(): this {
		return this.addValidator({
			message(value, label) {
				// Unicode's formal substitute characters can be barely legible and may not be easily recognized.
				// Hence this alternative substitution scheme.
				const madeVisible = value
					.replaceAll(' ', '·')
					.replaceAll('\f', '\\f')
					.replaceAll('\n', '\\n')
					.replaceAll('\r', '\\r')
					.replaceAll('\t', '\\t')
					.replaceAll('\v', '\\v');
				return `Expected ${label} to not be only whitespace, got \`${madeVisible}\``;
			},
			validator: value => value.trim() !== '',
		});
	}

	/**
	Test a string to be not empty.
	*/
	get nonEmpty(): this {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to not be empty`,
			validator: value => value !== '',
		});
	}

	/**
	Test a string to be equal to a specified string.

	@param expected - Expected value to match.
	*/
	equals(expected: string): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be equal to \`${expected}\`, got \`${value}\``,
			validator: value => value === expected,
		});
	}

	/**
	Test a string to be alphanumeric.
	*/
	get alphanumeric(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be alphanumeric, got \`${value}\``,
			validator: value => /^[a-z\d]+$/i.test(value),
		});
	}

	/**
	Test a string to be alphabetical.
	*/
	get alphabetical(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be alphabetical, got \`${value}\``,
			validator: value => /^[a-z]+$/gi.test(value),
		});
	}

	/**
	Test a string to be numeric.
	*/
	get numeric(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be numeric, got \`${value}\``,
			validator: value => /^[+-]?\d+$/i.test(value),
		});
	}

	/**
	Test a string to be a valid date.
	*/
	get date(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be a date, got \`${value}\``,
			validator: value => is.validDate(new Date(value)),
		});
	}

	/**
	Test a non-empty string to be lowercase. Matching both alphabetical & numbers.
	*/
	get lowercase(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be lowercase, got \`${value}\``,
			validator: value => value.trim() !== '' && value === value.toLowerCase(),
		});
	}

	/**
	Test a non-empty string to be uppercase. Matching both alphabetical & numbers.
	*/
	get uppercase(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be uppercase, got \`${value}\``,
			validator: value => value.trim() !== '' && value === value.toUpperCase(),
		});
	}

	/**
	Test a string to be a valid URL.
	*/
	get url(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be a URL, got \`${value}\``,
			validator: is.urlString,
		});
	}
}
