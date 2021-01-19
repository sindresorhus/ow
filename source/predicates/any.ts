import {ArgumentError} from '../argument-error';
import {BasePredicate, testSymbol} from './base-predicate';
import {PredicateOptions} from './predicate';
import {Main} from '..';
import {generateArgumentErrorMessage} from '../utils/generate-argument-error-message';

/**
@hidden
*/
export class AnyPredicate<T = unknown> implements BasePredicate<T> {
	constructor(
		private readonly predicates: BasePredicate[],
		private readonly options: PredicateOptions = {}
	) {}

	[testSymbol](value: T, main: Main, label: string | Function): asserts value {
		const errors = new Map<string, Set<string>>();

		for (const predicate of this.predicates) {
			try {
				main(value, label, predicate);
				return;
			} catch (error: unknown) {
				if (value === undefined && this.options.optional === true) {
					return;
				}

				// If we received an ArgumentError, then..
				if (error instanceof ArgumentError) {
					// Iterate through every error reported.
					for (const [key, value] of error.validationErrors.entries()) {
						// Get the current errors set, if any.
						const alreadyPresent = errors.get(key);

						// Add all errors under the same key
						errors.set(key, new Set([...alreadyPresent ?? [], ...value]));
					}
				}
			}
		}

		if (errors.size > 0) {
			// Generate the `error.message` property.
			const message = generateArgumentErrorMessage(errors, true);

			throw new ArgumentError(
				`Any predicate failed with the following errors:\n${message}`,
				main,
				errors
			);
		}
	}
}
