'use strict';
module.exports = {
	entry: './source/index.ts',
	target: 'node',
	devtool: 'sourcemap',
	output: {
		filename: 'dist/index.js',
		libraryTarget: 'commonjs2'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
				options: {
					declaration: true
				}
			}
		]
	}
};
