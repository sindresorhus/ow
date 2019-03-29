import {Predicate, PredicateOptions} from './predicate';
import addValidator from '../utils/add-validator';

export class BooleanPredicate extends Predicate<boolean> {
	/**
	 * @hidden
	 */
	constructor(options?: PredicateOptions) {
		super('boolean', options);
	}

	/**
	 * Test a boolean to be true.
	 */
	get true() {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to be true, got ${value}`,
			validator: value => value === true
		});
	}

	/**
	 * Test a boolean to be false.
	 */
	get false() {
		return addValidator(this, {
			message: (value, label) => `Expected ${label} to be false, got ${value}`,
			validator: value => value === false
		});
	}
}
