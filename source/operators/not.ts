import {validatorSymbol} from '../predicates/predicate';

/**
Operator which inverts the following validation.

@hidden

@param predictate - Predicate to wrap inside the operator.
*/
export const not = (predicate: any) => {
	const originalAddValidator = predicate.addValidator;

	predicate.addValidator = (validator: any) => {
		const {validator: fn, message, invertedMessage} = validator;
		const placeholder = Math.random().toString(16).slice(2);

		validator.message = (value: unknown, label: string) => (
			invertedMessage ?
				invertedMessage(value, label) :
				message(value, placeholder).replace(/ to /, '$&not ').replace(placeholder, label)
		);

		validator.validator = (value: unknown) => !fn(value);

		predicate[validatorSymbol].push(validator);

		predicate.addValidator = originalAddValidator;

		return predicate;
	};

	return predicate;
};
