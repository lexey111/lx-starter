import React from 'react';
import {A} from '../../../components/ui/example-related/a-component';
import {SourceFile} from '../../../components/ui/example-related/source-file-component';
import {Title} from '../../../components/ui/general/typography/title-component';
import {UiButtonsExample} from './ui-buttons-example';
import {UiIconsExample} from './ui-icons-example';
import {UiTitleExample} from './ui-title-example';

export const UiGeneralPage: React.FC = () => {
	return <>
		<Title>General components</Title>

		<Title nav={'title'} level={2}>Title</Title>
		<SourceFile src={'src/app/components/ui/general/typography'}/>

		<p>
			Very simple wrapper for <code>&lt;H1..6&gt;</code> tag. Just to keep things semantic.
			Also has a couple of dubious features, though.
		</p>

		<p>
			See <SourceFile src={'src/styles/typography.less'} inline/> to alter the styles.
		</p>

		<UiTitleExample/>

		<Title nav={'buttons'} level={2}>Buttons</Title>
		<SourceFile src={'src/app/components/ui/general/button'}/>

		<p>
			Buttons in The Starter are just styled with CSS. Source file is <SourceFile src={'src/styles/precompiled/buttons.less'} inline/>
		</p>
		<p>
			The component idea was inspired by <A href={'https://press-css.io/'}>Press.Css</A> project.
			Very lightweight and pretty configurable.
		</p>
		<UiButtonsExample/>

		<Title nav={'svg-icons'} level={2}>SVG Icons</Title>
		<SourceFile src={'src/app/components/ui/general/icons'}/>

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
			If you decide to use another SVG/image do not forget to replace icons in internal components: menu, awaiters.
		</p>
	</>;
};
