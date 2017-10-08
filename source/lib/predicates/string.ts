import { Predicate, Context } from './predicate';
import { Validator } from '../decorators/validator';

export class StringPredicate extends Predicate {

	constructor(context?: Context) {
		super('string', context);
	}

	/**
	 * Test a string to have a minimum length.
	 *
	 * @param number The minimum length of the string.
	 */
	@Validator()
	minLength(number: number): StringPredicate {
		return {
			message: () => `Expected string length to be minimum ${number}`,
			validator: (value: string) => value.length >= number
		} as any;
	}

	/**
	 * Test a string to be alphanumeric.
	 */
	@Validator()
	get alphanumeric(): StringPredicate {
		return {
			message: value => `Expected string to contain only alphanumeric characters but received \`${value}\``,
			validator: (value: string) => /^[a-z\d]+$/i.test(value)
		} as any;
	}
}
