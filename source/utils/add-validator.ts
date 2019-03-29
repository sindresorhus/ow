import {Validator, validatorSymbol, Predicate} from '../predicates/predicate';

/**
 * Add a validator to an existing predicate.
 *
 * @param predicate - Predicate to add the validator to.
 * @param validator - Validator to add to the predicate.
 */
export default <T, U extends Predicate<T>>(predicate: U, validator: Validator<T>) => {
	predicate[validatorSymbol].push(validator);

	return predicate;
};
