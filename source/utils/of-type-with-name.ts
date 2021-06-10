import test from '../test';
import {BasePredicate} from '../predicates/base-predicate';

/**
Test all the values in the collection against a provided predicate.

@hidden
@param source Source collection to test.
@param name The name to call the collection of values, such as "values", "keys".
@param predicate Predicate to test every item in the source collection against.
*/
export default <T>(source: IterableIterator<T> | Set<T> | T[], name: string, predicate: BasePredicate<T>): boolean | string => {
	try {
		for (const item of source) {
			test(item, name, predicate, false);
		}

		return true;
	} catch (error: unknown) {
		return (error as Error).message;
	}
};
