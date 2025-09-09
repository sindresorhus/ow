import is from '@sindresorhus/is';
import test from '../test.js';
import {isPredicate, optionalSymbol} from '../predicates/base-predicate.js';
import type {BasePredicate} from '../index.js';

export type Shape = {
	[key: string]: BasePredicate | Shape;
};

/**
Extracts a regular type from a shape definition.

@example
```
const myShape = {
	foo: ow.string,
	bar: {
		baz: ow.boolean
	}
}

type X = TypeOfShape<typeof myShape> // {foo: string; bar: {baz: boolean}}
```

This is used in the `ow.object.partialShape(…)` and `ow.object.exactShape(…)` functions.
*/
export type TypeOfShape<S extends BasePredicate | Shape> =
	S extends BasePredicate<infer X>
		? X extends object ? X : never
		: S extends Shape
			? {[K in keyof S]: TypeOfShape<S[K]>}
			: never;

/**
Test if the `object` matches the `shape` partially.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
export function partial(object: Record<string, unknown>, shape: Shape, parent?: string): boolean | string {
	try {
		for (const key of Object.keys(shape)) {
			const label = parent ? `${parent}.${key}` : key;
			const shapeValue = shape[key];

			if (isPredicate(shapeValue)) {
				const predicate = shapeValue as BasePredicate;
				// Skip optional properties that don't exist in the object
				if (predicate[optionalSymbol] && !(key in object)) {
					continue;
				}

				test(object[key], label, predicate);
			} else if (is.plainObject(shapeValue)) {
				// Skip nested shapes if the key doesn't exist and it's optional
				// (though nested shapes themselves aren't predicates, so this is for consistency)
				if (!(key in object)) {
					continue;
				}

				const result = partial(object[key] as Record<string, unknown>, shapeValue, label);

				if (result !== true) {
					return result;
				}
			}
		}

		return true;
	} catch (error: unknown) {
		return (error as Error).message;
	}
}

/**
Test if the `object` matches the `shape` exactly.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
export function exact(object: Record<string, unknown>, shape: Shape, parent?: string, isArray?: boolean): boolean | string {
	try {
		const objectKeys = new Set<string>(Object.keys(object));

		for (const key of Object.keys(shape)) {
			objectKeys.delete(key);

			const label = parent ? `${parent}.${key}` : key;
			const shapeValue = shape[key];

			if (isPredicate(shapeValue)) {
				const predicate = shapeValue as BasePredicate;
				// Skip optional properties that don't exist in the object
				if (predicate[optionalSymbol] && !(key in object)) {
					continue;
				}

				test(object[key], label, predicate);
			} else if (is.plainObject(shapeValue)) {
				if (!Object.hasOwn(object, key)) {
					return `Expected \`${label}\` to exist`;
				}

				const result = exact(object[key] as Record<string, unknown>, shapeValue, label);

				if (result !== true) {
					return result;
				}
			}
		}

		if (objectKeys.size > 0) {
			const firstKey = [...objectKeys.keys()][0]!;
			const label = parent ? `${parent}.${firstKey}` : firstKey;
			return `Did not expect ${isArray ? 'element' : 'property'} \`${label}\` to exist, got \`${object[firstKey]}\``;
		}

		return true;
	} catch (error: unknown) {
		return (error as Error).message;
	}
}
