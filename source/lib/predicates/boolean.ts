import {Predicate, Context} from './predicate';

export class BooleanPredicate extends Predicate<boolean> {
	/**
	 * @hidden
	 */
	constructor(context?: Context<boolean>) {
		super('boolean', context);
	}

	/**
	 * Test a boolean to be true.
	 */
	get true() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be true, got ${value}`,
			validator: value => value === true
		});
	}

	/**
	 * Test a boolean to be false.
	 */
	get false() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be false, got ${value}`,
			validator: value => value === false
		});
	}
}
