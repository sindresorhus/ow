import * as deepStrictEqual from 'deep-strict-equal';
import {Predicate, Context} from './predicate';

export class ArrayPredicate extends Predicate<any[]> {
	constructor(context?: Context) {
		super('array', context);
	}

	/**
	 * Test an array to have a specific length.
	 *
	 * @param length The length of the array.
	 */
	length(length: number) {
		return this.addValidator({
			message: value => `Expected array to have length \`${length}\`, got \`${value.length}\``,
			validator: value => value.length === length
		});
	}

	/**
	 * Test an array to have a minimum length.
	 *
	 * @param length The minimum length of the array.
	 */
	minLength(length: number) {
		return this.addValidator({
			message: value => `Expected array to have a minimum length of \`${length}\`, got \`${value.length}\``,
			validator: value => value.length >= length
		});
	}

	/**
	 * Test an array to have a maximum length.
	 *
	 * @param length The maximum length of the array.
	 */
	maxLength(length: number) {
		return this.addValidator({
			message: value => `Expected array to have a maximum length of \`${length}\`, got \`${value.length}\``,
			validator: value => value.length <= length
		});
	}

	/**
	 * Test an array to include all the provided elements.
	 *
	 * @param searchElements The values that should be included in the array.
	 */
	includes(...searchElements: any[]) {
		return this.addValidator({
			message: value => `Expected array to include all elements of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => searchElements.every(el => value.indexOf(el) !== -1)
		});
	}

	/**
	 * Test an array to include any of the provided elements.
	 *
	 * @param searchElements The values that should be included in the array.
	 */
	includesAny(...searchElements: any[]) {
		return this.addValidator({
			message: value => `Expected array to include any element of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => searchElements.some(el => value.indexOf(el) !== -1)
		});
	}

	/**
	 * Test an array to be empty.
	 */
	get empty() {
		return this.addValidator({
			message: value => `Expected array to be empty, got \`${JSON.stringify(value)}\``,
			validator: value => value.length === 0
		});
	}

	/**
	 * Test an array to be not empty.
	 */
	get nonEmpty() {
		return this.addValidator({
			message: () => 'Expected array to not be empty',
			validator: value => value.length > 0
		});
	}

	/**
	 * Test an array to be deeply equal to the provided array.
	 *
	 * @param expected Expected value to match.
	 */
	deepEqual(expected: any[]) {
		return this.addValidator({
			message: value => `Expected array to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => deepStrictEqual(value, expected)
		});
	}
}
