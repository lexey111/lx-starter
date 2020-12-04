import React from 'react';
import {A} from '../../../../../engine/ui-components/examples-related/a-component';
import {FileList} from '../../../../../engine/ui-components/examples-related/filelist-component';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

export const BuilderPage: React.FC = () => {
	return <>
		<Title>Builder</Title>
		<Title level={2} nav={'files'}>Overview</Title>
		<Src src={'/build/webpack.config.js'}/>

		<p>
			The entire build process is based on <A href={'https://webpack.js.org/'}>Webpack 5</A>.
		</p>

		<p>
			Config file is :
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

	</>;
};
