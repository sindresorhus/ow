import ow from './dist/index.js'

const logError = fn => {
	try {
		fn();
	} catch (error) {
		console.log(error.message);
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
