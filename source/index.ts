import {ArgumentError} from './lib/argument-error';
import {Predicate, validatorSymbol} from './lib/predicates/predicate';
import {StringPredicate} from './lib/predicates/string';
import {NumberPredicate} from './lib/predicates/number';
import {BooleanPredicate} from './lib/predicates/boolean';
import {ArrayPredicate} from './lib/predicates/array';
import {DatePredicate} from './lib/predicates/date';
import {ErrorPredicate} from './lib/predicates/error';

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
	/**
	 * Test the value to be undefined.
	 */
	undefined: Predicate<undefined>;
	/**
	 * Test the value to be null.
	 */
	null: Predicate<null>;
	/**
	 * Test the value to be a Symbol.
	 */
	symbol: Predicate<Symbol>;
	/**
	 * Test the value to be an array.
	 */
	array: ArrayPredicate;
	/**
	 * Test the value to be a Date.
	 */
	date: DatePredicate;
	/**
	 * Test the value to be an Error.
	 */
	error: ErrorPredicate;
}

const main = (value: any, predicate: Predicate) => {
	for (const {validator, message} of predicate[validatorSymbol]) {
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
	},
	undefined: {
		get: () => new Predicate('undefined')
	},
	null: {
		get: () => new Predicate('null')
	},
	symbol: {
		get: () => new Predicate('symbol')
	},
	array: {
		get: () => new ArrayPredicate()
	},
	date: {
		get: () => new DatePredicate()
	},
	error: {
		get: () => new ErrorPredicate()
	}
});

export default main as Ow;
