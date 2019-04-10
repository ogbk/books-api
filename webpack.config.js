var webpack = require('webpack');

module.exports = {
	entry: __dirname+"/app/components/index.js",
	output:{
		path: __dirname+"/public", filename: 'bundle.js'
	},
	module:{
		rules: [
			{	test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules)/ },
			{ test: /\.sass$/, loader: 'style-loader!css-loader!sass-loader' },
			{	test: /\.(txt|jl)$/i, loader: 'raw-loader' },
		]
	}
}
