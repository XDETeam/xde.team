const path = require('path');

class TestWebpackPlugin {
	apply(compiler) {
		//console.log("TODO:Plugin compiler hooks", compiler.hooks);
		compiler.hooks.emit.tap("TestWebpackPlugin", (compilation, callback) => {
			console.log("TODO:compilation", compilation);
		})
	}
}

module.exports = (phase) => {
	return {
		webpack: (config, options) => {
			// Fixes npm packages that depend on `fs` module
			config.node = {
				fs: 'empty',
			}

			config.module.rules.push({
				test: /\.tsx/,
				use: [
					options.defaultLoaders.babel,
					{
						loader: path.resolve('lib/test-webpack-loader.js'),
						options: { a: 1, b: 'foo' }
					},
				],
			});

			config.plugins.push(new TestWebpackPlugin());

			//TODO:
			// if (isServer) {
			// 	require('./scripts/generate-sitemap')
			// }

			return config
		},

		//TODO:
		env: {

		}
	}
}
