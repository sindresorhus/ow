import {Predicate, Context} from './predicate';

export class ErrorPredicate extends Predicate<Error> {
	constructor(context?: Context) {
		super('error', context);
	}

	/**
	 * Test an Error to be of a specific instance type.
	 *
	 * @param instance The expected instance type of the error.
	 */
	private addErrorTypeValidator(instance: any) {
		return this.addValidator({
			message: error => `Expected \`${error.name}\` to be a \`${instance.name}\``,
			validator: error => error instanceof instance
		});
	}

	/**
	 * Test an error to have a specific name.
	 *
	 * @param expected Expected name of the Error.
	 */
	name(expected: string) {
		return this.addValidator({
			message: error => `Expected error to have name \`${expected}\`, got \`${error.name}\``,
			validator: error => error.name === expected
		});
	}

	/**
	 * Test an error to have a specific message.
	 *
	 * @param expected Expected message of the Error.
	 */
	message(expected: string) {
		return this.addValidator({
			message: error => `Expected error message to be \`${expected}\`, got \`${error.message}\``,
			validator: error => error.message === expected
		});
	}

	/**
	 * Test the error message to include a specific message.
	 *
	 * @param message Message that should be included in the error.
	 */
	messageIncludes(message: string) {
		return this.addValidator({
			message: error => `Expected error message to include \`${message}\`, got \`${error.message}\``,
			validator: error => error.message.includes(message)
		});
	}

	/**
	 * Test an Error to be a TypeError.
	 */
	get typeError() {
		return this.addErrorTypeValidator(TypeError);
	}

	/**
	 * Test an Error to be an EvalError.
	 */
	get evalError() {
		return this.addErrorTypeValidator(EvalError);
	}

	/**
	 * Test an Error to be a RangeError.
	 */
	get rangeError() {
		return this.addErrorTypeValidator(RangeError);
	}

	/**
	 * Test an Error to be a ReferenceError.
	 */
	get referenceError() {
		return this.addErrorTypeValidator(ReferenceError);
	}

	/**
	 * Test an Error to be a SyntaxError.
	 */
	get syntaxError() {
		return this.addErrorTypeValidator(SyntaxError);
	}

	/**
	 * Test an Error to be a URIError.
	 */
	get uriError() {
		return this.addErrorTypeValidator(URIError);
	}
}
