import is from '@sindresorhus/is';
import ow from '..';
import {Predicate} from '../predicates/predicate';

const ofTypeDeep = (input: any, predicate: Predicate): boolean => {
	if (!is.plainObject(input)) {
		ow(input, predicate);

		return true;
	}

	return Object.keys(input).every(key => ofTypeDeep(input[key], predicate));
};

/**
 * Test all the values in the object against a provided predicate.
 *
 * @hidden
 * @param input Input object
 * @param predicate Predicate to test every value in the input object against.
 */
export default (input: any, predicate: Predicate): boolean | string => {
	try {
		return ofTypeDeep(input, predicate);
	} catch (error) {
		return error.message;
	}
};
