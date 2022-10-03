import isEqual from 'lodash.isequal';
import {exact} from '../utils/match-shape.js';
import ofType from '../utils/of-type.js';
import type {BasePredicate} from './base-predicate.js';
import {Predicate, type PredicateOptions} from './predicate.js';
import type {Shape} from './object.js';

export class ArrayPredicate<T = unknown> extends Predicate<T[]> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions) {
		super('array', options);
	}

	/**
	Test an array to have a specific length.

	@param length - The length of the array.
	*/
	length(length: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value.length}\``,
			validator: value => value.length === length,
		});
	}

	/**
	Test an array to have a minimum length.

	@param length - The minimum length of the array.
	*/
	minLength(length: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value.length}\``,
			validator: value => value.length >= length,
			negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value.length}\``,
		});
	}

	/**
	Test an array to have a maximum length.

	@param length - The maximum length of the array.
	*/
	maxLength(length: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value.length}\``,
			validator: value => value.length <= length,
			negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value.length}\``,
		});
	}

	/**
	Test an array to start with a specific value. The value is tested by identity, not structure.

	@param searchElement - The value that should be the start of the array.
	*/
	startsWith(searchElement: T): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to start with \`${searchElement}\`, got \`${value[0]}\``,
			validator: value => value[0] === searchElement,
		});
	}

	/**
	Test an array to end with a specific value. The value is tested by identity, not structure.

	@param searchElement - The value that should be the end of the array.
	*/
	endsWith(searchElement: T): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to end with \`${searchElement}\`, got \`${value[value.length - 1]}\``,
			validator: value => value[value.length - 1] === searchElement,
		});
	}

	/**
	Test an array to include all the provided elements. The values are tested by identity, not structure.

	@param searchElements - The values that should be included in the array.
	*/
	includes(...searchElements: readonly T[]): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to include all elements of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => searchElements.every(element => value.includes(element)),
		});
	}

	/**
	Test an array to include any of the provided elements. The values are tested by identity, not structure.

	@param searchElements - The values that should be included in the array.
	*/
	includesAny(...searchElements: readonly T[]): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to include any element of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => searchElements.some(element => value.includes(element)),
		});
	}

	/**
	Test an array to be empty.
	*/
	get empty(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be empty, got \`${JSON.stringify(value)}\``,
			validator: value => value.length === 0,
		});
	}

	/**
	Test an array to be not empty.
	*/
	get nonEmpty(): this {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to not be empty`,
			validator: value => value.length > 0,
		});
	}

	/**
	Test an array to be deeply equal to the provided array.

	@param expected - Expected value to match.
	*/
	deepEqual(expected: readonly T[]): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(value)}\``,
			validator: value => isEqual(value, expected),
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
	ofType<U extends T>(predicate: BasePredicate<U>): ArrayPredicate<U> {
		// TODO [typescript@>=5] If higher-kinded types are supported natively by typescript, refactor `addValidator` to use them to avoid the usage of `any`. Otherwise, bump or remove this TODO.
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.addValidator({
			message: (_, label, error) => `(${label}) ${error}`,
			validator: value => ofType(value, 'values', predicate),
		}) as ArrayPredicate<any>;
	}

	/**
	Test if the elements in the array exactly matches the elements placed at the same indices in the predicates array.

	@param predicates - Predicates to test the array against. Describes what the tested array should look like.

	@example
	```
	ow(['1', 2], ow.array.exactShape([ow.string, ow.number]));
	```
	*/
	exactShape(predicates: Predicate[]): this {
		const shape = predicates as unknown as Shape;

		return this.addValidator({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			message: (_, label, message) => `${message.replace('Expected', 'Expected element')} in ${label}`,
			validator: object => exact(object, shape, undefined, true),
		});
	}
}
