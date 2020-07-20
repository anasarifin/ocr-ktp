const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
	const env = dotenv.config().parsed;
	const envKeys = Object.keys(env).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(env[next]);
		return prev;
	}, {});
	return {
		mode: "production",
		devtool: "source-map",
		entry: path.resolve(__dirname, "src", "index.js"),
		output: {
			filename: "[name].bundle.js",
			chunkFilename: "[name].bundle.js",
			path: path.resolve(__dirname, "build"),
			publicPath: "/",
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx"],
		},
		devServer: {
			historyApiFallback: true,
		},
		module: {
			rules: [
				{
					test: /\.s?[ac]ss$/,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.[jt]sx?$/,
					loader: "babel-loader",
					exclude: /node_modules/,
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react", "@babel/typescript"],
						plugins: ["inline-react-svg"],
						// plugins: ["@babel/proposal-class-properties", "@babel/proposal-object-rest-spread", "inline-react-svg"],
					},
				},
				{
					test: /\.(jpe?g|png|gif|eot|svg|ttf|woff|woff2)$/i,
					loader: "file-loader",
					options: {
						name: "[path][name].[ext]",
					},
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "src", "index.html"),
			}),
			new webpack.DefinePlugin(envKeys),
		],
	};
};
