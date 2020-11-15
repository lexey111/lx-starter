/* eslint-disable no-useless-concat */
import React from 'react';
import {SyntaxExampleTabs} from '../../../../engine/ui-components/examples-related/syntax-example-tabs';

const Markup = `<SyntaxExampleTabs
	activePage={'syntax'}
	markup={` + '`' + `<some>
	<markup>
		as string literal
	</markup>
</some>` + '`' + `}
	code={` + '`' + `// some code
async function doSomething() {...}
` + '`' + `}
	data={{someData: 'data [Object] to be JSON.stringify(...)'}}
	styles={'.some-styles { }'}
	result={<p>The result, up to 6 tabs</p>}
	syntax={` + '`' + `// Syntax description
interface ISomeInterface {...}	
` + '`' + `}
/>`;

const JSX = <SyntaxExampleTabs
	activePage={'syntax'}
	markup={`<some>
	<markup>
		as string literal
	</markup>
</some>`}
	code={`// some code
async function doSomething() {...}
`}
	data={{someData: 'data [Object] to be JSON.stringify(...)'}}
	styles={'.some-styles { }'}
	result={<p>The result, up to 6 tabs</p>}
	syntax={`// Syntax description
interface ISomeInterface {...}	
`}
/>;

const Syntax = `type CSyntaxExampleProps = {
	markup?: any
	code?: any
	data?: any
	syntax?: any
	styles?: any
	result?: any
	activePage?: 'markup' | 'styles' | 'code' | 'data' | 'result' | 'syntax'
};
`;

export const ExampleSyntaxHighlightTabs: React.FC = () => {
	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		result={<div>
			{JSX}
		</div>}
	/>;
};
