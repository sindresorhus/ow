import {ArgumentError} from '../argument-error';
import {BasePredicate, testSymbol} from './base-predicate';
import {Main} from '../..';

/**
 * @hidden
 */
export class AnyPredicate<T = any> implements BasePredicate<T> {
	constructor(
		private readonly predicates: BasePredicate[]
	) {}

	// tslint:disable completed-docs
	[testSymbol](value: T, main: Main, label: string | Function) {
		const errors = [
			'Any predicate failed with the following errors:'
		];

		for (const predicate of this.predicates) {
			try {
				main(value, label, predicate);

				return;
			} catch (err) {
				errors.push(`- ${err.message}`);
			}
		}

		throw new ArgumentError(errors.join('\n'), main);
	}
}
