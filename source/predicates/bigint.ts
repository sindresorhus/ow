import {Predicate, type PredicateOptions} from './predicate.js';

export class BigIntPredicate extends Predicate<bigint> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions) {
		super('bigint', options);
	}
}
