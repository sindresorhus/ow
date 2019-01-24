import callsites from 'callsites';
import {inferLabel} from './lib/utils/infer-label';
import {Predicate} from './lib/predicates/predicate';
import {testSymbol, BasePredicate, isPredicate} from './lib/predicates/base-predicate';
import modifiers, {Modifiers} from './modifiers';
import predicates, {Predicates} from './predicates';

/**
 * @hidden
 */
export type Main = <T>(value: T, label: string | Function, predicate: BasePredicate<T>) => void;

export interface Ow extends Modifiers, Predicates {
	/**
	 * Test if the value matches the predicate. Throws an `ArgumentError` if the test fails.
	 *
	 * @param value Value to test.
	 * @param predicate Predicate to test against.
	 */
	<T>(value: T, predicate: BasePredicate<T>): void;
	/**
	 * Test if `value` matches the provided `predicate`. Throws an `ArgumentError` with the specified `label` if the test fails.
	 *
	 * @param value Value to test.
	 * @param label Label which should be used in error messages.
	 * @param predicate Predicate to test against.
	 */
	<T>(value: T, label: string, predicate: BasePredicate<T>): void;
	/**
	 * Returns `true` if the value matches the predicate, otherwise returns `false`.
	 *
	 * @param value Value to test.
	 * @param predicate Predicate to test against.
	 */
	isValid<T>(value: T, predicate: BasePredicate<T>): value is T;
	/**
	 * Create a reusable validator.
	 *
	 * @param predicate Predicate used in the validator function.
	 */
	create<T>(predicate: BasePredicate<T>): (value: T) => void;
	/**
	 * Create a reusable validator.
	 *
	 * @param label Label which should be used in error messages.
	 * @param predicate Predicate used in the validator function.
	 */
	create<T>(label: string, predicate: BasePredicate<T>): (value: T) => void;
}

const test = <T>(value: T, label: string | Function, predicate: BasePredicate<T>) => {
	predicate[testSymbol](value, test, label);
};

const ow = <T>(value: T, labelOrPredicate: any, predicate?: BasePredicate<T>) => {
	if (!isPredicate(labelOrPredicate) && typeof labelOrPredicate !== 'string') {
		throw new TypeError(`Expected second argument to be a predicate or a string, got \`${typeof labelOrPredicate}\``);
	}

	if (isPredicate(labelOrPredicate)) {
		// If the second argument is a predicate, infer the label
		const stackFrames = callsites();

		test(value, () => inferLabel(stackFrames), labelOrPredicate);

		return;
	}

	test(value, labelOrPredicate, predicate as BasePredicate<T>);
};

Object.defineProperties(ow, {
	isValid: {
		value: <T>(value: T, predicate: BasePredicate<T>) => {
			try {
				ow(value, predicate);
				return true;
			} catch {
				return false;
			}
		}
	},
	create: {
		value: <T>(labelOrPredicate: BasePredicate<T> | string | undefined, predicate?: BasePredicate<T>) => (value: T) => {
			if (isPredicate(labelOrPredicate)) {
				const stackFrames = callsites();

				test(value, () => inferLabel(stackFrames), labelOrPredicate);

				return;
			}

			test(value, labelOrPredicate as string, predicate as BasePredicate<T>);
		}
	}
});

export default predicates(modifiers(ow)) as Ow;
export {BasePredicate, Predicate};
export {
	StringPredicate,
	NumberPredicate,
	BooleanPredicate,
	ArrayPredicate,
	ObjectPredicate,
	DatePredicate,
	ErrorPredicate,
	MapPredicate,
	WeakMapPredicate,
	SetPredicate,
	WeakSetPredicate,
	AnyPredicate
} from './predicates';
