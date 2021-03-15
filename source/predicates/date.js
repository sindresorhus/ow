import {Predicate} from './predicate.js';
export class DatePredicate extends Predicate {
	/**
	@hidden
	*/
	constructor(options) {
		super('date', options);
	}

	/**
	Test a date to be before another date.

	@param date - Maximum value.
	*/
	before(date) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} ${value.toISOString()} to be before ${date.toISOString()}`,
			validator: value => value.getTime() < date.getTime()
		});
	}

	/**
	Test a date to be before another date.

	@param date - Minimum value.
	*/
	after(date) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} ${value.toISOString()} to be after ${date.toISOString()}`,
			validator: value => value.getTime() > date.getTime()
		});
	}
}
