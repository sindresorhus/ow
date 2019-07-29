import {ArgumentError} from '../argument-error';
import {BasePredicate, testSymbol} from './base-predicate';
import {PredicateOptions} from './predicate';
import {Main} from '..';

/**
@hidden
*/
export class AnyPredicate<T = unknown> implements BasePredicate<T> {
	constructor(
		private readonly predicates: BasePredicate[],
		private readonly options: PredicateOptions = {}
	) {}

	[testSymbol](value: T, main: Main, label: string | Function) {
		const errors = [
			'Any predicate failed with the following errors:'
		];

		for (const predicate of this.predicates) {
			try {
				main(value, label, predicate);
				return;
			} catch (error) {
				if (value === undefined && this.options.optional === true) {
					return;
				}

				errors.push(`- ${error.message}`);
			}
		}

		throw new ArgumentError(errors.join('\n'), main);
	}
}
