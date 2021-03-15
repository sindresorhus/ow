import isEqual from 'lodash.isequal';
import hasItems from '../utils/has-items.js';
import ofType from '../utils/of-type.js';
import {Predicate} from './predicate.js';

export class SetPredicate extends Predicate {
	/**
	@hidden
	*/
	constructor(options) {
		super('Set', options);
	}

	/**
	Test a Set to have a specific size.

	@param size - The size of the Set.
	*/
	size(size) {
		return this.addValidator({
			message: (set, label) => `Expected ${label} to have size \`${size}\`, got \`${set.size}\``,
			validator: set => set.size === size
		});
	}

	/**
	Test a Set to have a minimum size.

	@param size - The minimum size of the Set.
	*/
	minSize(size) {
		return this.addValidator({
			message: (set, label) => `Expected ${label} to have a minimum size of \`${size}\`, got \`${set.size}\``,
			validator: set => set.size >= size,
			negatedMessage: (set, label) => `Expected ${label} to have a maximum size of \`${size - 1}\`, got \`${set.size}\``
		});
	}

	/**
	Test a Set to have a maximum size.

	@param size - The maximum size of the Set.
	*/
	maxSize(size) {
		return this.addValidator({
			message: (set, label) => `Expected ${label} to have a maximum size of \`${size}\`, got \`${set.size}\``,
			validator: set => set.size <= size,
			negatedMessage: (set, label) => `Expected ${label} to have a minimum size of \`${size + 1}\`, got \`${set.size}\``
		});
	}

	/**
	Test a Set to include all the provided items. The items are tested by identity, not structure.

	@param items - The items that should be a item in the Set.
	*/
	has(...items) {
		return this.addValidator({
			message: (_, label, missingItems) => `Expected ${label} to have items \`${JSON.stringify(missingItems)}\``,
			validator: set => hasItems(set, items)
		});
	}

	/**
	Test a Set to include any of the provided items. The items are tested by identity, not structure.

	@param items - The items that could be a item in the Set.
	*/
	hasAny(...items) {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to have any item of \`${JSON.stringify(items)}\``,
			validator: set => items.some(item => set.has(item))
		});
	}

	/**
	Test all the items in the Set to match the provided predicate.

	@param predicate - The predicate that should be applied against every item in the Set.
	*/
	ofType(predicate) {
		return this.addValidator({
			message: (_, label, error) => `(${label}) ${error}`,
			validator: set => ofType(set, predicate)
		});
	}

	/**
	Test a Set to be empty.
	*/
	get empty() {
		return this.addValidator({
			message: (set, label) => `Expected ${label} to be empty, got \`${JSON.stringify([...set])}\``,
			validator: set => set.size === 0
		});
	}

	/**
	Test a Set to be not empty.
	*/
	get nonEmpty() {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to not be empty`,
			validator: set => set.size > 0
		});
	}

	/**
	Test a Set to be deeply equal to the provided Set.

	@param expected - Expected Set to match.
	*/
	deepEqual(expected) {
		return this.addValidator({
			message: (set, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify([...expected])}\`, got \`${JSON.stringify([...set])}\``,
			validator: set => isEqual(set, expected)
		});
	}
}
