import is from '@sindresorhus/is';
import test from '../test';
import {isPredicate} from '../predicates/base-predicate';
import {BasePredicate} from '..';

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export interface Shape {
	[key: string]: BasePredicate | Shape;
}

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
		? X
		: S extends Shape
			? {
				[K in keyof S]: TypeOfShape<S[K]>
			}
			: never;

/**
Test if the `object` matches the `shape` partially.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
export function partial(object: Record<string, any>, shape: Shape, parent?: string): boolean | string {
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
export function exact(object: Record<string, any>, shape: Shape, parent?: string): boolean | string {
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
			const firstKey = [...objectKeys.keys()][0]!;
			const label = parent ? `${parent}.${firstKey}` : firstKey;
			return `Did not expect property \`${label}\` to exist, got \`${object[firstKey]}\``;
		}

		return true;
	} catch (error: unknown) {
		return (error as Error).message;
	}
}
