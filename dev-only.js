import ow from "./source/index.js";

export default (() => {
	if (process.env.NODE_ENV === 'production') {
		const shim = new Proxy((() => {}), {
			get: () => shim,
			apply: () => shim
		});

		return shim;
	} else {
		return ow;
	}
})();
