/**
@hidden
*/
export const createAnyError = (...errors) => {
	return [
		'Any predicate failed with the following errors:',
		...errors.map(error => `  - ${error}`)
	].join('\n');
};

/**
@hidden
*/
export const createAnyPredicateError = (...allErrors) => {
	return [
		'Any predicate failed with the following errors:',
		...allErrors.map(([predicateName, errors]) => {
			return [
				`Errors from the "${predicateName}" predicate:`,
				...errors.map(entry => `  - ${entry}`)
			].join('\n');
		})
	].join('\n');
};
