import {Ow} from '../..';
import {Context} from '../predicates/predicate';

/**
 * Operator which makes the predicate optional.
 *
 * @hidden
 * @param ow Function to construct a new Ow instance.
 * @param context Current context object.
 */
export const optional = (ow: (context: Context<any>) => Ow, context?: Context<any>) => ow({
	...context,
	optional: true
});
