'use strict';
const webpack = require('webpack');
const license = require('license-webpack-plugin');
const AddAssetPlugin = require('add-asset-webpack-plugin');

module.exports = {
	entry: './source/index.ts',
	target: 'node',
	node: false,
	devtool: 'source-map',
	output: {
		filename: 'dist/ow.js',
		libraryTarget: 'commonjs2'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new AddAssetPlugin('dist/index.js', `
			'use strict';
			module.exports = require('./ow').default;
			module.exports.default = module.exports;
		`),
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
