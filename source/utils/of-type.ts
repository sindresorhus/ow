import ow from '..';
import test from '../test';
import {BasePredicate} from '../predicates/base-predicate';

/**
Test all the values in the collection against a provided predicate.
TODO After we migrate all usages of this function to specify the optional 'name' parameter, we can change the parameter to be required.

@hidden
@param source Source collection to test.
@param predicate Predicate to test every item in the source collection against.
@param name The name to call the collection of values, such as `values` or `keys`. If it is `undefined`, it uses the call stack to infer the label.
*/
export default <T>(source: IterableIterator<T> | Set<T> | T[], predicate: BasePredicate<T>, name?: string): boolean | string => {
	try {
		for (const item of source) {
			if (name) {
				test(item, name, predicate, false);
			} else {
				ow(item, predicate);
			}
		}

		return true;
	} catch (error: unknown) {
		return (error as Error).message;
	}
};
