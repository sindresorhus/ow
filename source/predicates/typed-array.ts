import type {TypedArray} from '../typed-array.js';
import {Predicate, type PredicateOptions, type Validator} from './predicate.js';

export class TypedArrayPredicate<T extends TypedArray> extends Predicate<T> {
	private readonly typeName: string;

	/**
	@hidden
	*/
	constructor(type: string, options?: PredicateOptions, validators?: Array<Validator<T>>) {
		super(type, options, validators);
		this.typeName = type;
	}

	/**
	Test a typed array to have a specific byte length.

	@param byteLength - The byte length of the typed array.
	*/
	byteLength(byteLength: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
			validator: value => value.byteLength === byteLength,
		});
	}

	/**
	Test a typed array to have a minimum byte length.

	@param byteLength - The minimum byte length of the typed array.
	*/
	minByteLength(byteLength: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
			validator: value => value.byteLength >= byteLength,
			negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``,
		});
	}

	/**
	Test a typed array to have a minimum byte length.

	@param length - The minimum byte length of the typed array.
	*/
	maxByteLength(byteLength: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
			validator: value => value.byteLength <= byteLength,
			negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``,
		});
	}

	/**
	Test a typed array to have a specific length.

	@param length - The length of the typed array.
	*/
	length(length: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value.length}\``,
			validator: value => value.length === length,
		});
	}

	/**
	Test a typed array to have a minimum length.

	@param length - The minimum length of the typed array.
	*/
	minLength(length: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value.length}\``,
			validator: value => value.length >= length,
			negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value.length}\``,
		});
	}

	/**
	Test a typed array to have a maximum length.

	@param length - The maximum length of the typed array.
	*/
	maxLength(length: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value.length}\``,
			validator: value => value.length <= length,
			negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value.length}\``,
		});
	}

	/**
	@hidden
	*/
	protected override withValidators(validators: Array<Validator<T>>): this {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const Constructor = this.constructor as new (type: string, options?: PredicateOptions, validators?: Array<Validator<T>>) => this;
		return new Constructor(this.typeName, this.options, validators);
	}
}
