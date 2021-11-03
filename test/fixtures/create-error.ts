/**
@hidden
*/
export const createAnyError = (...errors: readonly string[]): string => [
	'Any predicate failed with the following errors:',
	...errors.map(error => `  - ${error}`),
].join('\n');

/**
@hidden
*/
export const createAnyPredicateError = (...allErrors: Array<[predicateName: string, errors: string[]]>): string => [
	'Any predicate failed with the following errors:',
	...allErrors.map(([predicateName, errors]) => [
		`Errors from the "${predicateName}" predicate:`,
		...errors.map(entry => `  - ${entry}`),
	].join('\n')),
].join('\n');
