import isEqual from 'lodash.isequal';
import ow from '..';
import {Predicate, PredicateOptions} from './predicate';
import addValidator from '../utils/add-validator';

export class ArrayPredicate<T = any> extends Predicate<T[]> {
	/**
	 * @hidden
	 */
	constructor(options?: PredicateOptions) {
		super('array', options);
	}

	/**
	 * Test an array to have a specific length.
	 *
	 * @param length The length of the array.
	 */
	length(length: number) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value.length}\``,
			validator: value => value.length === length
		});
	}

	/**
	 * Test an array to have a minimum length.
	 *
	 * @param length The minimum length of the array.
	 */
	minLength(length: number) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value.length}\``,
			validator: value => value.length >= length
		});
	}

	/**
	 * Test an array to have a maximum length.
	 *
	 * @param length The maximum length of the array.
	 */
	maxLength(length: number) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value.length}\``,
			validator: value => value.length <= length
		});
	}

	/**
	 * Test an array to start with a specific value. The value is tested by identity, not structure.
	 *
	 * @param searchElement The value that should be the start of the array.
	 */
	startsWith(searchElement: T) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to start with \`${searchElement}\`, got \`${value[0]}\``,
			validator: value => value[0] === searchElement
		});
	}

	/**
	 * Test an array to end with a specific value. The value is tested by identity, not structure.
	 *
	 * @param searchElement The value that should be the end of the array.
	 */
	endsWith(searchElement: T) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to end with \`${searchElement}\`, got \`${value[value.length - 1]}\``,
			validator: value => value[value.length - 1] === searchElement
		});
	}

	/**
	 * Test an array to include all the provided elements. The values are tested by identity, not structure.
	 *
	 * @param searchElements The values that should be included in the array.
	 */
	includes(...searchElements: T[]) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to include all elements of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => searchElements.every(el => value.indexOf(el) !== -1)
		});
	}

	/**
	 * Test an array to include any of the provided elements. The values are tested by identity, not structure.
	 *
	 * @param searchElements The values that should be included in the array.
	 */
	includesAny(...searchElements: T[]) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to include any element of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => searchElements.some(el => value.indexOf(el) !== -1)
		});
	}

	/**
	 * Test an array to be empty.
	 */
	get empty() {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to be empty, got \`${JSON.stringify(value)}\``,
			validator: value => value.length === 0
		});
	}

	/**
	 * Test an array to be not empty.
	 */
	get nonEmpty() {
		return addValidator(this, {
			message: (_, label) => `Expected ${label} to not be empty`,
			validator: value => value.length > 0
		});
	}

	/**
	 * Test an array to be deeply equal to the provided array.
	 *
	 * @param expected Expected value to match.
	 */
	deepEqual(expected: T[]) {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(value)}\``,
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

		return addValidator(this, {
			message: (_, label) => `(${label}) ${error}`,
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
