const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const TerserPlugin = require('terser-webpack-plugin');

const stats = {
	assets: true,
	cached: false,
	cachedAssets: false,
	children: false,
	chunks: false,
	chunkModules: false,
	env: true,
	chunkOrigins: false,
	depth: false,
	entrypoints: true,
	errors: true,
	errorDetails: true,
	hash: false,
	modules: true,
	moduleTrace: false,
	performance: false,
	providedExports: false,
	publicPath: false,
	reasons: true,
	source: false,
	colors: true,
	timings: true,
	usedExports: false,
	version: true,
	warnings: true,
};

module.exports = (env, args) => {
	let isProduction = false;
	let analyze = false;

	if (args && args['mode'] === 'production') {
		isProduction = true;
		console.log('[ Production mode ]');
	} else {
		console.log('[ Development mode ]');
	}
	if (args && args['analyze']) {
		console.log('[ Bundle analyze mode ]');
		analyze = true;
	}

	const config = {
		entry: {
			'scripts/main': './src/index.tsx',
		},
		output: {
			path: path.resolve('./dist'),
		},
		performance: {
			hints: 'warning',
			maxAssetSize: isProduction ? 2000000 : 20000000, // int (in bytes),
			maxEntrypointSize: isProduction ? 2000000 : 20000000,
		},
		target: 'web',
		devtool: isProduction ? false : 'source-map',
		stats,
		optimization: {
			splitChunks: {
				chunks: 'all',
				cacheGroups: {
					react: { // always create react.js
						test: /[\\/]node_modules[\\/]react/,
						name: 'scripts/react',
						chunks: 'all',
						priority: 1,
						enforce: true,
					},
					vendor: { // always create vendor.js
						test: /[\\/]node_modules[\\/]/,
						name: 'scripts/vendors',
						chunks: 'all',
						priority: -1,
						enforce: true,
					},
				},
			},
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.txt'],
			mainFields: ['module', 'browser', 'main'],
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					// eslint
					enforce: 'pre',
					use: [
						{
							options: {
								eslintPath: require.resolve('eslint'),
							},
							loader: require.resolve('eslint-loader'),
						},
					],
					exclude: /node_modules/,
				},
				{
					test: /\.(jsx|tsx|js|ts)$/,
					// typescript
					exclude: /node_modules/,
					use: [{
						loader: 'ts-loader',
						options: {
							transpileOnly: !isProduction,
							silent: !isProduction,
							compilerOptions: {
								module: 'es2015',
								sourceMap: !isProduction,
								configFile: path.resolve('./tsconfig.json')
							},
						},
					}],
				},
				{
					test: /\.less$/i,
					type: 'asset/resource',
					generator: {
						filename: 'styles/app.css'
					},
					// app main .less file
					use: [
						{
							loader: 'less-loader',
							options:
								isProduction
									? {
										sourceMap: false,
										lessOptions: {
											minimize: {
												discardComments: {
													removeAll: true,
												},
											},
										}
									}
									: {
										sourceMap: true,
									},
						},
					],
				},
			],
		},
		watchOptions: {
			aggregateTimeout: 100,
			ignored: /node_modules/,
			poll: 300
		},
		devServer: {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
			contentBase: path.resolve('./dist'),
			historyApiFallback: true,
			compress: false,
			port: 3030,
		},
		plugins: [
			new webpack.DefinePlugin({
				PRODUCTION: JSON.stringify(isProduction),
			}),
			// new AntdDayjsWebpackPlugin({replaceMoment: true}),
			new CopyWebpackPlugin({
				patterns: [
					// static files to the site root folder (images, index.html and robots.txt)
					{
						from: './src/static/images/*',
						to() {
							return './images/[name].[ext]';
						},
					},
					{
						from: './src/static/*',
						to() {
							return './[name].[ext]';
						},
					},
				]
			}),
		],
	};

	if (isProduction && analyze) {
		config.plugins.push(new BundleAnalyzerPlugin())
	}

	if (isProduction) {
		config.optimization.minimize = true;
		config.optimization.minimizer = [
			new TerserPlugin(),
			new OptimizeCSSAssetsPlugin({}),
		]
	}

	return config;
};
