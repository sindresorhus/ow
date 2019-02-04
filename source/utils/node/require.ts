let customRequire: (packageName: string) => any;

try {
	// Export `__non_webpack_require__` in Webpack environments to make sure it doesn't bundle modules loaded via this method
	customRequire = (global as any).__non_webpack_require__ === 'function'
		? (global as any).__non_webpack_require__
		: eval('require'); // tslint:disable-line:no-eval
} catch {
	// Use a noop in case both `__non_webpack_require__` and `require` does not exist
	customRequire = () => {}; // tslint:disable-line:no-empty
}

export default customRequire;
