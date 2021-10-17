import randomId from '../utils/random-id.js';
import {validatorSymbol} from '../predicates/predicate.js';
import type {Predicate, Validator} from '../predicates/predicate.js';

/**
Operator which inverts the following validation.

@hidden

@param predictate - Predicate to wrap inside the operator.
*/
export const not = (predicate: Predicate): Predicate => {
	const originalAddValidator = predicate.addValidator;

	predicate.addValidator = (validator: Validator<unknown>): Predicate => {
		const {validator: fn, message, negatedMessage} = validator;
		const placeholder = randomId();

		validator.message = (value: unknown, label: string): string => (
			negatedMessage
				? negatedMessage(value, label)
				: message(value, placeholder).replace(/ to /, '$&not ').replace(placeholder, label)
		);

		validator.validator = (value: unknown): unknown => !fn(value);

		predicate[validatorSymbol].push(validator);

		predicate.addValidator = originalAddValidator;

		return predicate;
	};

	return predicate;
};
