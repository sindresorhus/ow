import is from '@sindresorhus/is';
import {ArgumentError} from '../argument-error';
import {not} from '../operators/not';
import {BasePredicate, testSymbol} from './base-predicate';
import {Main} from '..';
import {generateArgumentErrorMessage} from '../utils/generate-argument-error-message';

/**
Function executed when the provided validation fails.

@param value - The tested value.
@param label - Label of the tested value.

@returns {string} - The actual error message.
*/
export type ValidatorMessageBuilder<T> = (value: T, label?: string) => string;

/**
@hidden
*/
export interface Validator<T> {
	message(value: T, label?: string, result?: any): string;

	validator(value: T): unknown;

	/**
	Provide custom message used by `not` operator.

	When absent, the return value of `message()` is used and 'not' is inserted after the first 'to', e.g. `Expected 'smth' to be empty` -> `Expected 'smth' to not be empty`.
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

		const typeString = this.type.charAt(0).toLowerCase() + this.type.slice(1);

		this.addValidator({
			message: (value, label) => {
				// We do not include type in this label as we do for other messages, because it would be redundant.
				const label_ = label?.slice(this.type.length + 1);

				// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
				return `Expected ${label_ || 'argument'} to be of type \`${this.type}\` but received type \`${is(value)}\``;
			},
			validator: value => (is as any)[typeString](value)
		});
	}

	/**
	@hidden
	*/
	[testSymbol](value: T, main: Main, label: string | Function, idLabel: boolean): asserts value is T {
		// Create a map of labels -> received errors.
		const errors = new Map<string, Set<string>>();

		for (const {validator, message} of this.context.validators) {
			if (this.options.optional === true && value === undefined) {
				continue;
			}

			let result: unknown;

			try {
				result = validator(value);
			} catch (error: unknown) {
				// Any errors caught means validators couldn't process the input.
				result = error;
			}

			if (result === true) {
				continue;
			}

			const label2 = is.function_(label) ? label() : label;
			const labelWithTick = (label2 && idLabel) ? `\`${label2}\`` : label2;

			const label_ = labelWithTick ?
				`${this.type} ${labelWithTick}` :
				this.type;

			const mapKey = label2 || this.type;

			// Get the current errors encountered for this label.
			const currentErrors = errors.get(mapKey);
			// Pre-generate the error message that will be reported to the user.
			const errorMessage = message(value, label_, result);

			// If we already have any errors for this label.
			if (currentErrors) {
				// If we don't already have this error logged, add it.
				currentErrors.add(errorMessage);
			} else {
				// Set this label and error in the full map.
				errors.set(mapKey, new Set([errorMessage]));
			}
		}

		// If we have any errors to report, throw.
		if (errors.size > 0) {
			// Generate the `error.message` property.
			const message = generateArgumentErrorMessage(errors);

			throw new ArgumentError(message, main, errors);
		}
	}

	/**
	@hidden
	*/
	get [validatorSymbol](): Array<Validator<T>> {
		return this.context.validators;
	}

	/**
	Invert the following validators.
	*/
	get not(): this {
		return not(this) as this;
	}

	/**
	Test if the value matches a custom validation function. The validation function should return an object containing a `validator` and `message`. If the `validator` is `false`, the validation fails and the `message` will be used as error message. If the `message` is a function, the function is invoked with the `label` as argument to let you further customize the error message.

	@param customValidator - Custom validation function.
	*/
	validate(customValidator: CustomValidator<T>): this {
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
	is(validator: (value: T) => boolean | string): this {
		return this.addValidator({
			message: (value, label, error) => (error ?
				`(${label}) ${error}` :
				`Expected ${label} \`${value}\` to pass custom validation function`
			),
			validator
		});
	}

	/**
	Provide a new error message to be thrown when the validation fails.

	@param newMessage - Either a string containing the new message or a function returning the new message.

	@example
	```
	ow('🌈', 'unicorn', ow.string.equals('🦄').message('Expected unicorn, got rainbow'));
	//=> ArgumentError: Expected unicorn, got rainbow
	```

	@example
	```
	ow('🌈', ow.string.minLength(5).message((value, label) => `Expected ${label}, to have a minimum length of 5, got \`${value}\``));
	//=> ArgumentError: Expected string, to be have a minimum length of 5, got `🌈`
	```
	*/
	message(newMessage: string | ValidatorMessageBuilder<T>): this {
		const {validators} = this.context;

		validators[validators.length - 1]!.message = (value, label): string => {
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
	addValidator(validator: Validator<T>): this {
		this.context.validators.push(validator);
		return this;
	}
}
