import { ArgumentError } from './lib/argument-error';
import { Predicate, validatorSymbol } from './lib/predicates/predicate';
import { StringPredicate } from './lib/predicates/string';

export interface Ow {
	(value: any, predicate: Predicate): void;
	/**
	 * Test the value to be a string.
	 */
	string: StringPredicate;
}

export const ow: Ow = Object.assign(
	(value: any, predicate: Predicate) => {
		for (const { validator, message } of predicate[validatorSymbol]) {
			if (!validator(value)) {
				// TODO: Modify the stack output to show the original `ow()` call instead of this `throw` statement
				throw new ArgumentError(message(value), ow);
			}
		}
	},
	{
		string: new StringPredicate()
	}
);
