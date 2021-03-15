import randomId from '../utils/random-id.js';
import {validatorSymbol} from '../predicates/predicate.js';

/**
Operator which inverts the following validation.

@hidden

@param predictate - Predicate to wrap inside the operator.
*/
export const not = predicate => {
	const originalAddValidator = predicate.addValidator;
	predicate.addValidator = validator => {
		const {validator: fn, message, negatedMessage} = validator;
		const placeholder = randomId();
		validator.message = (value, label) => (negatedMessage ?
			negatedMessage(value, label) :
			message(value, placeholder).replace(/ to /, '$&not ').replace(placeholder, label));
		validator.validator = value => !fn(value);
		predicate[validatorSymbol].push(validator);
		predicate.addValidator = originalAddValidator;
		return predicate;
	};

	return predicate;
};
