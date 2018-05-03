import {Predicate} from '../predicates/predicate';

/**
 * @hidden
 */
const createMessage = (message: string) => {
	if (message.startsWith('[NOT]')) {
		return message.slice(6);
	}

	return `[NOT] ${message}`;
};

/**
 * Operator which inverts all the validations.
 *
 * @hidden
 * @param predictate Predicate to wrap inside the operator.
 */
export const not = <T, P extends Predicate<T>>(predicate: P) => {
	const addValidator = predicate.addValidator.bind(predicate);

	predicate.addValidator = validator => {
		const fn = validator.validator;
		const message = validator.message;

		validator.message = (x: T) => createMessage(message(x));
		validator.validator = (x: T) => !fn(x);

		return addValidator(validator);
	};

	return predicate;
};
