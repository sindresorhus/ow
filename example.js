'use strict';
const ow = require('./dist');

const fn = (input, options) => {
	ow(input, ow.string.minLength(10));

	// For objects, just an idea for now:
	// ow.many(options, {
	// 	tasks: ow.number.range(0, 10),
	// 	extras: ow.arrayOf(ow.number)
	// });
};

//fn(10);
//=> ArgumentError: Expected argument to be of type `string` but received type `number`

fn('foo');
//=> ArgumentError: Expected string length to be minimum 10
