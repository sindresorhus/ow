import {Predicate, PredicateOptions} from './predicate.js';

export class ErrorPredicate extends Predicate<Error> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions) {
		super('error', options);
	}

	/**
	Test an error to have a specific name.

	@param expected - Expected name of the Error.
	*/
	name(expected: string): this {
		return this.addValidator({
			message: (error, label) => `Expected ${label} to have name \`${expected}\`, got \`${error.name}\``,
			validator: error => error.name === expected,
		});
	}

	/**
	Test an error to have a specific message.

	@param expected - Expected message of the Error.
	*/
	override message(expected: string): this {
		return this.addValidator({
			message: (error, label) => `Expected ${label} message to be \`${expected}\`, got \`${error.message}\``,
			validator: error => error.message === expected,
		});
	}

	/**
	Test the error message to include a specific message.

	@param message - Message that should be included in the error.
	*/
	messageIncludes(message: string): this {
		return this.addValidator({
			message: (error, label) => `Expected ${label} message to include \`${message}\`, got \`${error.message}\``,
			validator: error => error.message.includes(message),
		});
	}

	/**
	Test the error object to have specific keys.

	@param keys - One or more keys which should be part of the error object.
	*/
	hasKeys(...keys: readonly string[]): this {
		return this.addValidator({
			message: (_, label) => `Expected ${label} message to have keys \`${keys.join('`, `')}\``,
			validator: error => keys.every(key => Object.prototype.hasOwnProperty.call(error, key)),
		});
	}

	/**
	Test an error to be of a specific instance type.

	@param instance - The expected instance type of the error.
	*/
	instanceOf(instance: Function): this {
		return this.addValidator({
			message: (error, label) => `Expected ${label} \`${error.name}\` to be of type \`${instance.name}\``,
			validator: error => error instanceof instance,
		});
	}

	/**
	Test an Error to be a TypeError.
	*/
	get typeError(): this {
		return this.instanceOf(TypeError);
	}

	/**
	Test an Error to be an EvalError.
	*/
	get evalError(): this {
		return this.instanceOf(EvalError);
	}

	/**
	Test an Error to be a RangeError.
	*/
	get rangeError(): this {
		return this.instanceOf(RangeError);
	}

	/**
	Test an Error to be a ReferenceError.
	*/
	get referenceError(): this {
		return this.instanceOf(ReferenceError);
	}

	/**
	Test an Error to be a SyntaxError.
	*/
	get syntaxError(): this {
		return this.instanceOf(SyntaxError);
	}

	/**
	Test an Error to be a URIError.
	*/
	get uriError(): this {
		return this.instanceOf(URIError);
	}
}
