'use strict';
const webpack = require('webpack');

module.exports = {
	entry: './source/index.ts',
	target: 'node',
	devtool: 'source-map',
	output: {
		filename: 'dist/index.js',
		libraryTarget: 'commonjs2'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin()
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader'
			}
		]
	}
};
