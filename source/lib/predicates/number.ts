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
	 * Test a number to be greater than or equal to the minimum value.
	 *
	 * @param min Minimum value.
	 */
	min(min: number) {
		return this.addValidator({
			message: value => `Expected ${value} to be greater than or equal to ${min}`,
			validator: value => value >= min
		});
	}

	/**
	 * Test a number to be less than or equal to the maximum value.
	 *
	 * @param max Maximum value.
	 */
	max(max: number) {
		return this.addValidator({
			message: value => `Expected ${value} to be less than or equal to ${max}`,
			validator: value => value <= max
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
