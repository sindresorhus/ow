import hasItems from '../utils/has-items.js';
import {Predicate, PredicateOptions} from './predicate.js';

export class WeakMapPredicate<KeyType extends object = object> extends Predicate<WeakMap<KeyType, unknown>> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions) {
		super('WeakMap', options);
	}

	/**
	Test a WeakMap to include all the provided keys. The keys are tested by identity, not structure.

	@param keys - The keys that should be a key in the WeakMap.
	*/
	hasKeys(...keys: readonly KeyType[]): this {
		return this.addValidator({
			message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
			validator: map => hasItems(map, keys),
		});
	}

	/**
	Test a WeakMap to include any of the provided keys. The keys are tested by identity, not structure.

	@param keys - The keys that could be a key in the WeakMap.
	*/
	hasAnyKeys(...keys: readonly KeyType[]): this {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
			validator: map => keys.some(key => map.has(key)),
		});
	}
}
