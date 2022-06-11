import is from '@sindresorhus/is';
import {hasProperty} from 'dot-prop';
import isEqual from 'lodash.isequal';
import hasItems from '../utils/has-items.js';
import ofType from '../utils/of-type.js';
import ofTypeDeep from '../utils/of-type-deep.js';
import {partial, exact, Shape, TypeOfShape} from '../utils/match-shape.js';
import {Predicate, PredicateOptions} from './predicate.js';
import {BasePredicate} from './base-predicate.js';

export class ObjectPredicate<T extends object = object> extends Predicate<T> {
	/**
	@hidden
	*/
	constructor(options?: PredicateOptions) {
		super('object', options);
	}

	/**
	Test if an Object is a plain object.
	*/
	get plain(): this {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to be a plain object`,
			validator: object => is.plainObject(object),
		});
	}

	/**
	Test an object to be empty.
	*/
	get empty(): this {
		return this.addValidator({
			message: (object, label) => `Expected ${label} to be empty, got \`${JSON.stringify(object)}\``,
			validator: object => Object.keys(object).length === 0,
		});
	}

	/**
	Test an object to be not empty.
	*/
	get nonEmpty(): this {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to not be empty`,
			validator: object => Object.keys(object).length > 0,
		});
	}

	/**
	Test all the values in the object to match the provided predicate.

	@param predicate - The predicate that should be applied against every value in the object.
	*/
	valuesOfType<T>(predicate: BasePredicate<T>): this {
		return this.addValidator({
			message: (_, label, error) => `(${label}) ${error}`,
			validator: object => ofType(Object.values(object), 'values', predicate),
		});
	}

	/**
	Test all the values in the object deeply to match the provided predicate.

	@param predicate - The predicate that should be applied against every value in the object.
	*/
	deepValuesOfType<T>(predicate: Predicate<T>): this {
		return this.addValidator({
			message: (_, label, error) => `(${label}) ${error}`,
			validator: object => ofTypeDeep(object, predicate),
		});
	}

	/**
	Test an object to be deeply equal to the provided object.

	@param expected - Expected object to match.
	*/
	deepEqual(expected: object): this {
		return this.addValidator({
			message: (object, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(object)}\``,
			validator: object => isEqual(object, expected),
		});
	}

	/**
	Test an object to be of a specific instance type.

	@param instance - The expected instance type of the object.
	*/
	instanceOf(instance: Function): this {
		return this.addValidator({
			message(object: object, label: string) {
				let {name} = object?.constructor ?? {};

				if (!name || name === 'Object') {
					name = JSON.stringify(object);
				}

				return `Expected ${label} \`${name}\` to be of type \`${instance.name}\``;
			},
			validator: object => object instanceof instance,
		});
	}

	/**
	Test an object to include all the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.

	@param keys - The keys that should be present in the object.
	*/
	hasKeys(...keys: readonly string[]): this {
		return this.addValidator({
			message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
			validator: object => hasItems(
				{
					has: item => hasProperty(object, item),
				},
				keys,
			),
		});
	}

	/**
	Test an object to include any of the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.

	@param keys - The keys that could be a key in the object.
	*/
	hasAnyKeys(...keys: readonly string[]): this {
		return this.addValidator({
			message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
			validator: object => keys.some(key => hasProperty(object, key)),
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
	partialShape<S extends Shape = Shape>(shape: S): ObjectPredicate<TypeOfShape<S>> {
		return this.addValidator({
			// TODO: Improve this when message handling becomes smarter
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			message: (_, label, message) => `${message.replace('Expected', 'Expected property')} in ${label}`,
			validator: object => partial(object, shape),
		}) as unknown as ObjectPredicate<TypeOfShape<S>>;
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
	exactShape<S extends Shape = Shape>(shape: S): ObjectPredicate<TypeOfShape<S>> {
		// TODO [typescript@>=5] If higher-kinded types are supported natively by typescript, refactor `addValidator` to use them to avoid the usage of `any`. Otherwise, bump or remove this TODO.
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.addValidator({
			// TODO: Improve this when message handling becomes smarter
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			message: (_, label, message) => `${message.replace('Expected', 'Expected property')} in ${label}`,
			validator: object => exact(object, shape),
		}) as ObjectPredicate<any>;
	}
}

export type {Shape} from '../utils/match-shape.js';
