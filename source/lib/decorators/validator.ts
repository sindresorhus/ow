export function Validator() {
	return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		const prop = descriptor.value ? 'value' : 'get';

		const fn = descriptor[prop];

		descriptor[prop] = function(...args) {
			const validator = fn(...args);

			this.register(validator);

			return this;
		};
	};
}
