import is from '@sindresorhus/is';
import {not} from '../operators/not';

/**
 * @hidden
 */
export interface Validator<T> {
	message(value: T): string;
	validator(value: T): boolean;
}

/**
 * @hidden
 */
export interface Context {
	validators: Validator<any>[];
}

/**
 * @hidden
 */
export const validatorSymbol = Symbol('validators');

/**
 * @hidden
 */
export class Predicate<T = any> {
	constructor(
		type: string,
		private context: Context = {
			validators: []
		}
	) {
		this.addValidator({
			message: value => `Expected argument to be of type \`${type}\` but received type \`${is(value)}\``,
			validator: value => is[type](value)
		});
	}

	/**
	 * @hidden
	 */
	get [validatorSymbol]() {
		return this.context.validators;
	}

	/**
	 * Invert the following validators.
	 */
	get not(): this {
		return not(this);
	}

	/**
	 * Register a new validator.
	 *
	 * @internal
	 * @hidden
	 * @param validator Validator to register.
	 */
	addValidator(validator: Validator<T>) {
		this.context.validators.push(validator);

		return this;
	}
}
