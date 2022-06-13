let ow;
if (process.env.NODE_ENV === 'production') {
	const shim = new Proxy((() => {}), {
		get: () => shim,
		apply: () => shim,
	});

	ow = shim;
} else {
	ow = await import('./dist/index.js');
}

export default ow;
