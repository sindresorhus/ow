import {Predicate, PredicateOptions} from './predicate';
import addValidator from '../utils/add-validator';

export class ErrorPredicate extends Predicate<Error> {
	/**
	 * @hidden
	 */
	constructor(options?: PredicateOptions) {
		super('error', options);
	}

	/**
	 * Test an error to have a specific name.
	 *
	 * @param expected Expected name of the Error.
	 */
	name(expected: string) {
		return addValidator(this, {
			message: (error, label) => `Expected ${label} to have name \`${expected}\`, got \`${error.name}\``,
			validator: error => error.name === expected
		});
	}

	/**
	 * Test an error to have a specific message.
	 *
	 * @param expected Expected message of the Error.
	 */
	message(expected: string) {
		return addValidator(this, {
			message: (error, label) => `Expected ${label} message to be \`${expected}\`, got \`${error.message}\``,
			validator: error => error.message === expected
		});
	}

	/**
	 * Test the error message to include a specific message.
	 *
	 * @param message Message that should be included in the error.
	 */
	messageIncludes(message: string) {
		return addValidator(this, {
			message: (error, label) => `Expected ${label} message to include \`${message}\`, got \`${error.message}\``,
			validator: error => error.message.includes(message)
		});
	}

	/**
	 * Test the error object to have specific keys.
	 *
	 * @param keys One or more keys which should be part of the error object.
	 */
	hasKeys(...keys: string[]) {
		return addValidator(this, {
			message: (_, label) => `Expected ${label} message to have keys \`${keys.join('`, `')}\``,
			validator: error => keys.every(key => error.hasOwnProperty(key))
		});
	}

	/**
	 * Test an error to be of a specific instance type.
	 *
	 * @param instance The expected instance type of the error.
	 */
	instanceOf(instance: any) {
		return addValidator(this, {
			message: (error, label) => `Expected ${label} \`${error.name}\` to be of type \`${instance.name}\``,
			validator: error => error instanceof instance
		});
	}

	/**
	 * Test an Error to be a TypeError.
	 */
	get typeError() {
		return this.instanceOf(TypeError);
	}

	/**
	 * Test an Error to be an EvalError.
	 */
	get evalError() {
		return this.instanceOf(EvalError);
	}

	/**
	 * Test an Error to be a RangeError.
	 */
	get rangeError() {
		return this.instanceOf(RangeError);
	}

	/**
	 * Test an Error to be a ReferenceError.
	 */
	get referenceError() {
		return this.instanceOf(ReferenceError);
	}

	/**
	 * Test an Error to be a SyntaxError.
	 */
	get syntaxError() {
		return this.instanceOf(SyntaxError);
	}

	/**
	 * Test an Error to be a URIError.
	 */
	get uriError() {
		return this.instanceOf(URIError);
	}
}
