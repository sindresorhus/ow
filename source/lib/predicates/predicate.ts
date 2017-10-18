import * as is from '@sindresorhus/is';

export interface Validator<T> {
	message(value: T): string;
	validator(value: T): boolean;
}

export interface Context {
	validators: Validator<any>[];
}

export const validatorSymbol = Symbol('validators');

<<<<<<< HEAD
export abstract class Predicate<T = any> {
=======
export class Predicate<T = any> {

	private negated: boolean;

>>>>>>> Add not predicate
	constructor(
		type: string,
		private context: Context = { validators: [] }
	) {
		this.addValidator({
			message: value => `Expected argument to be of type \`${type}\` but received type \`${is(value)}\``,
			validator: value => is[type](value)
		});
	}

	get [validatorSymbol]() {
		return this.context.validators;
	}

	/**
	 * Invert the following validators.
	 */
	get not() {
		this.negated = true;

		return this;
	}

	/**
	 * Register a new validator.
	 *
	 * @param validator Validator to register.
	 */
	protected addValidator(validator: Validator<T>) {
		if (this.negated) {
			const fn = validator.validator;
			validator.validator = x => !fn(x);
		}

		this.context.validators.push(validator);

		return this;
	}
}
