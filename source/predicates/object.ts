import is from '@sindresorhus/is';
import dotProp from 'dot-prop';
import isEqual from 'lodash.isequal';
import {Predicate, PredicateOptions} from './predicate';
import hasItems from '../utils/has-items';
import ofType from '../utils/of-type';
import ofTypeDeep from '../utils/of-type-deep';
import {partial, exact, Shape} from '../utils/match-shape';
import addValidator from '../utils/add-validator';

export {Shape};

export class ObjectPredicate extends Predicate<object> {
	/**
	 * @hidden
	 */
	constructor(options?: PredicateOptions) {
		super('object', options);
	}

	/**
	 * Test if an Object is a plain object.
	 */
	get plain() {
		return addValidator(this, {
			message: (_, label) => `Expected ${label} to be a plain object`,
			validator: object => is.plainObject(object)
		});
	}

	/**
	 * Test an object to be empty.
	 */
	get empty() {
		return addValidator(this, {
			message: (object, label) => `Expected ${label} to be empty, got \`${JSON.stringify(object)}\``,
			validator: object => Object.keys(object).length === 0
		});
	}

	/**
	 * Test an object to be not empty.
	 */
	get nonEmpty() {
		return addValidator(this, {
			message: (_, label) => `Expected ${label} to not be empty`,
			validator: object => Object.keys(object).length > 0
		});
	}

	/**
	 * Test all the values in the object to match the provided predicate.
	 *
	 * @param predicate The predicate that should be applied against every value in the object.
	 */
	valuesOfType<T>(predicate: Predicate<T>) {
		return addValidator(this, {
			message: (_, label, error) => `(${label}) ${error}`,
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
		return addValidator(this, {
			message: (_, label, error) => `(${label}) ${error}`,
			validator: (object: any) => ofTypeDeep(object, predicate)
		});
	}

	/**
	 * Test an object to be deeply equal to the provided object.
	 *
	 * @param expected Expected object to match.
	 */
	deepEqual(expected: object) {
		return addValidator(this, {
			message: (object, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(object)}\``,
			validator: object => isEqual(object, expected)
		});
	}

	/**
	 * Test an object to be of a specific instance type.
	 *
	 * @param instance The expected instance type of the object.
	 */
	instanceOf(instance: any) {
		return addValidator(this, {
			message: (object: any, label: string) => {
				let name = object.constructor.name;

				if (!name || name === 'Object') {
					name = JSON.stringify(object);
				}

				return `Expected ${label} \`${name}\` to be of type \`${instance.name}\``;
			},
			validator: object => object instanceof instance
		});
	}

	/**
	 * Test an object to include all the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.
	 *
	 * @param keys The keys that should be present in the object.
	 */
	hasKeys(...keys: string[]) {
		return addValidator(this, {
			message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
			validator: object => hasItems(
				{
					has: item => dotProp.has(object, item)
				},
				keys
			)
		});
	}

	/**
	 * Test an object to include any of the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.
	 *
	 * @param keys The keys that could be a key in the object.
	 */
	hasAnyKeys(...keys: string[]) {
		return addValidator(this, {
			message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
			validator: (object: any) => keys.some(key => dotProp.has(object, key))
		});
	}

	/**
	 * Test an object to match the `shape` partially. This means that it ignores unexpected properties. The shape comparison is deep.
	 *
	 * The shape is an object which describes how the tested object should look like. The keys are the same as the source object and the values are predicates.
	 *
	 * @param shape Shape to test the object against.
	 *
	 * @example
	 *
	 * import ow from 'ow';
	 *
	 * const object = {
	 * 	unicorn: '🦄',
	 * 	rainbow: '🌈'
	 * };
	 *
	 * ow(object, ow.object.partialShape({
	 * 	unicorn: ow.string
	 * }));
	 */
	partialShape(shape: Shape) {
		return addValidator(this, {
			// TODO: Improve this when message handling becomes smarter
			message: (_, label, message) => `${message.replace('Expected', 'Expected property')} in ${label}`,
			validator: object => partial(object, shape)
		});
	}

	/**
	 * Test an object to match the `shape` exactly. This means that will fail if it comes across unexpected properties. The shape comparison is deep.
	 *
	 * The shape is an object which describes how the tested object should look like. The keys are the same as the source object and the values are predicates.
	 *
	 * @param shape Shape to test the object against.
	 *
	 * @example
	 *
	 * import ow from 'ow';
	 *
	 * ow({unicorn: '🦄'}, ow.object.exactShape({
	 * 	unicorn: ow.string
	 * }));
	 */
	exactShape(shape: Shape) {
		return addValidator(this, {
			// TODO: Improve this when message handling becomes smarter
			message: (_, label, message) => `${message.replace('Expected', 'Expected property')} in ${label}`,
			validator: object => exact(object, shape)
		});
	}
}
