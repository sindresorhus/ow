import {generateStackTrace} from './utils/generate-stack.js';

const wrapStackTrace = (error, stack) => `${error.name}: ${error.message}\n${stack}`;
/**
@hidden
*/
export class ArgumentError extends Error {
	constructor(message, context, errors = new Map()) {
		super(message);
		this.name = 'ArgumentError';
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, context);
		} else {
			this.stack = wrapStackTrace(this, generateStackTrace());
		}

		this.validationErrors = errors;
	}
}
