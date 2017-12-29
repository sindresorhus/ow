import {Predicate, Context} from './predicate';

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
		const missingItems: any[] = [];

		return this.addValidator({
			message: () => `Expected WeakSet to have items \`${JSON.stringify(missingItems)}\``,
			validator: set => {
				for (const key of items) {
					if (set.has(key)) {
						continue;
					}

					missingItems.push(key);

					if (missingItems.length === 5) {
						return false;
					}
				}

				return missingItems.length === 0;
			}
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
