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
		return this.addValidator({
			message: () => `Expected string length to be minimum ${number}`,
			validator: (value: string) => value.length >= number
		});
	}

	/**
	 * Test a string to be alphanumeric.
	 */
	get alphanumeric() {
		return this.addValidator({
			message: value => `Expected string to contain only alphanumeric characters but received \`${value}\``,
			validator: (value: string) => /^[a-z\d]+$/i.test(value)
		});
	}
}
