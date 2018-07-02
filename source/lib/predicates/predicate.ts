import is from '@sindresorhus/is';
import {Ow} from '../..';
import {ArgumentError} from '../argument-error';
import {BasePredicate, testSymbol} from './base-predicate';
import {not} from '../operators/not';

/**
 * @hidden
 */
export interface Validator<T> {
	message(value: T, label?: string, result?: any): string;
	validator(value: T): any;
}

/**
 * @hidden
 */
export interface Context<T> {
	validators: Validator<T>[];
	label?: string;
}

/**
 * @hidden
 */
export const validatorSymbol = Symbol('validators');

/**
 * @hidden
 */
export class Predicate<T = any> implements BasePredicate<T> {
	constructor(
		private readonly type: string,
		private readonly context: Context<T> = {
			validators: []
		}
	) {
		const x = this.type[0].toLowerCase() + this.type.slice(1);

		this.addValidator({
			message: (value, label) => {
				// We do not include type in this label as we do for other messages, because it would be redundant.
				let lbl = this.context.label || label || 'argument';

				if (lbl === this.type) {
					lbl = 'argument';
				}

				return `Expected ${lbl} to be of type \`${this.type}\` but received type \`${is(value)}\``;
			},
			validator: value => (is as any)[x](value)
		});
	}

	/**
	 * @hidden
	 */
	// tslint:disable completed-docs
	[testSymbol](value: T, main: Ow, label?: string) {
		let lbl = this.context.label || (label && `\`${label}\``);

		lbl = lbl
			? `${this.type} ${lbl}`
			: this.type;

		for (const {validator, message} of this.context.validators) {
			const result = validator(value);

			if (typeof result !== 'boolean' || !result) {
				// TODO: Modify the stack output to show the original `ow()` call instead of this `throw` statement
				throw new ArgumentError(message(value, lbl, result), main);
			}
		}
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
	 * Assign a label to this predicate for use in error messages.
	 *
	 * @param value Label to assign.
	 */
	label(value: string) {
		this.context.label = `\`${value}\``;
		return this;
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
			message: (value, label, error) => (error
				? `(${label}) ${error}`
				: `Expected ${label} \`${value}\` to pass custom validation function`
			),
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
