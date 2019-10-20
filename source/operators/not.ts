import randomId from '../utils/random-id';
import {validatorSymbol} from '../predicates/predicate';

/**
Operator which inverts the following validation.

@hidden

@param predictate - Predicate to wrap inside the operator.
*/
export const not = (predicate: any) => {
	const originalAddValidator = predicate.addValidator;

	predicate.addValidator = (validator: any) => {
		const {validator: fn, message, negatedMessage} = validator;
		const placeholder = randomId();

		validator.message = (value: unknown, label: string) => (
			negatedMessage ?
				negatedMessage(value, label) :
				message(value, placeholder).replace(/ to /, '$&not ').replace(placeholder, label)
		);

		validator.validator = (value: unknown) => !fn(value);

		predicate[validatorSymbol].push(validator);

		predicate.addValidator = originalAddValidator;

		return predicate;
	};

	return predicate;
};
