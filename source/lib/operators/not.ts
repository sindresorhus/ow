import {Predicate, validatorSymbol} from '../predicates/predicate';

/**
 * Operator which inverts the following validation.
 *
 * @hidden
 * @param predictate Predicate to wrap inside the operator.
 */
export const not = <T, P extends Predicate<T>>(predicate: P) => {
	const originalAddValidator = predicate.addValidator;

	predicate.addValidator = validator => {
		const fn = validator.validator;
		const message = validator.message;

		validator.message = (x: T, label: string) => `[NOT] ${message(x, label)}`;
		validator.validator = (x: T) => !fn(x);

		predicate[validatorSymbol].push(validator);

		predicate.addValidator = originalAddValidator;

		return predicate;
	};

	return predicate;
};
