import predicates, {Predicates} from './predicates.js';
import {BasePredicate} from './index.js';

type Optionalify<P> = P extends BasePredicate<infer X>
	? P & BasePredicate<X | undefined>
	: P;

export interface Modifiers {
	/**
	Make the following predicate optional so it doesn't fail when the value is `undefined`.
	*/
	readonly optional: {
		[K in keyof Predicates]: Optionalify<Predicates[K]>
	};
}

const modifiers = <T>(object: T): T & Modifiers => {
	Object.defineProperties(object, {
		optional: {
			get: (): Predicates => predicates({}, {optional: true}),
		},
	});

	return object as T & Modifiers;
};

export default modifiers;
