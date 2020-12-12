import React from 'react';
import {PageRelated} from '../../../../../engine/layout/page/related/app-page-related-component';
import {A} from '../../../../../engine/ui-components/examples-related/a-component';
import {FileList} from '../../../../../engine/ui-components/examples-related/filelist-component';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

const ConfigFile = '/build/webpack.config.js';

export const BuilderPage: React.FC = () => {
	return <>
		<Title>Builder</Title>
		<Title level={2} nav={'files'}>Overview</Title>
		<Src src={ConfigFile}/>

		<p>
			The entire build process is based on <A href={'https://webpack.js.org/'}>Webpack 5</A>.
		</p>

		<p>
			Config file is:
		</p>

		<FileList data={`[build]
		.eslint.json - ESLint config for builder itself
		jest.config.js - config for Jest. Files below are needed to set up the test environment
		mock-styles.ts
		mocks-global.ts
		test-setup.ts
		test-shim.ts
		webpack.config.js - !the config for Webpack
[src]
		...
`}/>
		<Title level={3} nav={'bundles'}>Bundles</Title>
		<p>
			Bundle structure is a bit nonstandard. I use dedicated <code>react.js</code> bundle for React and
			related,	<code>vendors.js</code> for all other 3rd parties, and <code>main.js</code> for the application itself:
		</p>

		<SyntaxHighlight
			title={ConfigFile}
			content={`const config = {
entry: {
	'scripts/main': './src/index.tsx',
},
output: {
	path: path.resolve('./dist'),
},
...
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
}...`}/>
		<p>
			The reasons for such configuration lie outside of the project: in some sub-projects I'm using microframework
			approach with independent applications for pages and some orchestration, and this config allows to reuse
			dependencies the most convenient way.
		</p>

		<Title level={3} nav={'entrypoint'}>Entry point</Title>
		<p>
			Application main entrypoint is <Src src={'src/index.tsx'} inline/>:
		</p>

		<SyntaxHighlight
			title={'src/index.tsx'}
			content={`import {configure} from 'mobx'; // only if you need to tune config
...
import {App} from './app/@app'; // main component

import {AppStateStore} from './app/store/@stores'; // init the store
import './styles/app.less'; // request the styles (for webpack)

declare const PRODUCTION: boolean; // webpack DefinePlugin, to get the build environment

configure({ // some optional config for MobX
	enforceActions: 'never',
	// enforceActions: 'always',
	// computedRequiresReaction: true,
	// reactionRequiresObservable: true,
	// observableRequiresReaction: true,
	disableErrorBoundaries: !PRODUCTION,
	isolateGlobalState: true,
	// reactionScheduler: (f): void => { // emulate slow actions
	// 	console.log('Running an event after a delay:', f);
	// 	setTimeout(f, 500);
	// }
});

...

const runApp = (): void => {
	// subscribe to page scroll (for breadcrumbs component)
	window.addEventListener('scroll', () => {
		...
	});

	ReactDOM.render(
		<App/>,
		document.getElementById('app-mount-point')
	);
};

runApp();
`}/>

		<Title level={3} nav={'styles'}>Styles</Title>
		<p>
			Application stylesheet, <code>app.css</code>, compiled from .LESS:
		</p>

		<SyntaxHighlight
			title={ConfigFile}
			content={`{
	test: /.less$/i,
	type: 'asset/resource',
	generator: {
		filename: 'styles/app.css'
	},
	// app main .less file
	use: [
		{
			loader: 'less-loader',
			...
		},
	],
},`}/>

		<Title level={3} nav={'index_html'} navTitle={'index.html'}>index.html and the assets</Title>
		<p>
			The <code>index.html</code> is processed with <code>CopyWebpackPlugin</code>. Well, "processed" is a bit too loud,
			just copied to output folder as well as other static content:
		</p>

		<SyntaxHighlight
			title={ConfigFile}
			content={`new CopyWebpackPlugin({
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
`}/>
		<p>
			<code>index.html</code>, then, serves the application bootstrapping phase (pre-React):
		</p>

		<SyntaxHighlight
			title={'src/static/index.html'}
			language={'html'}
			content={`<!DOCTYPE html>
...
	<!-- "Critical path" styles -->
	<style>
       body {
...
       }
	</style>
	<!-- main stylesheet -->
	<link rel="stylesheet" href="styles/app.css" media="all">
</head>

<body>
<script>
	// restoring stored theme and settings to avoid flickering
	const storedThemeCode = localStorage.getItem('app-theme') || '';
	...
	if (!storedThemeCode || storedThemeCode === 'default') {
		document.body.classList.add('theme-default');
	}

	const storedMenuPosition = localStorage.getItem('app-menu.position') === 'side' ? 'side' : 'top';
	document.body.classList.add('with-' + storedMenuPosition + '-menu');
</script>
<!-- mount points -->
<div id="app-full-screen-message"></div>
<div id="app-mount-point"></div>
<!-- load the JS bundles -->
<script src="scripts/react.js"></script>
<script src="scripts/vendors.js"></script>
<script src="scripts/main.js"></script>
</body>
</html>
`}/>
		<p>
			Static assets, like images, also just copied to <code>dist</code> folder and, then, could be used from, e.g., CSS:
		</p>

		<SyntaxHighlight content={'background-image: url("/images/crank_opt.png");'} language={'less'}/>

		<PageRelated items={[
			{
				url: '/ui/themes#under_the_hood',
				title: 'Themes'
			},
			{
				url: '/ui/display#fullscreen_wait',
				title: 'Pseudo modal'
			},
			{
				url: '/layout/main-menu#position',
				title: 'Main menu'
			},
		]}/>

	</>;
};
