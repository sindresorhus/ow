import * as is from '@sindresorhus/is';
import { ArgumentError } from './lib/argument-error';

import { Predicate } from './lib/predicates/predicate';
import { StringPredicate } from './lib/predicates/string';

export interface Ow {
	(value: any, predicate: Predicate): void;
	string?: StringPredicate;
}

export const ow: Ow = (value, predicate) => {
	for (const validator of predicate.context.validators) {
		const result = validator(value);
		if (result) {
			// TODO: Modify the stack output to show the original `ow()` call instead of this `throw` statement
			throw new ArgumentError(result, ow);
		}
	}
};

ow.string = new StringPredicate();
