import hasItems from '../utils/has-items.js';
import {Predicate, PredicateOptions} from './predicate.js';

export class WeakSetPredicate<T extends object = object> extends Predicate<WeakSet<T>> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions) {
		super('WeakSet', options);
	}

	/**
	Test a WeakSet to include all the provided items. The items are tested by identity, not structure.

	@param items - The items that should be a item in the WeakSet.
	*/
	has(...items: readonly T[]): this {
		return this.addValidator({
			message: (_, label, missingItems) => `Expected ${label} to have items \`${JSON.stringify(missingItems)}\``,
			validator: set => hasItems(set, items),
		});
	}

	/**
	Test a WeakSet to include any of the provided items. The items are tested by identity, not structure.

	@param items - The items that could be a item in the WeakSet.
	*/
	hasAny(...items: readonly T[]): this {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to have any item of \`${JSON.stringify(items)}\``,
			validator: set => items.some(item => set.has(item)),
		});
	}
}
