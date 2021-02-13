import {Predicate, PredicateOptions} from './predicate';

export class BooleanPredicate extends Predicate<boolean> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions) {
		super('boolean', options);
	}

	/**
	Test a boolean to be true.
	*/
	get true(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be true, got ${value}`,
			validator: value => value
		});
	}

	/**
	Test a boolean to be false.
	*/
	get false(): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to be false, got ${value}`,
			validator: value => !value
		});
	}
}
