import {Predicate, Context} from './predicate';
import hasItems from '../utils/has-items';

export class WeakSetPredicate extends Predicate<WeakSet<any>> {
	constructor(context?: Context) {
		super('weakSet', context);
	}

	/**
	 * Test a WeakSet to include all the provided items. The items are tested by identity, not structure.
	 *
	 * @param items The items that should be a item in the WeakSet.
	 */
	has(...items: any[]) {
		return this.addValidator({
			message: (_, missingItems) => `Expected WeakSet to have items \`${JSON.stringify(missingItems)}\``,
			validator: set => hasItems(set, items)
		});
	}

	/**
	 * Test a WeakSet to include any of the provided items. The items are tested by identity, not structure.
	 *
	 * @param items The items that could be a item in the WeakSet.
	 */
	hasAny(...items: any[]) {
		return this.addValidator({
			message: () => `Expected WeakSet to have any item of \`${JSON.stringify(items)}\``,
			validator: set => items.some(item => set.has(item))
		});
	}
}
