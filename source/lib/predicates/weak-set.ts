import {Predicate, Context} from './predicate';
import hasItems from '../utils/has-items';

export class WeakSetPredicate<T extends object = any> extends Predicate<WeakSet<T>> {
	/**
	 * @hidden
	 */
	constructor(context?: Context<WeakSet<T>>) {
		super('WeakSet', context);
	}

	/**
	 * Test a WeakSet to include all the provided items. The items are tested by identity, not structure.
	 *
	 * @param items The items that should be a item in the WeakSet.
	 */
	has(...items: T[]) {
		return this.addValidator({
			message: (_, label, missingItems) => `Expected ${label} to have items \`${JSON.stringify(missingItems)}\``,
			validator: set => hasItems(set, items)
		});
	}

	/**
	 * Test a WeakSet to include any of the provided items. The items are tested by identity, not structure.
	 *
	 * @param items The items that could be a item in the WeakSet.
	 */
	hasAny(...items: T[]) {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to have any item of \`${JSON.stringify(items)}\``,
			validator: set => items.some(item => set.has(item))
		});
	}
}
