'use strict';
const is = require('@sindresorhus/is');

class ArgumentError extends Error {
	constructor(message, context) {
		super(message);
		// TODO: Node does not preserve the error name in output when using the below, why?
		//Error.captureStackTrace(this, context);
		this.name = 'ArgumentError';
	}
}

const ow = (value, predicate) => {
	for (const validator of predicate.context.validators) {
		const result = validator(value);
		if (result) {
			// TODO: Modify the stack output to show the original `ow()` call instead of this `throw` statement
			throw new ArgumentError(result, ow);
		}
	}
};

const newInstance = (fn, context) => {
	const instance = fn(context);
	instance.context = context;
	return instance;
};

const stringPredicates = context => ({
	minLength: number => {
		context.validators.push(value => {
			if (value.length < number) {
				return `Expected string length to be minimum ${number}`;
			}
		});
		return newInstance(stringPredicates, context);
	},
	get alphanumeric() {
		context.validators.push(value => {
			if (/[a-z\d]/gi.test(value)) {
				return `Expected string to contain only alphanumeric characters but received \`${value}\``;
			}
		});
		return newInstance(stringPredicates, context);
	}
});

Object.defineProperty(ow, 'string', {
	enumerable: true,
	get() {
		const instance = newInstance(stringPredicates, {
			validators: []
		});

		instance.context.validators.push(value => {
			// TODO: Create a generic function for all types that can be used here
			if (!is.string(value)) {
				return `Expected argument to be of type \`string\` but received type \`${is(value)}\``;
			}
		});

		return instance;
	}
});

module.exports = ow;
