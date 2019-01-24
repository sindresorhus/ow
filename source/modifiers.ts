import {Predicates, default as predicates} from './predicates';

/**
 * @hidden
 */
export interface Modifiers {
	/**
	 * Make the following predicate optional so it doesn't fail when the value is `undefined`.
	 */
	readonly optional: Predicates;
}

export default <T>(object: T): T & Modifiers => {
	Object.defineProperties(object, {
		optional: {
			get: () => predicates({}, {optional: true})
		}
	});

	return object as T & Modifiers;
};
