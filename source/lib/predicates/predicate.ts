import is from '@sindresorhus/is';
import {Main} from '../..';
import {ArgumentError} from '../argument-error';
import {BasePredicate, testSymbol} from './base-predicate';
import {not} from '../operators/not';

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

		this.addValidator({
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
			const result = validator(value);

			if (result === true || (this.options.optional === true && value === undefined)) {
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
