/**
@hidden
*/
export const createAnyError = (...errors: readonly string[]) => {
	return [
		'Any predicate failed with the following errors:',
		...errors.map(error => `- ${error}`)
	].join('\n');
};
