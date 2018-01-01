import ow from '../..';
import {Predicate} from '../predicates/predicate';

/**
 * Test all the values in the collection against a provided predicate.
 *
 * @hidden
 * @param source Source collection to test.
 * @param predicate Predicate to test every item in the source collection against.
 */
export default (source: IterableIterator<any> | Set<any>, predicate: Predicate): boolean | string => {
	try {
		for (const item of source) {
			ow(item, predicate);
		}

		return true;
	} catch (err) {
		return err.message;
	}
};
