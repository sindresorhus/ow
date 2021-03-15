import {testSymbol} from './predicates/base-predicate.js';
/**
Validate the value against the provided predicate.

@hidden

@param value - Value to test.
@param label - Label which should be used in error messages.
@param predicate - Predicate to test to value against.
*/
export default function test(value, label, predicate) {
	predicate[testSymbol](value, test, label);
}
