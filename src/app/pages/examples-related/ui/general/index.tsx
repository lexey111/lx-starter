import React from 'react';
import {A} from '../../../../engine/ui-components/examples-related/a-component';
import {Src} from '../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../engine/ui-components/examples-related/tag-component';
import {Title} from '../../../../engine/ui-components/general/typography/title-component';
import {UiButtonsExample} from './ui-buttons-example';
import {UiIconsExample} from './ui-icons-example';
import {UiTitleExample} from './ui-title-example';

export const UiGeneralPage: React.FC = () => {
	return <>
		<Title>General components</Title>

		<Title nav={'title'} level={2}>Title</Title>
		<Src src={'src/app/engine/ui-components/general/typography/title-component.tsx'}/>

		<p>
			Very simple wrapper for <code>&lt;H1..6&gt;</code> tag, just to keep things semantic.
		</p>

		<p>
			See <Src src={'src/styles/ui/typography.less'} inline/> to alter the styles.
		</p>

		<UiTitleExample/>

		<Title nav={'navigation'} level={3}>In-page navigation</Title>

		<p>
			The <Tag>Title</Tag> component supports very useful feature: it could be an anchor
			of <i>in-page</i> navigation. You can see the in-page navigation panel at right.
		</p>

		<p>
			In-page navigation panel displayed when a) at least two navigation anchor presented and
			b) page width is more than
			960px (file <Src src={'src/styles/@media.less'} inline/>,
			variable <code>@app-media-inner-navigation-min</code>):
		</p>

		<SyntaxHighlight content={`<Title nav={'anchor_1'} level={1}>Some caption</Title>
...
...
<Title nav={'anchor_2'} level={2}>Some other caption</Title>
...
...
<Title nav={'anchor_3'} navTitle={'Short title'}>Long title which cannot fit to panel</Title>
...
`}/>

		<p>
			Be aware: anchor names must be valid hash parameters (no whitespaces, no <code>#</code> symbols). Also
			there is no internal check if an anchor name already has been registered because they could be
			created dynamically.
		</p>

		<Title nav={'buttons'} level={2}>Buttons</Title>
		<Src src={'src/app/engine/ui-components/general/button/button-component.tsx'}/>

		<p>
			Buttons in The Starter are just styled with CSS. Source file is <Src src={'src/styles/precompiled/buttons.less'} inline/>
		</p>
		<p>
			The component idea was inspired by <A href={'https://press-css.io/'}>Press.Css</A> project.
			Very lightweight and pretty configurable.
		</p>
		<UiButtonsExample/>

		<Title nav={'svg-icons'} level={2}>SVG Icons</Title>
		<Src src={'src/app/engine/ui-components/general/icons'}/>

		<p>
			Here I have a few icons needed (mostly) to display menu and spinners. They are just React SVG wrappers for some
			icons I've extracted from <A href={'https://ant.design/components/icon/'}>AntD</A> project.
		</p>

		<p>
			If you only need a couple (of dozen) more, you can add the desired icons the same way. If you need more -
			I would recommend to use <A href={'https://github.com/react-icons/react-icons'}>React-icons</A> NPM package,
			but feel free to use font-based approach like <A href={'https://fontawesome.com/'}>Font Awesome</A>.
		</p>

		<UiIconsExample/>

		<p>
			If you decide to use another SVGs or images, or fonts &mdash; do not forget to replace icons in
			internal components like menu, awaiters.
		</p>
	</>;
};
