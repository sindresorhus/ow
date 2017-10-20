import { Predicate } from '../predicates/predicate';

/**
 * Operator which inverts all the validations.
 *
 * @param predictate Predicate to wrap inside the operator.
 */
export const not = <T extends Predicate>(predicate: T): T => {
	return new Proxy(predicate, {
		get: (target, name, receiver) => {
			if (name === 'addValidator') {
				return (validator: any) => {
					const fn = validator.validator;
					validator.validator = (x: any) => !fn(x);

					return not(target[name](validator));
				};
			}

			return Reflect.get(target, name, receiver);
		}
	});
};
