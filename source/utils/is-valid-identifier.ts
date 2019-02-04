const identifierRegex = /^[a-z$_][a-z$_0-9]*$/i;

const reservedSet = new Set([
	'undefined',
	'null',
	'true',
	'false',
	'super',
	'this',
	'Infinity',
	'NaN'
]);

/**
 * Test if the string is a valid JavaScript identifier.
 *
 * @param input String to test.
 */
export default (input: string | undefined) => input && !reservedSet.has(input) && identifierRegex.test(input);
