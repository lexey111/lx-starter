import React from 'react';
import {Link} from 'react-router-dom';
import {A} from '../../../../../engine/ui-components/examples-related/a-component';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../../engine/ui-components/examples-related/tag-component';
import {Icon} from '../../../../../engine/ui-components/general/icons/icon-component';
import {IconsMap} from '../../../../../engine/ui-components/general/icons/icons-map';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';
import {UiButtonsExample} from './ui-buttons-example';
import {UiIconsExample} from './ui-icons-example';
import {UiTitleExample} from './ui-title-example';

export const UiGeneralPage: React.FC = () => {
	return <>
		<Title>General components</Title>

		<Title nav={'title'} level={2}>Title</Title>
		<Src src={'src/engine/ui-components/general/typography/title-component.tsx'}/>

		<p>
			Very simple wrapper for <code>&lt;H1..6&gt;</code> tag, just to keep things semantic.
		</p>

		<p>
			See <Src src={'src/styles/ui/typography.less'} inline/> to alter the styles.
		</p>

		<UiTitleExample/>

		<Title nav={'navigation'} level={3} navPadding={1}>In-page navigation</Title>

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
<Title nav={'anchor_2'} level={2} navPadding={1}>Some other caption</Title>
...
...
<Title nav={'anchor_3'} navTitle={'Short title'}>Long title which cannot fit to panel</Title>
...
<Title 
	nav={'anchor_4'} 
	navTitle={<span>Very <b>important</b> note</span>}>
	Some caption
</Title>
...
`}/>

		<p>
			Be aware: anchor names must be valid hash parameters (no whitespaces, no <code>#</code> symbols). Also
			there is no internal check if an anchor name already has been registered because they could be
			created dynamically.
		</p>

		<p>
			<Link to={'/layout/page-navigation'}>Read more</Link>.
		</p>

		<Title nav={'buttons'} level={2}>Buttons</Title>
		<Src src={'src/engine/ui-components/general/button/button-component.tsx'}/>

		<p>
			Buttons in The Starter are just styled with CSS. Source file is <Src src={'src/styles/precompiled/buttons.less'} inline/>
		</p>
		<p>
			The component idea was inspired by <A href={'https://press-css.io/'}>Press.Css</A> project.
			Very lightweight and pretty configurable.
		</p>
		<UiButtonsExample/>

		<Title
			nav={'svg_icons'}
			level={2}
			navTitle={<span><Icon type={'star'} style={{fill: 'red'}}/> <b>SVG Icons</b></span>}>
			SVG Icons
		</Title>
		<Src src={'src/engine/ui-components/general/icons'}/>

		<p>
			Here I have a few icons needed (mostly) to display menu and spinners. They are just React SVG wrappers for some
			icons I've extracted from <A href={'https://ant.design/components/icon/'}>AntD</A> project.
		</p>

		<p>
			If you only need a couple (of dozen) more, you can add the desired icons the same way. If you need more -
			I would recommend to use <A href={'https://github.com/react-icons/react-icons'}>React-icons</A> NPM package,
			but feel free to use font-based approach like <A href={'https://fontawesome.com/'}>Font Awesome</A>.
		</p>

		<Title nav={'mapping'} level={3} navPadding={1}>Icon mapping</Title>
		<p>
			All the icons content is placed into special data structure in <Src src={'src/engine/ui-components/general/icons/icons-map.tsx'} inline/>
		</p>

		<SyntaxHighlight
			title={'src/engine/ui-components/general/icons/icons-map.tsx'}
			content={`export type TIconMapExtendedEntry = {
	content: JSX.Element
	viewBox: string
	ownClass?: string
};

export type TIconMapEntry = Record<string, JSX.Element | TIconMapExtendedEntry>;

export const IconsMap: TIconMapEntry = {
	'arrow-left': <path
		d="M872 474H286..."/>,

	'arrow-right': <path
		d="M869 487.8L491..."/>,
...
}
`}/>
		<p>
			The <Tag>Icon</Tag> component uses data from mapping file and displays the appropriate content:
		</p>

		<SyntaxHighlight
			title={'src/engine/ui-components/general/icons/icon-component.tsx'}
			lines={4}
			content={`export const Icon: React.FC<TIconProps> = (props: TIconProps) => {
	const iconName = props.type ? props.type : 'unknown';

	const iconContent = IconsMap[iconName];

	if (!iconContent) {
		return <span className={'app-icon unknown-icon'}>?</span>; // icon not found
	}

	const viewBox = typeof iconContent['viewBox'] === 'string' 
		? iconContent['viewBox'] 
		: '64 64 896 896';
	const viewContent = typeof iconContent['content'] !== 'undefined'
		? iconContent['content'] as JSX.Element
		: iconContent as JSX.Element;
	const className = 'app-icon'
		+ (typeof iconContent['ownClass'] === 'string' ? ' ' + iconContent['ownClass'] : '')
		+ (props.className ? ' ' + props.className : '');

	return <svg
		viewBox={viewBox}
		focusable="false"
		className={className} style={{...props.style}}>
		{viewContent}
	</svg>;
};`}/>

		<p>
			Pretty straightforward. Of course, such approach is good for small or average number of icons, if you need
			huge amount of them &mdash; it should be replaced (or extended with dynamic/lazy loading).
		</p>

		<Title nav={'list_of_icons'} level={3} navPadding={1}>List of icons</Title>
		<p>
			List of available icons:
		</p>

		<pre className={'example-icon-list'}>
	<ul>
		{Object.keys(IconsMap).map(key => <li key={key}><Icon type={key}/>{key}</li>)}
	</ul>
</pre>

		<Title nav={'adding_the_icons'} level={3} navPadding={1}>Adding own icons</Title>
		<p>
			To add your own icon just get the content of your SVG (all inside <Tag>svg</Tag> tag) and put it into
			mapping file. If <code>viewBox</code> differs from standard "64 64 896 896" - use extended syntax:
		</p>

		<SyntaxHighlight
			content={`spinner: {
	content: <path
		d="M512 1024c-69..."/>,
	viewBox: '0 0 1024 1024',
	ownClass: 'spinner'
},`}/>

		<p>
			Reasonable idea is to keep keys alphabetically ordered.
		</p>

		<Title nav={'icons_available'} level={3} navPadding={1}>Icons example</Title>
		<p>(random colors)</p>

		<UiIconsExample/>

		<p>
			If you decide to use another SVGs or images, or fonts &mdash; do not forget to replace icons in
			internal components like menu, awaiters etc.
		</p>
	</>;
};
