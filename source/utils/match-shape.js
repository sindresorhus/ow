import is from '@sindresorhus/is';
import test from '../test.js';
import {isPredicate} from '../predicates/base-predicate.js';
/**
Test if the `object` matches the `shape` partially.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
export function partial(object, shape, parent) {
	try {
		for (const key of Object.keys(shape)) {
			const label = parent ? `${parent}.${key}` : key;
			if (isPredicate(shape[key])) {
				test(object[key], label, shape[key]);
			} else if (is.plainObject(shape[key])) {
				const result = partial(object[key], shape[key], label);
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
Test if the `object` matches the `shape` exactly.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
export function exact(object, shape, parent, isArray) {
	try {
		const objectKeys = new Set(Object.keys(object));
		for (const key of Object.keys(shape)) {
			objectKeys.delete(key);
			const label = parent ? `${parent}.${key}` : key;
			if (isPredicate(shape[key])) {
				test(object[key], label, shape[key]);
			} else if (is.plainObject(shape[key])) {
				if (!Object.prototype.hasOwnProperty.call(object, key)) {
					return `Expected \`${label}\` to exist`;
				}

				const result = exact(object[key], shape[key], label);
				if (result !== true) {
					return result;
				}
			}
		}

		if (objectKeys.size > 0) {
			const firstKey = [...objectKeys.keys()][0];
			const label = parent ? `${parent}.${firstKey}` : firstKey;
			return `Did not expect ${isArray ? 'element' : 'property'} \`${label}\` to exist, got \`${object[firstKey]}\``;
		}

		return true;
	} catch (error) {
		return error.message;
	}
}
