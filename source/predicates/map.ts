import isEqual from 'lodash.isequal';
import {Predicate, PredicateOptions} from './predicate';
import hasItems from '../utils/has-items';
import ofType from '../utils/of-type';
import addValidator from '../utils/add-validator';

export class MapPredicate<T1 = any, T2 = any> extends Predicate<Map<T1, T2>> {
	/**
	 * @hidden
	 */
	constructor(options?: PredicateOptions) {
		super('Map', options);
	}

	/**
	 * Test a Map to have a specific size.
	 *
	 * @param size The size of the Map.
	 */
	size(size: number) {
		return addValidator(this, {
			message: (map, label) => `Expected ${label} to have size \`${size}\`, got \`${map.size}\``,
			validator: map => map.size === size
		});
	}

	/**
	 * Test an Map to have a minimum size.
	 *
	 * @param size The minimum size of the Map.
	 */
	minSize(size: number) {
		return addValidator(this, {
			message: (map, label) => `Expected ${label} to have a minimum size of \`${size}\`, got \`${map.size}\``,
			validator: map => map.size >= size
		});
	}

	/**
	 * Test an Map to have a maximum size.
	 *
	 * @param size The maximum size of the Map.
	 */
	maxSize(size: number) {
		return addValidator(this, {
			message: (map, label) => `Expected ${label} to have a maximum size of \`${size}\`, got \`${map.size}\``,
			validator: map => map.size <= size
		});
	}

	/**
	 * Test a Map to include all the provided keys. The keys are tested by identity, not structure.
	 *
	 * @param keys The keys that should be a key in the Map.
	 */
	hasKeys(...keys: T1[]) {
		return addValidator(this, {
			message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
			validator: map => hasItems(map, keys)
		});
	}

	/**
	 * Test a Map to include any of the provided keys. The keys are tested by identity, not structure.
	 *
	 * @param keys The keys that could be a key in the Map.
	 */
	hasAnyKeys(...keys: T1[]) {
		return addValidator(this, {
			message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
			validator: map => keys.some(key => map.has(key))
		});
	}

	/**
	 * Test a Map to include all the provided values. The values are tested by identity, not structure.
	 *
	 * @param values The values that should be a value in the Map.
	 */
	hasValues(...values: T2[]) {
		return addValidator(this, {
			message: (_, label, missingValues) => `Expected ${label} to have values \`${JSON.stringify(missingValues)}\``,
			validator: map => hasItems(new Set(map.values()), values)
		});
	}

	/**
	 * Test a Map to include any of the provided values. The values are tested by identity, not structure.
	 *
	 * @param values The values that could be a value in the Map.
	 */
	hasAnyValues(...values: T2[]) {
		return addValidator(this, {
			message: (_, label) => `Expected ${label} to have any value of \`${JSON.stringify(values)}\``,
			validator: map => {
				const valueSet = new Set(map.values());

				return values.some(key => valueSet.has(key));
			}
		});
	}

	/**
	 * Test all the keys in the Map to match the provided predicate.
	 *
	 * @param predicate The predicate that should be applied against every key in the Map.
	 */
	keysOfType(predicate: Predicate<T1>) {
		return addValidator(this, {
			message: (_, label, error) => `(${label}) ${error}`,
			validator: map => ofType(map.keys(), predicate)
		});
	}

	/**
	 * Test all the values in the Map to match the provided predicate.
	 *
	 * @param predicate The predicate that should be applied against every value in the Map.
	 */
	valuesOfType(predicate: Predicate<T2>) {
		return addValidator(this, {
			message: (_, label, error) => `(${label}) ${error}`,
			validator: map => ofType(map.values(), predicate)
		});
	}

	/**
	 * Test a Map to be empty.
	 */
	get empty() {
		return addValidator(this, {
			message: (map, label) => `Expected ${label} to be empty, got \`${JSON.stringify(Array.from(map))}\``,
			validator: map => map.size === 0
		});
	}

	/**
	 * Test a Map to be not empty.
	 */
	get nonEmpty() {
		return addValidator(this, {
			message: (_, label) => `Expected ${label} to not be empty`,
			validator: map => map.size > 0
		});
	}

	/**
	 * Test a Map to be deeply equal to the provided Map.
	 *
	 * @param expected Expected Map to match.
	 */
	deepEqual(expected: Map<T1, T2>) {
		return addValidator(this, {
			message: (map, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(Array.from(expected))}\`, got \`${JSON.stringify(Array.from(map))}\``,
			validator: map => isEqual(map, expected)
		});
	}
}
