import is from '@sindresorhus/is';
import {ArgumentError} from '../argument-error';
import {Main} from '..';
import {BasePredicate, testSymbol} from './base-predicate';
import {not} from '../operators/not';
import addValidator from '../utils/add-validator';

/**
 * @hidden
 */
export interface Validator<T> {
	// tslint:disable-next-line completed-docs
	message(value: T, label?: string, result?: any): string;

	// tslint:disable-next-line completed-docs
	validator(value: T): any;
}

/**
 * @hidden
 */
export interface PredicateOptions {
	optional?: boolean;
}

/**
 * @hidden
 */
export interface Context<T = unknown> extends PredicateOptions {
	validators: Validator<T>[];
}

/**
 * @hidden
 */
export const validatorSymbol = Symbol('validators');

export type CustomValidator<T> = (value: T) => {
	/**
	 * Should be `true` if the validation is correct.
	 */
	validator: boolean;

	/**
	 * The error message which should be shown if the `validator` is `false`. Or a error function which returns the
	 * error message and accepts the label as first argument.
	 */
	message: string | ((label: string) => string);
};

/**
 * @hidden
 */
export class Predicate<T = any> implements BasePredicate<T> {
	private readonly context: Context<T> = {
		validators: []
	};

	constructor(
		private readonly type: string,
		private readonly options: PredicateOptions = {}
	) {
		this.context = {
			...this.context,
			...this.options
		};

		const x = this.type[0].toLowerCase() + this.type.slice(1);

		addValidator(this, {
			message: (value, label) => {
				// We do not include type in this label as we do for other messages, because it would be redundant.
				const lbl = label && label.substring(this.type.length + 1);

				return `Expected ${lbl || 'argument'} to be of type \`${this.type}\` but received type \`${is(value)}\``;
			},
			validator: value => (is as any)[x](value)
		});
	}

	/**
	 * @hidden
	 */
	// tslint:disable completed-docs
	[testSymbol](value: T, main: Main, label: string | Function) {
		for (const {validator, message} of this.context.validators) {
			if (this.options.optional === true && value === undefined) {
				continue;
			}

			const result = validator(value);

			if (result === true) {
				continue;
			}

			let label2 = label;

			if (typeof label === 'function') {
				label2 = label();
			}

			label2 = label2
				? `${this.type} \`${label2}\``
				: this.type;

			// TODO: Modify the stack output to show the original `ow()` call instead of this `throw` statement
			throw new ArgumentError(message(value, label2, result), main);
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
	 * Test if the value matches a custom validation function. The validation function should return an object containing a
	 * `validator` and `message`. If the `validator` is `false`, the validation fails and the `message` will be used as error message.
	 * If the `message` is a function, the function is invoked with the `label` as argument to let you further customize the error message.
	 *
	 * @param fn Custom validation function.
	 */
	validate(fn: CustomValidator<T>) {
		return addValidator(this, {
			message: (_, label, error) => typeof error === 'string'
				? `(${label}) ${error}`
				: error(label),
			validator: value => {
				const {message, validator} = fn(value);

				if (validator) {
					return true;
				}

				return message;
			}
		});
	}

	/**
	 * Test if the value matches a custom validation function. The validation function should return `true` if the value
	 * passes the function. If the function either returns `false` or a string, the function fails and the string will be
	 * used as error message.
	 *
	 * @param fn Validation function.
	 */
	is(fn: (value: T) => boolean | string) {
		addValidator(this, {
			message: (value, label, error) => (error
				? `(${label}) ${error}`
				: `Expected ${label} \`${value}\` to pass custom validation function`
			),
			validator: fn
		});

		return this;
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
