import {Predicate} from './predicate';

export class ArrayBufferPredicate<T extends ArrayBufferLike> extends Predicate<T> {
	/**
	Test an array buffer to have a specific byte length.

	@param byteLength - The byte length of the array buffer.
	*/
	byteLength(byteLength: number): this {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
			validator: value => value.byteLength === byteLength
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
			negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``
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
			negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``
		});
	}
}
