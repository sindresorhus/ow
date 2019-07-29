import is from '@sindresorhus/is';
import {Predicate} from '../predicates/predicate';
import ow from '..';

const ofTypeDeep = (object: any, predicate: Predicate): boolean => {
	if (!is.plainObject(object)) {
		ow(object, predicate);

		return true;
	}

	return Object.keys(object).every(key => ofTypeDeep(object[key], predicate));
};

/**
Test all the values in the object against a provided predicate.

@hidden

@param predicate - Predicate to test every value in the given object against.
*/
export default (object: any, predicate: Predicate): boolean | string => {
	try {
		return ofTypeDeep(object, predicate);
	} catch (error) {
		return error.message;
	}
};
