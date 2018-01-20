const path = require("path");
const assetsPath = path.join(__dirname, "public", "assets");
const publicPath = "assets/";

const commonLoaders = [
	{ test: /\.js$/, loader: "jsx-loader" },
	{ test: /\.png$/, loader: "url-loader" },
	{ test: /\.jpg$/, loader: "file-loader" },
];
 
module.exports = [
	{
		name: "browser",
		entry: "./app/entry.js",
		output: {
			path: assetsPath,
			filename: "[hash].js",
			publicPath: publicPath
		},
		module: {
			loaders: commonLoaders.concat([
				{
					test: /\.tsx?$/,
					loader: 'awesome-typescript-loader'
				}
			])
		}
	},
	{
		name: "server-side rendering",
		entry: "./src/server/index.ts",
		target: "node",
		output: {
			path: assetsPath,
			filename: "../../server/page.generated.js",
			publicPath: publicPath,
			libraryTarget: "commonjs2"
		},
		externals: /^[a-z\-0-9]+$/
	}
];