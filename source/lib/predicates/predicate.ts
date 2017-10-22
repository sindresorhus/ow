import * as is from '@sindresorhus/is';

export interface Validator<T> {
	message(value: T): string;
	validator(value: T): boolean;
}

export interface Context {
	validators: Validator<any>[];
}

export const validatorSymbol = Symbol('validators');

export abstract class Predicate<T = any> {
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
	 * Register a new validator.
	 *
	 * @param validator Validator to register.
	 */
	protected addValidator(validator: Validator<T>) {
		this.context.validators.push(validator);

		return this;
	}
}
