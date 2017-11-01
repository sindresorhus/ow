import {Predicate, Validator, validatorSymbol} from '../predicates/predicate';

/**
 * Operator which inverts all the validations.
 *
 * @param predictate Predicate to wrap inside the operator.
 */
export const not = <T extends Predicate>(predicate: T) => {
	predicate.addValidator = (validator: Validator<any>) => {
		const fn = validator.validator;
		const message = validator.message;

		validator.message = (x: any) => `[NOT] ${message(x)}`;
		validator.validator = (x: any) => !fn(x);

		predicate[validatorSymbol].push(validator);

		return predicate;
	};

	return predicate;
};
