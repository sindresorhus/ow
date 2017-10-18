import * as is from '@sindresorhus/is';
import { Predicate, Context } from './predicate';

export class NumberPredicate extends Predicate<number> {

	constructor(context?: Context) {
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
			message: value => `Expected ${value} to be in range [${start}..${end}]`,
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
			message: value => `Expected ${value} to be greater than ${x}`,
			validator: value => value > x
		});
	}

	/**
	 * Test a number to be less than the provided value.
	 *
	 * @param x Maximum value.
	 */
	lessThan(x: number) {
		return this.addValidator({
			message: value => `Expected ${value} to be less than ${x}`,
			validator: value => value < x
		});
	}

	/**
	 * Test a number to be equal to a specified number.
	 *
	 * @param expected Expected value to match.
	 */
	equal(expected: number) {
		return this.addValidator({
			message: value => `Expected ${value} to be equal to ${expected}`,
			validator: value => value === expected
		});
	}

	/**
	 * Test a number to be an integer.
	 */
	get integer() {
		return this.addValidator({
			message: value => `Expected ${value} to be an integer`,
			validator: value => is.integer(value)
		});
	}

	/**
	 * Test a number to be finite.
	 */
	get finite() {
		return this.addValidator({
			message: value => `Expected ${value} to be finite`,
			validator: value => !is.infinite(value)
		});
	}

	/**
	 * Test a number to be infinite.
	 */
	get infinite() {
		return this.addValidator({
			message: value => `Expected ${value} to be infinite`,
			validator: value => is.infinite(value)
		});
	}

	/**
	 * Test a number to be positive.
	 */
	get positive() {
		return this.addValidator({
			message: value => `Expected ${value} to be positive`,
			validator: value => value > 0
		});
	}

	/**
	 * Test a number to be negative.
	 */
	get negative() {
		return this.addValidator({
			message: value => `Expected ${value} to be negative`,
			validator: value => value < 0
		});
	}
}
