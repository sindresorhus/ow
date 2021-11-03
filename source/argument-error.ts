import {generateStackTrace} from './utils/generate-stack.js';

const wrapStackTrace = (error: ArgumentError, stack: string): string => `${error.name}: ${error.message}\n${stack}`;

/**
@hidden
*/
export class ArgumentError extends Error {
	readonly validationErrors: ReadonlyMap<string, Set<string>>;

	constructor(message: string, context: Function, errors = new Map<string, Set<string>>()) {
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
