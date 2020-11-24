import React, {useState} from 'react';
import {PageRelated} from '../../../../../engine/layout/page/related/app-page-related-component';
import {Checkbox} from '../../../../../engine/ui-components/data-entry/checkbox/checkbox-component';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../../engine/ui-components/examples-related/tag-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

export const PageNavigationPage: React.FC = () => {
	const [showTitle, setShowTitle] = useState(true);

	return <>

		<Title nav={'overview'}>In-page navigation</Title>
		<Src src={'src/engine/layout/page/navigation/app-page-navigation-component.tsx'}/>

		<p>
			What is it? The panel with local links at right. If your browser window has width is more than 960px you should see it
			right now.
		</p>

		<p>
			If you're using <Tag>Title</Tag> components you can have in-page navigation for free.
		</p>

		<Title level={2} nav={'usage'}>Using the Title</Title>
		<p>
			<Tag>Title</Tag> component is the data provider for navigation anchors.
		</p>

		<SyntaxHighlight
			title={'src/engine/ui-components/general/typography/title-component.tsx'}
			lines={[4, 8, 9]}
			content={`type TTitleProps = {
	level?: 1 | 2 | 3 | 4 | 5 | 6
	subTitle?: string | JSX.Element
	navTitle?: string | JSX.Element
	className?: string
	bottomBorder?: boolean
	noTopMargin?: boolean
	nav?: string
	navPadding?: 1 | 2
	children?: any
};`}/>

		<p>
			Key point here is <i>(8)</i>. If component has <code>nav: string</code> defined it included into local in-page navigation.
		</p>

		<p>
			Optional property <code>navPadding</code> allows to set left padding (1 or 2) of particular item to mimic hierarchy.
		</p>

		<SyntaxHighlight
			content={`...
	<Title level={2} nav={'usage'}>Using the Title</Title>
	<p>
		<Tag>Title</Tag> component is the data provider for navigation anchors.
	</p>
...
`}/>
		<p>
			<code>nav</code> should be a string value without whitespaces and without some special symbols. It is used as a part of URL
			like <code>/https://site.com/layout/page-navigation<b>#usage</b></code>.
		</p>

		<p>
			The title of navigation item could be specified by optional <code>navTitle</code> <i>(2)</i> property, otherwise
			the <Tag>Title</Tag> content will be used.
		</p>
		<SyntaxHighlight
			content={`...
	<Title nav={'keypoint' navTitle='Key point'}>
		Long title description which has no chance to fit
	</Title>
...
	<Title 
		nav={'anchor_4'} 
		navTitle={<span>Very <b>important</b> note with formatting</span>}>
		Some caption
	</Title>
...
`}/>
		<Title level={2} nav={'how_it_works'}>How it works</Title>
		<p>
			Navigation is pretty dynamic thing. It reacts to page content changes and actualize own content, so links are
			dynamic. You can show/hide them.
		</p>

		<div className={'example-component-container'}>
			{showTitle && <Title level={3} nav={'dynamic_example'} navPadding={1}>Dynamic title</Title>}
			<div>
				<Checkbox checked={showTitle} onChange={setShowTitle}>Show the example title</Checkbox>
			</div>

			<SyntaxHighlight content={`const [showTitle, setShowTitle] = useState(true);
...
	{showTitle && <Title level={3} nav={'dynamic_example'} navPadding={1}>Dynamic title</Title>}
	<div>
		<Checkbox checked={showTitle} onChange={setShowTitle}>Show the example title</Checkbox>
	</div>
...
`}/>
		</div>

		<p>
			You don't need to do anything. If title is not displayed &mdash; navigation item isn't as well.
		</p>

		<Title level={2} nav={'highlighting'}>Highlighting</Title>
		<p>
			Navigation panel subscribed to scroll event and highlights currently visible (or partially visible) items.
			Moreover, it looks up to the content changes and re-sort the items depending of their Y-position on the page.
		</p>

		<Title level={2} nav={'waypoints'}>Waypoints</Title>
		<p>
			Waypoints are declared in:
		</p>

		<SyntaxHighlight
			title={'src/styles/@media.less'}
			content={`...
@app-media-inner-navigation: 1550px;
@app-media-inner-navigation-min: 960px;
...`}
			language={'less'}/>

		<p>
			If page width more than 1550px navigation will be displayed at right of the page. If it between 960 and 1550px &mdash;
			it will be embedded into page itself. If it less than 960px &mdash; navigation panel will be hidden out to save the space.
		</p>
		<PageRelated items={[
			{
				url: '/state-management/app-state',
				title: 'AppState Store'
			},
			{
				url: '/ui/general#navigation',
				title: 'Title component'
			},
		]}/>
	</>;
};
