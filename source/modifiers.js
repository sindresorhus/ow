import predicates from './predicates.js';

export default object => {
	Object.defineProperties(object, {
		optional: {
			get: () => predicates({}, {optional: true})
		}
	});
	return object;
};
