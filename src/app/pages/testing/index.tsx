import React from 'react';
import {A} from '../../components/ui/example-related/a-component';
import {SourceFile} from '../../components/ui/example-related/source-file-component';
import {SyntaxHighlight} from '../../components/ui/example-related/syntax-highlight';
import {Title} from '../../components/ui/general/typography/title-component';

export const TestingPage = (): JSX.Element => {
	return <>
		<Title>Testing</Title>
		<Title level={3}>Disclaimer</Title>
		<p>
			I'm lazy, so &mdash; may be, yet &mdash; only few tests are here. Just to demonstrate how to use the technology
			and to check is configuration viable.
		</p>

		<Title level={2}>Overview</Title>

		<p>
			To run unit tests in the application, <A href={'https://jestjs.io/docs/en/getting-started'}>Jest</A> Testing
			Framework is attached.
		</p>

		<p>
			To check the source code I'm using <A href={'https://eslint.org/'}>ESLint</A> analyzer. Please pay attention:
			test files are excluded from linting because it is pretty often case to use 'invalid' input values or data types.
		</p>
		<p>
			You can alter that in <SourceFile src={'src/.eslintrc.json'} inline/>:
		</p>
		<SyntaxHighlight content={`"ignorePatterns": [
	"*-test.ts",
	"*-test.tsx"
],
`}/>

		<p>
			To check React components interaction and rendering <A href={'https://enzymejs.github.io/enzyme/'}>Enzyme</A> is used.
		</p>

		<p>
			There are some command to run tests in console:
		</p>

		<Title level={5}>Running (all) unit tests</Title>
		<SyntaxHighlight language={'bash'} content={'npm run test'}/>
		<p>
			To run particular test just add filename part right after the command:
		</p>
		<SyntaxHighlight
			language={'bash'}
			title={'Will execute src/app/routing/__tests__/route-flatten-test.ts'}
			content={'npm run test flatten'}/>

		<Title level={5}>Running unit tests and watch</Title>
		<SyntaxHighlight language={'bash'} content={'npm run test-watch'}/>
		<p>
			Filename and other Jests' CLI params are also supported.
		</p>

		<Title level={5}>Running coverage reporting</Title>
		<SyntaxHighlight language={'bash'} content={'npm run coverage'}/>

		<SyntaxHighlight
			language={'bash'}
			content={`---------------------------------------|---------|----------|---------|---------|-------------------
File                                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------------------|---------|----------|---------|---------|-------------------
All files                              |     100 |    96.36 |   95.24 |     100 |                   
 components/ui/data-entry/radio-button |     100 |    91.84 |   88.89 |     100 |                   
  radio-component.tsx                  |     100 |      100 |     100 |     100 |                   
  radio-group-component.tsx            |     100 |     91.3 |   85.71 |     100 | 91                
 routing                               |     100 |      100 |     100 |     100 |                   
  route-flatten.ts                     |     100 |      100 |     100 |     100 |                   
  route-mapping-utils.ts               |     100 |      100 |     100 |     100 |                   
 store/utils                           |     100 |      100 |     100 |     100 |                   
  store-utils.ts                       |     100 |      100 |     100 |     100 |                   
---------------------------------------|---------|----------|---------|---------|-------------------
Test Suites: 6 passed, 6 total
Tests:       76 passed, 76 total
Snapshots:   0 total
Time:        5.281 s, estimated 7 s
`}/>

		<Title level={5}>Linting with ESLint</Title>
		<SyntaxHighlight language={'bash'} content={'npm run eslint'}/>

		<Title level={5}>Print ESLint rules</Title>
		<SyntaxHighlight language={'bash'} content={'npm run eslint-dump'}/>

		<Title level={2}>How to create tests</Title>
		<p>
			You need to create file with name <code>some-name<b>-test.ts</b></code> (or .tsx). Test runner is configured
			to collect all the files in folders <code>__tests__</code> plus files named <code>...-test(.ts|.tsx)</code>.
		</p>

		<p>
			Config file is <SourceFile src={'build/jest.config.js'} inline/>. Extension '.ts' usually means unit tests and '.tsx' is
			for React-based testing.
		</p>

		<p>
			So for local tests it is recommended to create test file named after target file with adding '-test.ts(x)',
			and if the folder contains more than one test file &mdash; create <code>__tests__</code> subfolder.
		</p>

		<Title level={3}>Unit tests</Title>
		<p>
			To simplify, unit tests are needed to check something non-visual. Only Jest is used.
		</p>

		<p>
			There is an unit test which is used to check the setup:
		</p>

		<SyntaxHighlight
			title={'src/app/__tests__/simple-unit-test.ts'}
			content={`describe('Unit test', () => {
	it('Should check is 1 === 1', () => {
		expect(1).toEqual(1);
	});
});`}/>
		<Title level={3}>UI unit tests</Title>
		<p>
			In distinction with just plain unit tests, such kind of tests includes rendering of some markups:
		</p>

		<SyntaxHighlight
			title={'src/app/__tests__/simple-ui-test.ts'}
			content={`import {shallow} from 'enzyme';
import * as React from 'react';

describe('Test React components with Enzyme', () => {
	test('Hello world', () => {
		const wrapper = shallow(<p>Hello Jest!</p>);
		expect(wrapper.text()).toMatch('Hello Jest!');
	});
});`}/>

		<p>
			Writing such tests could be rather sophisticated, so reading
			the <A href={'https://enzymejs.github.io/enzyme/'}>documentation</A> is a really good idea.
		</p>

	</>;
};
