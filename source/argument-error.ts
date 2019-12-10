/**
@hidden
*/
export class ArgumentError extends Error {
	constructor(message: string, context: Function) {
		super(message);

		if (Error.captureStackTrace) {
			/* eslint-disable-next-line no-warning-comments */
			// TODO: Node.js does not preserve the error name in output when using the below, why?
			Error.captureStackTrace(this, context);
		} else {
			this.stack = (new Error()).stack;
		}

		this.name = 'ArgumentError';
	}
}
