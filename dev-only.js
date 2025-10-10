let ow;
if (globalThis.process.env.NODE_ENV === 'production') { // eslint-disable-line n/prefer-global/process
	const shim = new Proxy((() => {}), {
		get: () => shim,
		apply: () => shim,
	});

	ow = shim;
} else {
	ow = await import('./dist/index.js');
}

export default ow;
