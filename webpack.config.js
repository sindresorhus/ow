'use strict';
const webpack = require('webpack');
const license = require('license-webpack-plugin');
const AddModuleExportsPlugin = require('add-module-exports-webpack-plugin');

module.exports = {
	entry: './source/index.ts',
	target: 'node',
	node: false,
	devtool: 'source-map',
	output: {
		filename: 'dist/index.js',
		libraryTarget: 'commonjs2'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new AddModuleExportsPlugin(),
		new license.LicenseWebpackPlugin({
			pattern: /.*/,
			outputFilename: 'dist/licenses.txt'
		})
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
