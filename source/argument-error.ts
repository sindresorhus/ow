/**
@hidden
*/
export class ArgumentError extends Error {
	constructor(message: string, context: Function) {
		super(message);

		// TODO: Node.js does not preserve the error name in output when using the below, why?
		if ('captureStackTrace' in Error) {
			Error.captureStackTrace(this, context);
		}

		this.name = 'ArgumentError';
	}
}
