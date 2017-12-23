import * as isEqual from 'lodash.isequal';
import ow from '../..';
import {Predicate, Context} from './predicate';

export class SetPredicate extends Predicate<Set<any>> {
	constructor(context?: Context) {
		super('set', context);
	}

	/**
	 * Test a Set to have a specific size.
	 *
	 * @param size The size of the Set.
	 */
	size(size: number) {
		return this.addValidator({
			message: set => `Expected Set to have size \`${size}\`, got \`${set.size}\``,
			validator: set => set.size === size
		});
	}

	/**
	 * Test an Size to have a minimum size.
	 *
	 * @param size The minimum size of the Set.
	 */
	minSize(size: number) {
		return this.addValidator({
			message: set => `Expected Set to have a minimum size of \`${size}\`, got \`${set.size}\``,
			validator: set => set.size >= size
		});
	}

	/**
	 * Test an Set to have a maximum size.
	 *
	 * @param size The maximum size of the Set.
	 */
	maxSize(size: number) {
		return this.addValidator({
			message: set => `Expected Set to have a maximum size of \`${size}\`, got \`${set.size}\``,
			validator: set => set.size <= size
		});
	}

	/**
	 * Test a Set to include all the provided items. The items are tested by identity, not structure.
	 *
	 * @param items The items that should be a item in the Set.
	 */
	has(...items: any[]) {
		const missingItems: any[] = [];

		return this.addValidator({
			message: () => `Expected Set to have items \`${JSON.stringify(missingItems)}\``,
			validator: set => {
				for (const item of items) {
					if (set.has(item)) {
						continue;
					}

					missingItems.push(item);

					if (missingItems.length === 5) {
						return false;
					}
				}

				return missingItems.length === 0;
			}
		});
	}

	/**
	 * Test a Set to include any of the provided items. The items are tested by identity, not structure.
	 *
	 * @param items The items that could be a item in the Set.
	 */
	hasAny(...items: any[]) {
		return this.addValidator({
			message: () => `Expected Set to have any item of \`${JSON.stringify(items)}\``,
			validator: set => items.some(item => set.has(item))
		});
	}

	/**
	 * Test all the items in the Set to match the provided predicate.
	 *
	 * @param predicate The predicate that should be applied against every item in the Set.
	 */
	ofType<T>(predicate: Predicate<T>) {
		let error: string;

		return this.addValidator({
			message: () => error,
			validator: set => {
				try {
					for (const item of set.keys()) {
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

	/**
	 * Test a Set to be empty.
	 */
	get empty() {
		return this.addValidator({
			message: set => `Expected Set to be empty, got \`${JSON.stringify(Array.from(set))}\``,
			validator: set => set.size === 0
		});
	}

	/**
	 * Test a Set to be not empty.
	 */
	get nonEmpty() {
		return this.addValidator({
			message: () => 'Expected Set to not be empty',
			validator: set => set.size > 0
		});
	}

	/**
	 * Test a Set to be deeply equal to the provided Set.
	 *
	 * @param expected Expected Set to match.
	 */
	deepEqual(expected: Set<any>) {
		return this.addValidator({
			message: set => `Expected Set to be deeply equal to \`${JSON.stringify(Array.from(expected))}\`, got \`${JSON.stringify(Array.from(set))}\``,
			validator: set => isEqual(set, expected)
		});
	}
}
