const webpack = require('webpack');

module.exports = {
	entry: {
		main: './src/assets/js/app.js',
	  },
	output: {
		path: __dirname,
		filename: 'bundle.js',
		publicPath: '/assets/js/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /(node_modules|bower_components)/,
				options: {
					compact: true,
				},
			},
			{
				test: /\.js$/,
				loader: 'imports-loader?define=>false',
			},
			{
				test: /\.(glsl|vs|fs|vert|frag)$/,
				exclude: /node_modules/,
				use: ['raw-loader', 'glslify-loader'],
			},
		],
	},
	resolve: {
		modules: ['./src/assets/js', 'node_modules'],
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true
		  })
	],
	mode: 'development',
	devtool: 'inline-cheap-module-source-map',
	optimization: {
		// We no not want to minimize our code.
		minimize: false
	},};
