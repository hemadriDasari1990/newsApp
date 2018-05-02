var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        './index.js'
    ],
	 output: {
        path: 'public',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './public',
        hot: true
    },
    resolve: {
        root: path.resolve('./')
    },
    devtool: "#eval-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
	module:{
		loaders: [
			{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192' }
		]
	}
}
