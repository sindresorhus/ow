import is from '@sindresorhus/is';
import {BasePredicate} from '..';
import test from '../test';
import {isPredicate} from '../predicates/base-predicate';

export interface Shape {
	[key: string]: BasePredicate | Shape;
}

/**
 * Test if the `object` matches the `shape` partially.
 *
 * @hidden
 * @param object Object to test against the provided shape.
 * @param shape Shape to test the object against.
 * @param parent Name of the parent property.
 */
export function partial(object: {[key: string]: any}, shape: Shape, parent?: string): boolean | string {
	try {
		for (const key of Object.keys(shape)) {
			const label = parent ? `${parent}.${key}` : key;

			if (isPredicate(shape[key])) {
				test(object[key], label, shape[key] as BasePredicate);
			} else if (is.plainObject(shape[key])) {
				const result = partial(object[key], shape[key] as Shape, label);

				if (result !== true) {
					return result;
				}
			}
		}

		return true;
	} catch (error) {
		return error.message;
	}
}

/**
 * Test if the `object` matches the `shape` exactly.
 *
 * @hidden
 * @param object Object to test against the provided shape.
 * @param shape Shape to test the object against.
 * @param parent Name of the parent property.
 */
export function exact(object: {[key: string]: any}, shape: Shape, parent?: string): boolean | string {
	try {
		const objectKeys = new Set<string>(Object.keys(object));

		for (const key of Object.keys(shape)) {
			objectKeys.delete(key);

			const label = parent ? `${parent}.${key}` : key;

			if (isPredicate(shape[key])) {
				test(object[key], label, shape[key] as BasePredicate);
			} else if (is.plainObject(shape[key])) {
				if (!Object.prototype.hasOwnProperty.call(object, key)) {
					return `Expected \`${label}\` to exist`;
				}
				const result = exact(object[key], shape[key] as Shape, label);

				if (result !== true) {
					return result;
				}
			}
		}

		if (objectKeys.size > 0) {
			const key = Array.from(objectKeys.keys())[0];

			const label = parent ? `${parent}.${key}` : key;

			return `Did not expect property \`${label}\` to exist, got \`${object[key]}\``;
		}

		return true;
	} catch (error) {
		return error.message;
	}
}
