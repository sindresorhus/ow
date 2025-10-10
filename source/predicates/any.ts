import {ArgumentError} from '../argument-error.js';
import type {Main} from '../index.js';
import {generateArgumentErrorMessage} from '../utils/generate-argument-error-message.js';
import {
	testSymbol,
	optionalSymbol,
	nullableSymbol,
	type BasePredicate,
} from './base-predicate.js';
import type {PredicateOptions} from './predicate.js';

/**
@hidden
*/
export class AnyPredicate<T = unknown> implements BasePredicate<T> {
	[optionalSymbol]?: boolean;
	[nullableSymbol]?: boolean;
	private readonly predicates: BasePredicate[];
	private readonly options: PredicateOptions;

	constructor(
		predicates: BasePredicate[],
		options: PredicateOptions = {},
	) {
		this.predicates = predicates;
		this.options = options;
		// Expose optional status via symbol
		if (this.options.optional === true) {
			this[optionalSymbol] = true;
		}

		// Expose nullable status via symbol
		if (this.options.nullable === true) {
			this[nullableSymbol] = true;
		}
	}

	[testSymbol](value: T, main: Main, label: string | Function, idLabel: boolean): asserts value {
		const errors = new Map<string, Set<string>>();

		for (const predicate of this.predicates) {
			try {
				main(value, label, predicate, idLabel);
				return;
			} catch (error: unknown) {
				// Return early if value matches an allowed modifier
				if ((this.options.optional === true && value === undefined)
					|| (this.options.nullable === true && value === null)) {
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
				errors,
			);
		}
	}
}
