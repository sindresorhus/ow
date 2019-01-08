// Export `__non_webpack_require__` in Webpack environments to make sure it doesn't bundle modules loaded via this method
export default typeof (global as any).__non_webpack_require__ === 'function'
	? (global as any).__non_webpack_require__
	: eval('require'); // tslint:disable-line:no-eval
