import {Predicate, PredicateOptions} from './predicate';

export class BigIntPredicate extends Predicate<bigint> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions) {
		super('bigint', options);
	}
}
