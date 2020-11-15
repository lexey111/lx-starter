import React from 'react';
import {A} from '../../../../engine/ui-components/examples-related/a-component';
import {Src} from '../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../engine/ui-components/examples-related/tag-component';
import {Title} from '../../../../engine/ui-components/general/typography/title-component';
import {ExampleSyntaxHighlightTabs} from './example-highlighting-tabs';
import {ExampleLipsum} from './example-lipsum';
import {ExampleSyntaxHighlight} from './example-syntax-highlight';

export const UiExampleComponentsPage: React.FC = () => {
	return <>
		<Title nav={'examples_related'} navTitle={'Overview'}>Examples-related components</Title>

		<p>
			The component that are used to display different examples and documentation.
		</p>

		<p>They are localed in <Src
			src={'src/app/engine/ui-components/examples-related'}
			inline/> folder, so during the preparation to real usage feel free to remove entire folder and cleanup leftovers.
			E.g., stylesheet attachment:
		</p>

		<SyntaxHighlight
			title={'src/app/engine/ui-components/components.less'}
			language={'less'}
			content={'@import "examples-related/examples-related.less";'}/>

		<Title level={4} nav={'not_mentioned'}>Not mentioned</Title>
		<p>
			A few components are not mentioned here,
			like <Tag>Src</Tag>, <Tag>A</Tag>, <Tag>Tag</Tag> and <Tag>ThemeSwitcher</Tag>.
		</p>

		<p>
			They are unlikely could be reused in real application, but if you don't think so &mdash; you are welcome.
		</p>

		<hr/>

		<Title level={3} nav={'lorem_ipsum'}>Lorem Ipsum</Title>
		<Src src={'src/app/engine/ui-components/examples-related/lipsum.tsx'}/>
		<p>
			This is "Lorem Ipsum" text generator. It based on <A href={'https://github.com/knicklabs/lorem-ipsum.js#readme'}>lorem-ipsum</A> NPM package, so please
			do not forget to remove this dependency from <code>package.json</code> during the project preparation.
		</p>

		<ExampleLipsum/>

		<Title level={3} nav={'syntax_highlight'}>Syntax highlight</Title>
		<Src src={'src/app/engine/ui-components/examples-related/syntax-highlight.tsx'}/>
		<p>
			The component display "highlighted" text. It build upon <A href={'https://prismjs.com/'}>Prism.js</A> library and is able to display a lot of
			languages.
		</p>

		<p>
			Do not forget to remove 3rd-party files on preparation:
		</p>
		<ul>
			<li><Src inline src={'src/app/engine/ui-components/examples-related/prism.css'}/></li>
			<li><Src inline src={'src/app/engine/ui-components/examples-related/prism.js'}/></li>
		</ul>

		<ExampleSyntaxHighlight/>

		<Title level={3} nav={'example_tabs'}>Example tabs</Title>
		<Src src={'src/app/engine/ui-components/examples-related/syntax-example-tabs.tsx'}/>
		<p>
			A composition of <code>&lt;SyntaxHighlight&gt;</code> and <code>&lt;Tabs&gt;</code> components.
		</p>
		<p>
			Component is used to display such tabbed code examples:
		</p>

		<ExampleSyntaxHighlightTabs/>
	</>;
};
