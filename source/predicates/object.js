import is from '@sindresorhus/is';
import dotProp from 'dot-prop';
import isEqual from 'lodash.isequal';
import hasItems from '../utils/has-items.js';
import ofType from '../utils/of-type.js';
import ofTypeDeep from '../utils/of-type-deep.js';
import {partial, exact} from '../utils/match-shape.js';
import {Predicate} from './predicate.js';

export class ObjectPredicate extends Predicate {
	/**
	@hidden
	*/
	constructor(options) {
		super('object', options);
	}

	/**
	Test if an Object is a plain object.
	*/
	get plain() {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to be a plain object`,
			validator: object => is.plainObject(object)
		});
	}

	/**
	Test an object to be empty.
	*/
	get empty() {
		return this.addValidator({
			message: (object, label) => `Expected ${label} to be empty, got \`${JSON.stringify(object)}\``,
			validator: object => Object.keys(object).length === 0
		});
	}

	/**
	Test an object to be not empty.
	*/
	get nonEmpty() {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to not be empty`,
			validator: object => Object.keys(object).length > 0
		});
	}

	/**
	Test all the values in the object to match the provided predicate.

	@param predicate - The predicate that should be applied against every value in the object.
	*/
	valuesOfType(predicate) {
		return this.addValidator({
			message: (_, label, error) => `(${label}) ${error}`,
			validator: object => ofType(Object.values(object), predicate)
		});
	}

	/**
	Test all the values in the object deeply to match the provided predicate.

	@param predicate - The predicate that should be applied against every value in the object.
	*/
	deepValuesOfType(predicate) {
		return this.addValidator({
			message: (_, label, error) => `(${label}) ${error}`,
			validator: object => ofTypeDeep(object, predicate)
		});
	}

	/**
	Test an object to be deeply equal to the provided object.

	@param expected - Expected object to match.
	*/
	deepEqual(expected) {
		return this.addValidator({
			message: (object, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(object)}\``,
			validator: object => isEqual(object, expected)
		});
	}

	/**
	Test an object to be of a specific instance type.

	@param instance - The expected instance type of the object.
	*/
	instanceOf(instance) {
		return this.addValidator({
			message: (object, label) => {
				let {name} = object.constructor;
				if (!name || name === 'Object') {
					name = JSON.stringify(object);
				}

				return `Expected ${label} \`${name}\` to be of type \`${instance.name}\``;
			},
			validator: object => object instanceof instance
		});
	}

	/**
	Test an object to include all the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.

	@param keys - The keys that should be present in the object.
	*/
	hasKeys(...keys) {
		return this.addValidator({
			message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
			validator: object => hasItems({
				has: item => dotProp.has(object, item)
			}, keys)
		});
	}

	/**
	Test an object to include any of the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.

	@param keys - The keys that could be a key in the object.
	*/
	hasAnyKeys(...keys) {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
			validator: object => keys.some(key => dotProp.has(object, key))
		});
	}

	/**
	Test an object to match the `shape` partially. This means that it ignores unexpected properties. The shape comparison is deep.

	The shape is an object which describes how the tested object should look like. The keys are the same as the source object and the values are predicates.

	@param shape - Shape to test the object against.

	@example
	```
	import ow from 'ow';

	const object = {
		unicorn: '🦄',
		rainbow: '🌈'
	};

	ow(object, ow.object.partialShape({
		unicorn: ow.string
	}));
	```
	*/
	partialShape(shape) {
		return this.addValidator({
			// TODO: Improve this when message handling becomes smarter
			message: (_, label, message) => `${message.replace('Expected', 'Expected property')} in ${label}`,
			validator: object => partial(object, shape)
		});
	}

	/**
	Test an object to match the `shape` exactly. This means that will fail if it comes across unexpected properties. The shape comparison is deep.

	The shape is an object which describes how the tested object should look like. The keys are the same as the source object and the values are predicates.

	@param shape - Shape to test the object against.

	@example
	```
	import ow from 'ow';

	ow({unicorn: '🦄'}, ow.object.exactShape({
		unicorn: ow.string
	}));
	```
	*/
	exactShape(shape) {
		return this.addValidator({
			// TODO: Improve this when message handling becomes smarter
			message: (_, label, message) => `${message.replace('Expected', 'Expected property')} in ${label}`,
			validator: object => exact(object, shape)
		});
	}
}
