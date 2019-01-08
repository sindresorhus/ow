export default typeof (global as any).__non_webpack_require__ === 'function'
	? (global as any).__non_webpack_require__
	: require;
