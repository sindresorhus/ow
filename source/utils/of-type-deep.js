import is from '@sindresorhus/is';
import ow from '../index.js';

const ofTypeDeep = (object, predicate) => {
	if (!is.plainObject(object)) {
		ow(object, predicate);
		return true;
	}

	return Object.values(object).every(value => ofTypeDeep(value, predicate));
};

/**
Test all the values in the object against a provided predicate.

@hidden

@param predicate - Predicate to test every value in the given object against.
*/
export default (object, predicate) => {
	try {
		return ofTypeDeep(object, predicate);
	} catch (error) {
		return error.message;
	}
};
