import {Predicate} from './predicate.js';

export class BooleanPredicate extends Predicate {
	/**
	@hidden
	*/
	constructor(options) {
		super('boolean', options);
	}

	/**
	Test a boolean to be true.
	*/
	get true() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be true, got ${value}`,
			validator: value => value
		});
	}

	/**
	Test a boolean to be false.
	*/
	get false() {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be false, got ${value}`,
			validator: value => !value
		});
	}
}
