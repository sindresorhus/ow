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
	oneOf<S extends readonly string[]>(list: S): Predicate<S[number]> {
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
		}) as unknown as Predicate<S[number]>;
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
					.replaceAll('\f', String.raw`\f`)
					.replaceAll('\n', String.raw`\n`)
					.replaceAll('\r', String.raw`\r`)
					.replaceAll('\t', String.raw`\t`)
					.replaceAll('\v', String.raw`\v`);
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
	equals<S extends string>(expected: S): Predicate<S> {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be equal to \`${expected}\`, got \`${value}\``,
			validator: value => value === expected,
		}) as unknown as Predicate<S>;
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

	/**
	Test a string to be a valid email address.

	The validation is based on a practical subset of RFC 5322 that works for real-world email addresses.
	This implementation balances strictness with usability and performance.

	@example
	```
	import ow from 'ow';

	ow('foo@example.com', ow.string.email);
	//=> passes

	ow('invalid.email', ow.string.email);
	//=> ArgumentError: Expected string to be an email address, got `invalid.email`
	```
	*/
	get email(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be an email address, got \`${value}\``,
			validator(value) {
				// Maximum length check (RFC 5321)
				if (value.length > 320) {
					return false;
				}

				// Split into local and domain parts
				const atIndex = value.lastIndexOf('@');
				if (atIndex === -1) {
					return false;
				}

				const localPart = value.slice(0, atIndex);
				const domainPart = value.slice(atIndex + 1);

				// Check local part length (max 64 characters per RFC)
				if (localPart.length === 0 || localPart.length > 64) {
					return false;
				}

				// Check domain part length (max 255 characters)
				if (domainPart.length === 0 || domainPart.length > 255) {
					return false;
				}

				// Validate local part
				// This regex allows:
				// - Alphanumeric characters and common symbols
				// - Dots not at the beginning or end, and not consecutive
				// - Quoted strings (basic support for printable ASCII)
				const localPartRegex = /^(?:[\w!#$%&*+/=?^`{|}~-]+(?:\.[\w!#$%&*+/=?^`{|}~-]+)*|"[ !\u0023-\u005B\u005D-\u007E]+")$/;

				if (!localPartRegex.test(localPart)) {
					return false;
				}

				// Validate domain part
				// Check for IPv4 literal
				const ipv4Regex = /^\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})]$/;
				if (ipv4Regex.test(domainPart)) {
					return true;
				}

				// Check for IPv6 literal (simplified)
				const ipv6Regex = /^\[ipv6:[\da-f:.]+]$/i;
				if (ipv6Regex.test(domainPart)) {
					// Basic IPv6 format check
					return true;
				}

				// Validate domain name
				// - Must contain at least one dot
				// - Each label must be 1-63 characters
				// - Labels can contain alphanumeric and hyphens
				// - Labels cannot start or end with hyphens
				// - TLD must be at least 2 characters
				const domainRegex = /^(?:[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?\.)+[a-z]{2,}$/i;

				return domainRegex.test(domainPart);
			},
		});
	}
}
