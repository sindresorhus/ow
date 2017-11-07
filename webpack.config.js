'use strict';
const webpack = require('webpack');
const license = require('license-webpack-plugin');
const BannerWebpackPlugin = require('banner-webpack-plugin');

module.exports = {
	entry: './source/index.ts',
	target: 'node',
	devtool: 'source-map',
	output: {
		filename: 'dist/index.js',
		libraryTarget: 'var',
		library: 'ow'
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		// For CommonJS default export support
		new BannerWebpackPlugin({
			chunks: {
				'main': {
					afterContent: `module.exports = ow;\nmodule.exports['default'] = ow;\n//# sourceMappingURL=index.js.map`,
					removeAfter: '//# sourceMappingURL=index.js.map'
				}
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
