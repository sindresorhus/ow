import ow from '../index.js';

/**
Test all the values in the collection against a provided predicate.

@hidden
@param source Source collection to test.
@param predicate Predicate to test every item in the source collection against.
*/
export default (source, predicate) => {
	try {
		for (const item of source) {
			ow(item, predicate);
		}

		return true;
	} catch (error) {
		return error.message;
	}
};
