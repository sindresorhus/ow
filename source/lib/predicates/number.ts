import is from '@sindresorhus/is';
import {Predicate, Context} from './predicate';

export class NumberPredicate extends Predicate<number> {
	/**
	 * @hidden
	 */
	constructor(context?: Context<number>) {
		super('number', context);
	}

	/**
	 * Test a number to be in a specified range.
	 *
	 * @param start Start of the range.
	 * @param end End of the range.
	 */
	inRange(start: number, end: number) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be in range [${start}..${end}], got ${value}`,
			validator: value => is.inRange(value, [start, end])
		});
	}

	/**
	 * Test a number to be greater than the provided value.
	 *
	 * @param x Minimum value.
	 */
	greaterThan(x: number) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be greater than ${x}, got ${value}`,
			validator: value => value > x
		});
	}

	/**
	 * Test a number to be greater than or equal to the provided value.
	 *
	 * @param x Minimum value.
	 */
	greaterThanOrEqual(x: number) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be greater than or equal to ${x}, got ${value}`,
			validator: value => value >= x
		});
	}

	/**
	 * Test a number to be less than the provided value.
	 *
	 * @param x Maximum value.
	 */
	lessThan(x: number) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be less than ${x}, got ${value}`,
			validator: value => value < x
		});
	}

	/**
	 * Test a number to be less than or equal to the provided value.
	 *
	 * @param x Minimum value.
	 */
	lessThanOrEqual(x: number) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be less than or equal to ${x}, got ${value}`,
			validator: value => value <= x
		});
	}

	/**
	 * Test a number to be equal to a specified number.
	 *
	 * @param expected Expected value to match.
	 */
	equal(expected: number) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be equal to ${expected}, got ${value}`,
			validator: value => value === expected
		});
	}

	/**
	 * Test a number to be an integer.
	 */
	get integer() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be an integer, got ${value}`,
			validator: value => is.integer(value)
		});
	}

	/**
	 * Test a number to be finite.
	 */
	get finite() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be finite, got ${value}`,
			validator: value => !is.infinite(value)
		});
	}

	/**
	 * Test a number to be infinite.
	 */
	get infinite() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be infinite, got ${value}`,
			validator: value => is.infinite(value)
		});
	}

	/**
	 * Test a number to be positive.
	 */
	get positive() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be positive, got ${value}`,
			validator: value => value > 0
		});
	}

	/**
	 * Test a number to be negative.
	 */
	get negative() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be negative, got ${value}`,
			validator: value => value < 0
		});
	}

	get integerOrInfinity() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be integer or infinity, got ${value}`,
			validator: value => value > 0 && (is.integer(value) || value === Infinity)
		});
	}
}
