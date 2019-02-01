'use strict';
const isNode = require("is-node");

if (process.env.NODE_ENV === 'production' && !isNode) {
	const shim = new Proxy(function () {}, {
		get: (obj, prop) => shim,
		apply: () => shim
	});

	module.exports = shim;
} else {
	module.exports = require("./index");
}
