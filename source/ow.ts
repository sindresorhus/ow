import { ArgumentError } from './lib/argument-error';
import { Predicate, validatorSymbol } from './lib/predicates/predicate';
import { StringPredicate } from './lib/predicates/string';
import { NumberPredicate } from './lib/predicates/number';
import { BooleanPredicate } from './lib/predicates/boolean';

export interface Ow {
	(value: any, predicate: Predicate): void;
	/**
	 * Test the value to be a string.
	 */
	string: StringPredicate;
	/**
	 * Test the value to be a number.
	 */
	number: NumberPredicate;
	/**
	 * Test the value to be a boolean.
	 */
	boolean: BooleanPredicate;
}

const main = (value: any, predicate: Predicate) => {
	for (const { validator, message } of predicate[validatorSymbol]) {
		if (!validator(value)) {
			// TODO: Modify the stack output to show the original `ow()` call instead of this `throw` statement
			throw new ArgumentError(message(value), main);
		}
	}
};

Object.defineProperties(main, {
	string: {
		get: () => new StringPredicate()
	},
	number: {
		get: () => new NumberPredicate()
	},
	boolean: {
		get: () => new BooleanPredicate()
	}
});

export const ow = main as Ow;
