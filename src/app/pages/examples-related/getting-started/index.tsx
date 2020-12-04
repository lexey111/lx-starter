import React from 'react';
import {FileList} from '../../../../engine/ui-components/examples-related/filelist-component';
import {Src} from '../../../../engine/ui-components/examples-related/src-component';
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
	build - builds app in production mode 
	analyze - runs webpack bundle analyzer
	build-dev - builds using dev mode, without minifications and source maps
	start - runs console server at localhost:3030
	clean - removes all the files from ./dist folder
	eslint - calls dedicated linting
	eslint-dump - displays the linting configuration
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
	</>;
};
