'use strict';
const webpack = require('webpack');
const license = require('license-webpack-plugin');
const GenerateAssetPlugin = require('generate-asset-webpack-plugin');

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
		new GenerateAssetPlugin({
            filename: 'dist/index.js',
            fn: (compilation, cb) => {
                cb(null, `'use strict';\nmodule.exports = require('./ow').default;\nmodule.exports.default = module.exports;\n`);
            }
        }),
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
