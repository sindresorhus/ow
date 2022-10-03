import {testSymbol, type BasePredicate} from './predicates/base-predicate.js';

/**
Validate the value against the provided predicate.

@hidden

@param value - Value to test.
@param label - Label which should be used in error messages.
@param predicate - Predicate to test to value against.
@param idLabel - If true, the label is a variable or type. Default: true.
*/
export default function test<T>(value: T, label: string | Function, predicate: BasePredicate<T>, idLabel = true): void {
	predicate[testSymbol](value, test, label, idLabel);
}
