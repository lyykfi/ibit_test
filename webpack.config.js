const path = require("path");
const webpack = require("webpack");
const assetsPath = path.join(__dirname, "build", "assets");
const publicPath = "assets/";
const { CheckerPlugin } = require('awesome-typescript-loader');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

const commonLoaders = [
	{
		test: /\.ts|\.tsx$/,
		use: 'awesome-typescript-loader'
	},
	{
		test: /\.html$/,
		use: 'html-loader'
	},
	{
		test: /\.less$/,
		use: extractLess.extract({
			fallback: 'style-loader',
			use: ['css-loader','less-loader']
		})
	},
	{
		test: /\.css$/,
		use: extractLess.extract({
			fallback: 'style-loader',
			use: ['css-loader']
		})
	},
	{
		test: /\.(ttf|eot|woff|woff2|svg)$/,
		use: [
			{
				loader: "file-loader",
				options: {
					publicPath: ""
				}
			}
		]
	},
];

const commonResolve = {
	extensions: ['.ts', '.tsx', '.js', '.jsx'],
	modules: [path.resolve(__dirname, 'src'), 'node_modules']
};

module.exports = [
	{
		name: "browser",
		entry: "./src/browser/index.tsx",
		output: {
			path: assetsPath,
			filename: "[hash].js",
			publicPath: publicPath
		},
		module: {
			rules: commonLoaders
		},
		resolve: commonResolve,
		plugins: [
			new CheckerPlugin(),
			new webpack.DefinePlugin({
				'process.env.PLATFORM': JSON.stringify('BROWSER'),
			}),
			new StatsWriterPlugin({
				filename: "stats.json"
			}),
			extractLess
		]
	},
	{
		name: "server-side rendering",
		entry: "./src/server/index.ts",
		target: "node",
		output: {
			path: assetsPath,
			filename: "../../build/server.generated.js",
			publicPath: publicPath,
			libraryTarget: "commonjs2"
		},
		externals: /^[a-z\-0-9]+$/,
		module: {
			rules: commonLoaders
		},
		resolve: commonResolve,
		plugins: [
			new CheckerPlugin(),
			new webpack.DefinePlugin({
				'process.env.PLATFORM': JSON.stringify('NODE'),
			}),
			extractLess
		]
	}
];