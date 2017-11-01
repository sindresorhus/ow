import { Predicate, Context } from './predicate';

export class ArrayPredicate extends Predicate<any[]> {

	constructor(context?: Context) {
		super('array', context);
	}

	/**
	 * Test an array to have a specific length.
	 *
	 * @param length The length of the array.
	 */
	length(length: number) {
		return this.addValidator({
			message: value => `Expected array to have length \`${length}\`, got \`${value.length}\``,
			validator: value => value.length === length
		});
	}

	/**
	 * Test an array to have a minimum length.
	 *
	 * @param length The minimum length of the array.
	 */
	minLength(length: number) {
		return this.addValidator({
			message: value => `Expected array to have a minimum length of \`${length}\`, got \`${value.length}\``,
			validator: value => value.length >= length
		});
	}

	/**
	 * Test an array to have a maximum length.
	 *
	 * @param length The maximum length of the array.
	 */
	maxLength(length: number) {
		return this.addValidator({
			message: value => `Expected array to have a maximum length of \`${length}\`, got \`${value.length}\``,
			validator: value => value.length <= length
		});
	}
}
