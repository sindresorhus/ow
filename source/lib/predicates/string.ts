import { Predicate, Context } from './predicate';

export class StringPredicate extends Predicate {

	constructor(context?: Context) {
		super('string', context);
	}

	/**
	 * Test a string to have a minimum length.
	 *
	 * @param number The minimum length of the string.
	 */
	minLength(number: number) {
		this.context.validators.push(value => {
			if (value.length < number) {
				return `Expected string length to be minimum ${number}`;
			}
		});

		return this;
	}

	/**
	 * Test a string to be alphanumeric.
	 */
	get alphanumeric() {
		this.context.validators.push(value => {
			if (!/^[a-z\d]+$/i.test(value)) {
				return `Expected string to contain only alphanumeric characters but received \`${value}\``;
			}
		});

		return this;
	}
}
