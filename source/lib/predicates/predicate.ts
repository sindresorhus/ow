import * as is from '@sindresorhus/is';

export interface Validator {
	message: (value: any) => string;
	validator: (value: any) => boolean;
}

export interface Context {
	validators: Validator[];
}

export class Predicate {
	constructor(
		type: string,
		public context: Context = { validators: [] }
	) {
		this.register({
			message: value => `Expected argument to be of type \`${type}\` but received type \`${is(value)}\``,
			validator: value => is[type](value)
		});
	}

	protected register(validator: Validator) {
		this.context.validators.push(validator);
	}
}
