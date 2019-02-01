'use strict';
const ow = require('./main');

console.log(ow);

const logError = fn => {
	try {
		fn();
	} catch (err) {
		console.log(err.message);
	}
};

const fn = input => {
	ow(input, ow.string.minLength(10));
};

logError(() => {
	fn(10);
});

logError(() => {
	fn('foo');
});
