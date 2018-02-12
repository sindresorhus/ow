import is from '@sindresorhus/is';
import isEqual = require('lodash.isequal'); // tslint:disable-line:no-require-imports
import {Predicate, Context} from './predicate';
import hasItems from '../utils/has-items';
import ofType from '../utils/of-type';
import ofTypeDeep from '../utils/of-type-deep';

export class ObjectPredicate extends Predicate<object> {
	constructor(context?: Context) {
		super('object', context);
	}

	/**
	 * Test if an Object is a plain object.
	 */
	get plain() {
		return this.addValidator({
			message: () => 'Expected object to be a plain object',
			validator: object => is.plainObject(object)
		});
	}

	/**
	 * Test an object to be empty.
	 */
	get empty() {
		return this.addValidator({
			message: object => `Expected object to be empty, got \`${JSON.stringify(object)}\``,
			validator: object => Object.keys(object).length === 0
		});
	}

	/**
	 * Test an object to be not empty.
	 */
	get nonEmpty() {
		return this.addValidator({
			message: () => 'Expected object to not be empty',
			validator: object => Object.keys(object).length > 0
		});
	}

	/**
	 * Test all the values in the object to match the provided predicate.
	 *
	 * @param predicate The predicate that should be applied against every value in the object.
	 */
	valuesOfType<T>(predicate: Predicate<T>) {
		return this.addValidator({
			message: (_, error) => error,
			validator: (object: any) => {
				const values = Object.keys(object).map(key => object[key]);

				return ofType(values, predicate);
			}
		});
	}

	/**
	 * Test all the values in the object deeply to match the provided predicate.
	 *
	 * @param predicate The predicate that should be applied against every value in the object.
	 */
	deepValuesOfType<T>(predicate: Predicate<T>) {
		return this.addValidator({
			message: (_, error) => error,
			validator: (object: any) => ofTypeDeep(object, predicate)
		});
	}

	/**
	 * Test an object to be deeply equal to the provided object.
	 *
	 * @param expected Expected object to match.
	 */
	deepEqual(expected: object) {
		return this.addValidator({
			message: object => `Expected object to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(object)}\``,
			validator: object => isEqual(object, expected)
		});
	}

	/**
	 * Test an object to be of a specific instance type.
	 *
	 * @param instance The expected instance type of the object.
	 */
	instanceOf(instance: any) {
		return this.addValidator({
			message: (object: any) => {
				let name = object.constructor.name;

				if (!name || name === 'Object') {
					name = JSON.stringify(object);
				}

				return `Expected \`${name}\` to be of type \`${instance.name}\``;
			},
			validator: object => object instanceof instance
		});
	}

	/**
	 * Test an object to include all the provided keys.
	 *
	 * @param keys The keys that should be present in the object.
	 */
	hasKeys(...keys: string[]) {
		return this.addValidator({
			message: (_, missingKeys) => `Expected object to have keys \`${JSON.stringify(missingKeys)}\``,
			validator: object => hasItems(new Set(Object.keys(object)), keys)
		});
	}

	/**
	 * Test an object to include any of the provided keys.
	 *
	 * @param keys The keys that could be a key in the object.
	 */
	hasAnyKeys(...keys: string[]) {
		return this.addValidator({
			message: () => `Expected object to have any key of \`${JSON.stringify(keys)}\``,
			validator: (object: any) => keys.some(key => object[key] !== undefined)
		});
	}
}
