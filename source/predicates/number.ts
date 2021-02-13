import is from '@sindresorhus/is';
import {Predicate, PredicateOptions} from './predicate';

export class NumberPredicate extends Predicate<number> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions) {
		super('number', options);
	}

	/**
	Test a number to be in a specified range.

	@param start - Start of the range.
	@param end - End of the range.
	*/
	inRange(start: number, end: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be in range [${start}..${end}], got ${value}`,
			validator: value => is.inRange(value, [start, end])
		});
	}

	/**
	Test a number to be greater than the provided value.

	@param number - Minimum value.
	*/
	greaterThan(number: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be greater than ${number}, got ${value}`,
			validator: value => value > number
		});
	}

	/**
	Test a number to be greater than or equal to the provided value.

	@param number - Minimum value.
	*/
	greaterThanOrEqual(number: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be greater than or equal to ${number}, got ${value}`,
			validator: value => value >= number
		});
	}

	/**
	Test a number to be less than the provided value.

	@param number - Maximum value.
	*/
	lessThan(number: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be less than ${number}, got ${value}`,
			validator: value => value < number
		});
	}

	/**
	Test a number to be less than or equal to the provided value.

	@param number - Minimum value.
	*/
	lessThanOrEqual(number: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be less than or equal to ${number}, got ${value}`,
			validator: value => value <= number
		});
	}

	/**
	Test a number to be equal to a specified number.

	@param expected - Expected value to match.
	*/
	equal(expected: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be equal to ${expected}, got ${value}`,
			validator: value => value === expected
		});
	}

	/**
	Test if a number is an element of the provided list.

	@param list - List of possible values.
	*/
	oneOf(list: readonly number[]): this {
		return this.addValidator({
			message: (value, label) => {
				let printedList = JSON.stringify(list);

				if (list.length > 10) {
					const overflow = list.length - 10;
					printedList = JSON.stringify(list.slice(0, 10)).replace(/]$/, `,…+${overflow} more]`);
				}

				return `Expected ${label} to be one of \`${printedList}\`, got ${value}`;
			},
			validator: value => list.includes(value)
		});
	}

	/**
	Test a number to be an integer.
	*/
	get integer(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be an integer, got ${value}`,
			validator: value => is.integer(value)
		});
	}

	/**
	Test a number to be finite.
	*/
	get finite(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be finite, got ${value}`,
			validator: value => !is.infinite(value)
		});
	}

	/**
	Test a number to be infinite.
	*/
	get infinite(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be infinite, got ${value}`,
			validator: value => is.infinite(value)
		});
	}

	/**
	Test a number to be positive.
	*/
	get positive(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be positive, got ${value}`,
			validator: value => value > 0
		});
	}

	/**
	Test a number to be negative.
	*/
	get negative(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be negative, got ${value}`,
			validator: value => value < 0
		});
	}

	/**
	Test a number to be an integer or infinite.
	*/
	get integerOrInfinite(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be an integer or infinite, got ${value}`,
			validator: value => is.integer(value) || is.infinite(value)
		});
	}

	/**
	Test a number to be in a valid range for a 8-bit unsigned integer.
	*/
	get uint8(): this {
		return this.integer.inRange(0, 255);
	}

	/**
	Test a number to be in a valid range for a 16-bit unsigned integer.
	*/
	get uint16(): this {
		return this.integer.inRange(0, 65535);
	}

	/**
	Test a number to be in a valid range for a 32-bit unsigned integer.
	*/
	get uint32(): this {
		return this.integer.inRange(0, 4294967295);
	}

	/**
	Test a number to be in a valid range for a 8-bit signed integer.
	*/
	get int8(): this {
		return this.integer.inRange(-128, 127);
	}

	/**
	Test a number to be in a valid range for a 16-bit signed integer.
	*/
	get int16(): this {
		return this.integer.inRange(-32768, 32767);
	}

	/**
	Test a number to be in a valid range for a 32-bit signed integer.
	*/
	get int32(): this {
		return this.integer.inRange(-2147483648, 2147483647);
	}
}
