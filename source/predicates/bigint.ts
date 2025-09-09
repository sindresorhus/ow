import {Predicate, type PredicateOptions, type Validator} from './predicate.js';

export class BigIntPredicate extends Predicate<bigint> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions, validators?: Array<Validator<bigint>>) {
		super('bigint', options, validators);
	}
}
