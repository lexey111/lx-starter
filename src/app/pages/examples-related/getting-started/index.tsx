import React from 'react';
import {FileList} from '../../../../engine/ui-components/examples-related/filelist-component';
import {Src} from '../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../engine/ui-components/examples-related/syntax-highlight';
import {Title} from '../../../../engine/ui-components/general/typography/title-component';

export const GettingStartedPage: React.FC = () => {
	return <>
		<Title nav={'getting_started'}>Getting started</Title>
		<p>
			After compilation application files are placed to <code>dist</code> folder.
		</p>

		<p>
			There are some ways to run different things in application.
		</p>

		<Title level={2} nav={'npm'}>NPM commands</Title>
		<Src src={'./package.json'}/>
		<p>
			The commands available for <code>npm run</code>:
		</p>

		<FileList asCommands={true} data={`
	analyze - runs webpack bundle analyzer
	build - builds app in production mode 
	build-dev - builds using dev mode, without minifications and source maps
	start - runs console server at localhost:3030
.
	clean - removes all the files from ./dist folder (internal method)
.
	dry - runs special script which removes all example code and prepares kit to use
.
	eslint - calls dedicated linting
	eslint-dump - displays the linting configuration
.
	test - runs unit tests
	coverage - displays the test coverage
	test-watch - runs the tests in watch mode
`}/>

		<Title level={2} nav={'batch'}>Batch shortcuts</Title>

		<p>
			Just to make things a bit more convenient for Windows users there are some <code>.bat</code> files
			located under the root folder. They could be easily executed on Mac/Linux as well (<code>chmod +x filename</code>)
			because they are just aliases for appropriate Npm commands.
		</p>
		<FileList asCommands={true} data={`build.analyze.bat - shows webpack-bundle-analyzer report 
build.dev.bat - runs build in development mode
build.prod.bat - runs build in production mode
start.devserver.bat - starts development server on localhost:3030
`}/>

		<Title level={2} nav={'dry'}>Preparing the kit to use</Title>

		<p>
			Here is special command, <code>npm run dry</code>, which will prepare the kit to use: removes all the
			example-related pages, routes, components, stores etc. and replaces Home and About page with simple stubs:
		</p>

		<SyntaxHighlight
			language={'html'}
			content={`npm run dry
  Welcome to Dry mode. This function will clean up all the example-related things from lxStarter kit.

  +----------------------------------------------------------------------+
  |  Warning! This operation cannot be undone, script will delete files. |
  +----------------------------------------------------------------------+

  Do you want to continue [y/N]? y

Starting cleanup...
  [OK] Checking item [Main folder] at ...
  [OK] Checking item [Example pages folder] at ...
  ...
  [OK] Removing folder [Example pages] at ...
  [OK] Replacing SiteMap
  [OK] Replacing Home page
  [OK] Replacing About page
  [OK] Replacing App State Store
  [RUN] Running lint...
  ...
  [RUN] Running build...
  ...
 +------------------------------------------------------------+
 |  Done. Please remove build/dry.js file manually,           |
 |  then do some cleanup in package.json:                     |
 |   - remove "dry" command from "scripts"                    |
 |   - remove "lorem-ipsum" dependency from "devDependencies" |
 |                                                            |
 |  Good luck!                                                |
 +------------------------------------------------------------+
`}/>

		<p>
			After script finish you could remove some rests mentioned above and start to use the project as a skeleton of
			your own code.
		</p>

		<p>
			So, the recommended way looks like:
		</p>

		<ol>
			<li>Clone the repository.</li>
			<li>Run <code>npm i</code>, then <code>npm run start</code> to run dev server.</li>
			<li>Explore the kit pages, read the documentation and source.</li>
			<li>Ensure the kit is worth to be used... or not.</li>
			<li>Copy its content to the root of your project (it has no sense to fork, but up to you).</li>
			<li>Run <code>npm run dry</code>.</li>
			<li>Begin to create your pages (in <code>src/app/pages</code>), components etc. using the engine and approach.</li>
			<li>Profit!</li>
		</ol>
	</>;
};
