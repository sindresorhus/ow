'use strict';
const path = require('path');
const webpack = require('webpack');
const license = require('license-webpack-plugin');
const AddModuleExportsPlugin = require('add-module-exports-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './source/index.ts',
	target: 'node',
	node: false,
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'index.js',
		libraryTarget: 'commonjs2'
	},
	resolve: {
		extensions: [
			'.ts',
			'.js'
		]
	},
	plugins: [
		new AddModuleExportsPlugin(),
		new license.LicenseWebpackPlugin({
			excludedPackageTest: packageName => ['webpack'].includes(packageName),
			outputFilename: 'licenses.txt'
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
