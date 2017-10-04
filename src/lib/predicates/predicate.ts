import * as is from '@sindresorhus/is';

export type Validator = (value: any) => string | undefined;

export interface Context {
	validators: Validator[];
}

export class Predicate {
	constructor(
		type: string,
		public context: Context = { validators: [] }
	) {
		this.context.validators.push(value => {
			if (!is[type](value)) {
				return `Expected argument to be of type \`${type}\` but received type \`${is(value)}\``;
			}
		});
	}
}
