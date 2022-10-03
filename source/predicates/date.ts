import {Predicate, type PredicateOptions} from './predicate.js';

export class DatePredicate extends Predicate<Date> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions) {
		super('date', options);
	}

	/**
	Test a date to be before another date.

	@param date - Maximum value.
	*/
	before(date: Date): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} ${value.toISOString()} to be before ${date.toISOString()}`,
			validator: value => value.getTime() < date.getTime(),
		});
	}

	/**
	Test a date to be before another date.

	@param date - Minimum value.
	*/
	after(date: Date): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} ${value.toISOString()} to be after ${date.toISOString()}`,
			validator: value => value.getTime() > date.getTime(),
		});
	}
}
