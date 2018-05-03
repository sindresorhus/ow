import is from '@sindresorhus/is';
import {Ow} from '../..';
import {ArgumentError} from '../argument-error';
import {BasePredicate, testSymbol} from './base-predicate';
import {not} from '../operators/not';

/**
 * @hidden
 */
export interface Validator<T> {
	message(value: T, result?: any): string;
	validator(value: T): any;
}

/**
 * @hidden
 */
export interface Context<T> {
	validators: Validator<T>[];
}

/**
 * @hidden
 */
export class Predicate<T = any> implements BasePredicate<T> {
	constructor(
		type: string,
		private readonly context: Context<T> = {
			validators: []
		}
	) {
		this.addValidator({
			message: value => `Expected argument to be of type \`${type}\` but received type \`${is(value)}\``,
			validator: value => (is as any)[type](value)
		});
	}

	/**
	 * @hidden
	 */
	// tslint:disable completed-docs
	[testSymbol](value: T, main: Ow) {
		for (const {validator, message} of this.context.validators) {
			const result = validator(value);

			if (typeof result !== 'boolean' || !result) {
				// TODO: Modify the stack output to show the original `ow()` call instead of this `throw` statement
				throw new ArgumentError(message(value, result), main);
			}
		}
	}

	/**
	 * Invert the following validators.
	 */
	get not(): this {
		return not(this);
	}

	/**
	 * Test if the value matches a custom validation function. The validation function should return `true` if the value
	 * passes the function. If the function either returns `false` or a string, the function fails and the string will be
	 * used as error message.
	 *
	 * @param fn Validation function.
	 */
	is(fn: (value: T) => boolean | string) {
		return this.addValidator({
			message: (value, error) => error || `Expected \`${value}\` to pass custom validation function`,
			validator: value => fn(value)
		});
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
