import { Predicate, Context } from './predicate';

export class StringPredicate extends Predicate<string> {

	constructor(context?: Context) {
		super('string', context);
	}

	/**
	 * Test a string to have a minimum length.
	 *
	 * @param length The minimum length of the string.
	 */
	minLength(length: number) {
		return this.addValidator({
			message: () => `Expected string length to be minimum ${length}`,
			validator: value => value.length >= length
		});
	}

	/**
	 * Test a string to be alphanumeric.
	 */
	get alphanumeric() {
		return this.addValidator({
			message: value => `Expected string to contain only alphanumeric characters but received \`${value}\``,
			validator: value => /^[a-z\d]+$/i.test(value)
		});
	}
}
