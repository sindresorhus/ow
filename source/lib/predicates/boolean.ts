import { Predicate, Context } from './predicate';

export class BooleanPredicate extends Predicate<boolean> {

	constructor(context?: Context) {
		super('boolean', context);
	}

	/**
	 * Test a boolean to be true.
	 */
	get true() {
		return this.addValidator({
			message: value => `Expected ${value} to be true`,
			validator: value => value
		});
	}

	/**
	 * Test a boolean to be false.
	 */
	get false() {
		return this.addValidator({
			message: value => `Expected ${value} to be false`,
			validator: value => !value
		});
	}
}
