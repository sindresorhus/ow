import is from '@sindresorhus/is';
import {ArgumentError} from '../argument-error';
import {not} from '../operators/not';
import {BasePredicate, testSymbol} from './base-predicate';
import {Main} from '..';

/**
Function executed when the provided validation fails.
The first argument provided to the function is the provided `value` for the property,
the second argument is the optional `label` for the property.
The returned value will be the error message.
*/
export type ValidatorMessage<T> = (value: T, label?: string) => string;

/**
@hidden
*/
export interface Validator<T> {
	message(value: T, label?: string, result?: any): string;

	validator(value: T): unknown;

	/**
	Provide custom message used by `not` operator.

	When absent, the return value of `message()` is used and 'not' is inserted after the first 'to',
	e.g. `Expected 'smth' to be empty` -> `Expected 'smth' to not be empty`.
	*/
	negatedMessage?(value: T, label: string): string;
}

/**
@hidden
*/
export interface PredicateOptions {
	optional?: boolean;
}

/**
@hidden
*/
export interface Context<T = unknown> extends PredicateOptions {
	validators: Array<Validator<T>>;
}

/**
@hidden
*/
export const validatorSymbol = Symbol('validators');

export type CustomValidator<T> = (value: T) => {
	/**
	Should be `true` if the validation is correct.
	*/
	validator: boolean;

	/**
	The error message which should be shown if the `validator` is `false`. Or a error function which returns the error message and accepts the label as first argument.
	*/
	message: string | ((label: string) => string);
};

/**
@hidden
*/
export class Predicate<T = unknown> implements BasePredicate<T> {
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
				const label_ = label?.slice(this.type.length + 1);

				// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
				return `Expected ${label_ || 'argument'} to be of type \`${this.type}\` but received type \`${is(value)}\``;
			},
			validator: value => (is as any)[x](value)
		});
	}

	/**
	@hidden
	*/
	[testSymbol](value: T, main: Main, label: string | Function): asserts value {
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

			label2 = label2 ?
				`${this.type} \`${label2}\`` :
				this.type;

			// TODO: Modify the stack output to show the original `ow()` call instead of this `throw` statement
			throw new ArgumentError(message(value, label2, result), main);
		}
	}

	/**
	@hidden
	*/
	get [validatorSymbol]() {
		return this.context.validators;
	}

	/**
	Invert the following validators.
	*/
	get not(): this {
		return not(this);
	}

	/**
	Test if the value matches a custom validation function. The validation function should return an object containing a `validator` and `message`. If the `validator` is `false`, the validation fails and the `message` will be used as error message. If the `message` is a function, the function is invoked with the `label` as argument to let you further customize the error message.

	@param customValidator - Custom validation function.
	*/
	validate(customValidator: CustomValidator<T>) {
		return this.addValidator({
			message: (_, label, error) => typeof error === 'string' ?
				`(${label}) ${error}` :
				error(label),
			validator: value => {
				const {message, validator} = customValidator(value);

				if (validator) {
					return true;
				}

				return message;
			}
		});
	}

	/**
	Test if the value matches a custom validation function. The validation function should return `true` if the value passes the function. If the function either returns `false` or a string, the function fails and the string will be used as error message.

	@param validator - Validation function.
	*/
	is(validator: (value: T) => boolean | string) {
		return this.addValidator({
			message: (value, label, error) => (error ?
				`(${label}) ${error}` :
				`Expected ${label} \`${value}\` to pass custom validation function`
			),
			validator
		});
	}

	/**
	Provide an new error message to be thrown when the validation fails.

	@param newMessage - Either a string containing the new message or a function returning the new message.
	*/
	message(newMessage: string | ValidatorMessage<T>) {
		const {validators} = this.context;

		validators[validators.length - 1].message = (value, label) => {
			if (typeof newMessage === 'function') {
				return newMessage(value, label);
			}

			return newMessage;
		};

		return this;
	}

	/**
	Register a new validator.

	@param validator - Validator to register.
	*/
	protected addValidator(validator: Validator<T>) {
		this.context.validators.push(validator);
		return this;
	}
}
