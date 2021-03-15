import isEqual from 'lodash.isequal';
import {Predicate} from './predicate.js';
import ow from '../index.js';
import {exact} from '../utils/match-shape.js';

export class ArrayPredicate extends Predicate {
	/**
	@hidden
	*/
	constructor(options) {
		super('array', options);
	}

	/**
	Test an array to have a specific length.

	@param length - The length of the array.
	*/
	length(length) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value.length}\``,
			validator: value => value.length === length
		});
	}

	/**
	Test an array to have a minimum length.

	@param length - The minimum length of the array.
	*/
	minLength(length) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value.length}\``,
			validator: value => value.length >= length,
			negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value.length}\``
		});
	}

	/**
	Test an array to have a maximum length.

	@param length - The maximum length of the array.
	*/
	maxLength(length) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value.length}\``,
			validator: value => value.length <= length,
			negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value.length}\``
		});
	}

	/**
	Test an array to start with a specific value. The value is tested by identity, not structure.

	@param searchElement - The value that should be the start of the array.
	*/
	startsWith(searchElement) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to start with \`${searchElement}\`, got \`${value[0]}\``,
			validator: value => value[0] === searchElement
		});
	}

	/**
	Test an array to end with a specific value. The value is tested by identity, not structure.

	@param searchElement - The value that should be the end of the array.
	*/
	endsWith(searchElement) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to end with \`${searchElement}\`, got \`${value[value.length - 1]}\``,
			validator: value => value[value.length - 1] === searchElement
		});
	}

	/**
	Test an array to include all the provided elements. The values are tested by identity, not structure.

	@param searchElements - The values that should be included in the array.
	*/
	includes(...searchElements) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to include all elements of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => searchElements.every(element => value.includes(element))
		});
	}

	/**
	Test an array to include any of the provided elements. The values are tested by identity, not structure.

	@param searchElements - The values that should be included in the array.
	*/
	includesAny(...searchElements) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to include any element of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => searchElements.some(element => value.includes(element))
		});
	}

	/**
	Test an array to be empty.
	*/
	get empty() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be empty, got \`${JSON.stringify(value)}\``,
			validator: value => value.length === 0
		});
	}

	/**
	Test an array to be not empty.
	*/
	get nonEmpty() {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to not be empty`,
			validator: value => value.length > 0
		});
	}

	/**
	Test an array to be deeply equal to the provided array.

	@param expected - Expected value to match.
	*/
	deepEqual(expected) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => isEqual(value, expected)
		});
	}

	/**
	Test all elements in the array to match to provided predicate.

	@param predicate - The predicate that should be applied against every individual item.

	@example
	```
	ow(['a', 1], ow.array.ofType(ow.any(ow.string, ow.number)));
	```
	*/
	ofType(predicate) {
		let error;

		return this.addValidator({
			message: (_, label) => `(${label}) ${error}`,
			validator: value => {
				try {
					for (const item of value) {
						ow(item, predicate);
					}

					return true;
				} catch (error_) {
					error = error_.message;
					return false;
				}
			}
		});
	}

	/**
	Test if the elements in the array exactly matches the elements placed at the same indices in the predicates array.

	@param predicates - Predicates to test the array against. Describes what the tested array should look like.

	@example
	```
	ow(['1', 2], ow.array.exactShape([ow.string, ow.number]));
	```
	*/
	exactShape(predicates) {
		const shape = predicates;
		return this.addValidator({
			message: (_, label, message) => `${message.replace('Expected', 'Expected element')} in ${label}`,
			validator: object => exact(object, shape, undefined, true)
		});
	}
}
