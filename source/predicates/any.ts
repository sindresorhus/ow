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

	[testSymbol](value: T, main: Main, label: string | Function, stack: string): asserts value {
		const errors = new Map<string, string[]>();

		for (const predicate of this.predicates) {
			try {
				main(value, label, predicate, stack);
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

						// If they are present already, create a unique set with both current and new values.
						if (alreadyPresent) {
							errors.set(key, [...new Set([...alreadyPresent, ...value])]);
						} else {
							// Add the errors found as is to the map.
							errors.set(key, value);
						}
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
				stack,
				errors
			);
		}
	}
}
