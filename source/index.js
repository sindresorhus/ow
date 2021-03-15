import callsites from 'callsites';
import {inferLabel} from './utils/infer-label.js';
import {Predicate} from './predicates/predicate.js';
import {isPredicate} from './predicates/base-predicate.js';
import modifiers from './modifiers.js';
import predicates from './predicates.js';
import test from './test.js';

const ow = (value, labelOrPredicate, predicate) => {
	if (!isPredicate(labelOrPredicate) && typeof labelOrPredicate !== 'string') {
		throw new TypeError(`Expected second argument to be a predicate or a string, got \`${typeof labelOrPredicate}\``);
	}

	if (isPredicate(labelOrPredicate)) {
		// If the second argument is a predicate, infer the label
		const stackFrames = callsites();
		test(value, () => inferLabel(stackFrames), labelOrPredicate);
		return;
	}

	test(value, labelOrPredicate, predicate);
};

Object.defineProperties(ow, {
	isValid: {
		value: (value, predicate) => {
			try {
				ow(value, predicate);
				return true;
			} catch {
				return false;
			}
		}
	},
	create: {
		value: (labelOrPredicate, predicate) => (value, label) => {
			if (isPredicate(labelOrPredicate)) {
				const stackFrames = callsites();
				test(value, label ?? (() => inferLabel(stackFrames)), labelOrPredicate);
				return;
			}

			test(value, label ?? (labelOrPredicate), predicate);
		}
	}
});

export default predicates(modifiers(ow));
export {Predicate};
export {StringPredicate, NumberPredicate, BooleanPredicate, ArrayPredicate, ObjectPredicate, DatePredicate, ErrorPredicate, MapPredicate, WeakMapPredicate, SetPredicate, WeakSetPredicate, TypedArrayPredicate, ArrayBufferPredicate, DataViewPredicate, AnyPredicate} from './predicates.js';
export {ArgumentError} from './argument-error.js';
