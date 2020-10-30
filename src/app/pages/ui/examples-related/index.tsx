import React from 'react';
import {PageSubmenu} from '../../../layout/page-submenu/page-submenu-component';
import {A} from '../../../components/ui/example-related/a-component';
import {SourceFile} from '../../../components/ui/example-related/source-file-component';
import {SyntaxHighlight} from '../../../components/ui/example-related/syntax-highlight';
import {Title} from '../../../components/ui/general/typography/title-component';
import {ExampleSyntaxHighlightTabs} from './example-highlighting-tabs';
import {ExampleLipsum} from './example-lipsum';
import {ExampleSyntaxHighlight} from './example-syntax-highlight';

export const UiExampleComponentsPage: React.FC = () => {
	return <>
		<PageSubmenu/>
		<Title>Examples-related components</Title>

		<p>
			The component that are used to display different examples and documentation.
		</p>

		<p>They are localed in <SourceFile
			src={'src/app/components/ui/examples-related'}
			inline/> folder, so during the preparation to real usage feel free to remove entire folder and cleanup leftovers.
			E.g., stylesheet attachment:
		</p>

		<SyntaxHighlight
			title={'src/app/components/components.less'}
			language={'less'}
			content={'@import "ui/examples-related/examples-related.less";'}/>

		<Title level={4}>Not mentioned</Title>
		<p>
			A few components are not mentioned here,
			like <code>&lt;SourceFile&gt;</code>, <code>&lt;A&gt;</code> and <code>&lt;ThemeSwitcher&gt;</code>.
		</p>

		<p>
			They are unlikely could be reused in real application, but if you don't think so &mdash; you are welcome.
		</p>

		<hr/>

		<Title level={3}>Lorem Ipsum</Title>
		<SourceFile src={'src/app/components/ui/examples-related/lipsum.tsx'}/>
		<p>
			This is "Lorem Ipsum" text generator. It based on <A href={'https://github.com/knicklabs/lorem-ipsum.js#readme'}>lorem-ipsum</A> NPM package, so please
			do not forget to remove this dependency from <code>package.json</code> during the project preparation.
		</p>

		<ExampleLipsum/>

		<Title level={3}>Syntax highlight</Title>
		<SourceFile src={'src/app/components/ui/examples-related/syntax-highlight.tsx'}/>
		<p>
			The component display "highlighted" text. It build upon <A href={'https://prismjs.com/'}>Prism.js</A> library and is able to display a lot of
			languages.
		</p>

		<p>
			Do not forget to remove 3rd-party files on preparation:
		</p>
		<ul>
			<li><SourceFile inline src={'src/app/components/ui/examples-related/prism.css'}/></li>
			<li><SourceFile inline src={'src/app/components/ui/examples-related/prism.js'}/></li>
		</ul>

		<ExampleSyntaxHighlight/>

		<Title level={3}>Example tabs</Title>
		<SourceFile src={'src/app/components/ui/examples-related/syntax-example-tabs.tsx'}/>
		<p>
			A composition of <code>&lt;SyntaxHighlight&gt;</code> and <code>&lt;Tabs&gt;</code> components.
		</p>
		<p>
			Component is used to display such tabbed code examples:
		</p>

		<ExampleSyntaxHighlightTabs/>
	</>;
};
