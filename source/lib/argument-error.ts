export class ArgumentError extends Error {
	constructor(message, context) {
		super(message);
		// TODO: Node does not preserve the error name in output when using the below, why?
		//Error.captureStackTrace(this, context);
		this.name = 'ArgumentError';
	}
}
