/* eslint-disable no-useless-concat */
import React from 'react';
import {SyntaxExampleTabs} from '../../../engine/components/ui/example-related/syntax-example-tabs';
import {SyntaxHighlight} from '../../../engine/components/ui/example-related/syntax-highlight';
import {Title} from '../../../engine/components/ui/general/typography/title-component';

const Markup = '<SyntaxHighlight content={' + '`' + `const a = 42;
await doSomethingWrong();
` + '`' + `}/>

<SyntaxHighlight language={'less'} lines={[2, 3]} content={` + '`' + `.some-class {
	color: red;
	margin: 0 0 2em 0;
}` + '`' + `}/>

<SyntaxHighlight language={'json'} content={` + '`' + `{
	value: 42,
	arr: [1, 2, 3]
}` + '`' + `}/>

<SyntaxHighlight language={'md'} content={` + '`' + `Header 1
===
Header2
---
Some text line
` + '`' + `}/>

<SyntaxHighlight language={'html'} content={` + '`' + `<body>
	<div>
		<p class="some-class">Some text</p>
	</div>
</body>
` + '`}/>';

const JSX = <>
	<Title level={5}>TSX (default)</Title>
	<SyntaxHighlight content={`const a = 42;
await doSomethingWrong();
`}/>
	<Title level={5}>LESS</Title>
	<SyntaxHighlight language={'less'} lines={[2, 3]} content={`.some-class {
	color: red;
	margin: 0 0 2em 0;
}`}/>
	<Title level={5}>JSON</Title>
	<SyntaxHighlight language={'json'} content={`{
	value: 42,
	arr: [1, 2, 3]
}`}/>
	<Title level={5}>Markdown</Title>
	<SyntaxHighlight language={'md'} content={`Header 1
===
Header2
---
Some text line
`}/>
	<Title level={5}>HTML</Title>
	<SyntaxHighlight language={'html'} content={`<body>
	<div>
		<p class="some-class">Some text</p>
	</div>
</body>
`}/>
</>;

const Syntax = `interface ISyntaxHighlightProps {
	language?: 'tsx' | 'md' | 'ts' | 'js' | 'jsx' | 'less' | 'sass' | 'css' | 'json' | 'html'
	content?: string
	title?: string
	lines?: Array<number> | number // lines to highlight
}

export const SyntaxHighlight = (
	{
		language = 'tsx',
		title = '',
		content = '',
		lines = []
	}: ISyntaxHighlightProps): JSX.Element => {`;

export const ExampleSyntaxHighlight: React.FC = () => {
	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		result={<div className={'example-tab'}>
			{JSX}
		</div>}
	/>;
};
