import {Predicate, type PredicateOptions, type Validator} from './predicate.js';

export class ArrayBufferPredicate<T extends ArrayBufferLike> extends Predicate<T> {
	private readonly typeName: string;

	/**
	@hidden
	*/
	constructor(type: string, options?: PredicateOptions, validators?: Array<Validator<T>>) {
		super(type, options, validators);
		this.typeName = type;
	}

	/**
	Test an array buffer to have a specific byte length.

	@param byteLength - The byte length of the array buffer.
	*/
	byteLength(byteLength: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
			validator: value => value.byteLength === byteLength,
		});
	}

	/**
	Test an array buffer to have a minimum byte length.

	@param byteLength - The minimum byte length of the array buffer.
	*/
	minByteLength(byteLength: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
			validator: value => value.byteLength >= byteLength,
			negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``,
		});
	}

	/**
	Test an array buffer to have a minimum byte length.

	@param length - The minimum byte length of the array buffer.
	*/
	maxByteLength(byteLength: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
			validator: value => value.byteLength <= byteLength,
			negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``,
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
