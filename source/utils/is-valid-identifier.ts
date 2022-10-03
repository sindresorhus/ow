const identifierRegex = /^[a-z$_][$\w]*$/i;

const reservedSet = new Set([
	'undefined',
	'null',
	'true',
	'false',
	'super',
	'this',
	'Infinity',
	'NaN',
]);

/**
Test if the string is a valid JavaScript identifier.

@param string - String to test.
*/
const isValidIdentifier = (string: string): boolean => Boolean(string?.length > 0 && !reservedSet.has(string) && identifierRegex.test(string));

export default isValidIdentifier;
