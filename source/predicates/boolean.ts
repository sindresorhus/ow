import {Predicate, type PredicateOptions, type Validator} from './predicate.js';

export class BooleanPredicate extends Predicate<boolean> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions, validators?: Array<Validator<boolean>>) {
		super('boolean', options, validators);
	}

	/**
	Test a boolean to be true.
	*/
	get true(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be true, got ${value}`,
			validator: value => value,
		});
	}

	/**
	Test a boolean to be false.
	*/
	get false(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be false, got ${value}`,
			validator: value => !value,
		});
	}
}
