const identifierRegex = /^[a-z$_][a-z$_\d]*$/i;

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
Test if the string is a valid JavaScript identifier.

@param string - String to test.
*/
export default (string: string | undefined) => string && !reservedSet.has(string) && identifierRegex.test(string);
