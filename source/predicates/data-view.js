import {Predicate} from './predicate.js';

export class DataViewPredicate extends Predicate {
	/**
	@hidden
	*/
	constructor(options) {
		super('DataView', options);
	}

	/**
	Test a DataView to have a specific byte length.

	@param byteLength - The byte length of the DataView.
	*/
	byteLength(byteLength) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
			validator: value => value.byteLength === byteLength
		});
	}

	/**
	Test a DataView to have a minimum byte length.

	@param byteLength - The minimum byte length of the DataView.
	*/
	minByteLength(byteLength) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
			validator: value => value.byteLength >= byteLength,
			negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``
		});
	}

	/**
	Test a DataView to have a minimum byte length.

	@param length - The minimum byte length of the DataView.
	*/
	maxByteLength(byteLength) {
		return this.addValidator({
			message: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
			validator: value => value.byteLength <= byteLength,
			negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``
		});
	}
}
