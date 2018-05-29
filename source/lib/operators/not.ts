import {Predicate, validatorSymbol} from '../predicates/predicate';

/**
 * Operator which inverts all the validations.
 *
 * @hidden
 * @param predictate Predicate to wrap inside the operator.
 */
export const not = <T, P extends Predicate<T>>(predicate: P) => {
	predicate.addValidator = validator => {
		const fn = validator.validator;
		const message = validator.message;

		validator.message = (x: T, label: string) => `[NOT] ${message(x, label)}`;
		validator.validator = (x: T) => !fn(x);

		predicate[validatorSymbol].push(validator);

		return predicate;
	};

	return predicate;
};
