import {ArgumentError} from '../argument-error';
import {Predicate} from './predicate';
import {BasePredicate, testSymbol} from './base-predicate';
import {Ow} from '../..';

/**
 * @hidden
 */
export class AnyPredicate<T> implements BasePredicate<T> {
	constructor(
		private readonly predicates: Predicate[]
	) {}

	// tslint:disable completed-docs
	[testSymbol](value: T, main: Ow) {
		const errors = [
			'Any predicate failed with the following errors:'
		];

		for (const predicate of this.predicates) {
			try {
				main(value, predicate);

				return;
			} catch (err) {
				errors.push(`- ${err.message}`);
			}
		}

		throw new ArgumentError(errors.join('\n'), main);
	}
}
