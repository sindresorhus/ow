import * as is from '@sindresorhus/is';

export interface Validator<T> {
	message: (value: T) => string;
	validator: (value: T) => boolean;
}

export interface Context {
	validators: Validator<any>[];
}

export class Predicate<T = any> {
	constructor(
		type: string,
		private context: Context = { validators: [] }
	) {
		this.addValidator({
			message: value => `Expected argument to be of type \`${type}\` but received type \`${is(value)}\``,
			validator: value => is[type](value)
		});
	}

	protected addValidator(validator: Validator<T>) {
		this.context.validators.push(validator);

		return this;
	}
}
