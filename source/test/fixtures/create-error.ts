/**
 * @hidden
 */
export const createAnyError = (...errors: string[]) => {
	return [
		'Any predicate failed with the following errors:',
		...errors.map(error => `- ${error}`)
	].join('\n');
};
