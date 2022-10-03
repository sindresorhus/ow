import is from '@sindresorhus/is';
import type {Predicate} from '../predicates/predicate.js';
import test from '../test.js';

const ofTypeDeep = (object: unknown, predicate: Predicate): boolean => {
	if (!is.plainObject(object)) {
		test(object, 'deep values', predicate, false);
		return true;
	}

	return Object.values(object).every(value => ofTypeDeep(value, predicate));
};

/**
Test all the values in the object against a provided predicate.

@hidden

@param predicate - Predicate to test every value in the given object against.
*/
const ofTypeDeepSafe = (object: unknown, predicate: Predicate): boolean | string => {
	try {
		return ofTypeDeep(object, predicate);
	} catch (error: unknown) {
		return (error as Error).message;
	}
};

export default ofTypeDeepSafe;
