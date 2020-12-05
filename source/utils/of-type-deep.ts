import is from '@sindresorhus/is';
import {Predicate} from '../predicates/predicate';
import ow from '..';

const ofTypeDeep = (object: unknown, predicate: Predicate): boolean => {
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
export default (object: unknown, predicate: Predicate): boolean | string => {
	try {
		return ofTypeDeep(object, predicate);
	} catch (error: unknown) {
		return (error as Error).message;
	}
};
