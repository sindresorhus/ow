import {validatorSymbol} from '../predicates/predicate';

/**
Operator which inverts the following validation.

@hidden

@param predictate - Predicate to wrap inside the operator.
*/
export const not = (predicate: any) => {
	const originalAddValidator = predicate.addValidator;

	predicate.addValidator = (validator: any) => {
		const fn = validator.validator;
		const {message} = validator;

		validator.message = (value: unknown, label: string) => `[NOT] ${message(value, label)}`;
		validator.validator = (value: unknown) => !fn(value);

		predicate[validatorSymbol].push(validator);

		predicate.addValidator = originalAddValidator;

		return predicate;
	};

	return predicate;
};
