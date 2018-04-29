import isEqual = require('lodash.isequal'); // tslint:disable-line:no-require-imports
import ow from '../..';
import {Predicate, Context} from './predicate';

export class ArrayPredicate<T = any> extends Predicate<T[]> {
	/**
	 * @hidden
	 */
	constructor(context?: Context<T[]>) {
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
	 * Test an array to start with a specific value. The value is tested by identity, not structure.
	 *
	 * @param searchElement The value that should be the start of the array.
	 */
	startsWith(searchElement: T) {
		return this.addValidator({
			message: value => `Expected array to start with \`${searchElement}\`, got \`${value[0]}\``,
			validator: value => value[0] === searchElement
		});
	}

	/**
	 * Test an array to end with a specific value. The value is tested by identity, not structure.
	 *
	 * @param searchElement The value that should be the end of the array.
	 */
	endsWith(searchElement: T) {
		return this.addValidator({
			message: value => `Expected array to end with \`${searchElement}\`, got \`${value[value.length - 1]}\``,
			validator: value => value[value.length - 1] === searchElement
		});
	}

	/**
	 * Test an array to include all the provided elements. The values are tested by identity, not structure.
	 *
	 * @param searchElements The values that should be included in the array.
	 */
	includes(...searchElements: T[]) {
		return this.addValidator({
			message: value => `Expected array to include all elements of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => searchElements.every(el => value.indexOf(el) !== -1)
		});
	}

	/**
	 * Test an array to include any of the provided elements. The values are tested by identity, not structure.
	 *
	 * @param searchElements The values that should be included in the array.
	 */
	includesAny(...searchElements: T[]) {
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
	deepEqual(expected: T[]) {
		return this.addValidator({
			message: value => `Expected array to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => isEqual(value, expected)
		});
	}

	/**
	 * Test all elements in the array to match to provided predicate.
	 *
	 * @param predicate The predicate that should be applied against every individual item.
	 */
	ofType(predicate: Predicate<T>) {
		let error: string;

		return this.addValidator({
			message: () => error,
			validator: value => {
				try {
					for (const item of value) {
						ow(item, predicate);
					}

					return true;
				} catch (err) {
					error = err.message;

					return false;
				}
			}
		});
	}
}
