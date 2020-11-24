import React from 'react';
import {PageRelated} from '../../../../../engine/layout/page/related/app-page-related-component';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../../engine/ui-components/examples-related/tag-component';
import {Icon} from '../../../../../engine/ui-components/general/icons/icon-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

const ComponentSrc = 'src/engine/layout/page/related/app-page-related-component.tsx';

export const PageRelatedPage: React.FC = () => {
	return <>

		<Title nav={'overview'}>Related links</Title>
		<Src src={ComponentSrc}/>

		<p>
			Very simple component to display the links to "related" pages &mdash; you can see them at bottom right.
		</p>

		<Title nav={'syntax'} level={3}>Syntax</Title>

		<SyntaxHighlight
			title={'src/engine/layout/page/related/app-page-related-component.tsx'}
			content={`type TPageRelatedItem = {
	url?: string
	title: string | JSX.Element
};

type TPageRelatedProps = {
	items: TPageRelatedItem[]
	title? : string | JSX.Element
};
`}/>

		<Title nav={'how_it_works'} level={3}>How it works</Title>
		<p>
			As usual, implementation of the component is pretty straightforward. First, component's container is placed into markup:
		</p>

		<SyntaxHighlight
			title={'src/app/@app.tsx'}
			lines={7}
			content={`return <Router>
	...
	<AppTopPanel/>
	<AppTopFrame>...</AppTopFrame>
	<AppContainer>...</AppContainer>

	<AppPageRelatedPanel/>

	<AppFooter/>
</Router>;`}/>

		<p>
			The <Tag>AppPageRelatedPanel</Tag> component just adds some <code>div</code>s:
		</p>

		<SyntaxHighlight
			title={'src/engine/layout/page/related/app-page-related-panel.tsx'}
			lines={3}
			content={`export const AppPageRelatedPanel: React.FC = () => {
	return <div className={'app-page-related'}>
		<div className={'app-page-related-content'} id={'app-page-related-portal'}></div>
	</div>;
};`}/>
		<p>
			Then <Tag>PageRelated</Tag> component just puts its content to the Portal.
		</p>

		<SyntaxHighlight
			title={ComponentSrc}
			lines={[8, 18, 20]}
			content={`const container = useRef<HTMLDivElement>(null);
const [visible, setVisible] = useState(false);

useEffect(() => {
	if (container.current) {
		return;
	}
	container.current = document.getElementById('app-page-related-portal');
	if (container.current) {
		setVisible(true);
	}
});

if (!visible || props.items.length === 0) {
	return null;
}

return ReactDOM.createPortal(
	<>...content...</>,
	container.current
);`}/>

		<Title nav={'usage'} level={3}>Usage</Title>
		<p>
			Just place somewhere on page something like that:
		</p>

		<SyntaxHighlight
			content={`<PageRelated items={[
	{
		url: '/layout',
		title: 'Layout'
	},
	{
		url: '/layout/page',
		title: 'Page component'
	},
	{
		url: '/layout/page-navigation',
		title: 'In-page navigation'
	},
	{
		title: <><Icon type={'star'}/> Related</>
	}
]}/>`}/>

		<PageRelated items={[
			{
				url: '/layout',
				title: 'Layout'
			},
			{
				url: '/layout/page',
				title: 'Page component'
			},
			{
				url: '/layout/page-navigation',
				title: 'In-page navigation'
			},
			{
				title: <><Icon type={'star'}/> &nbsp; Related</>
			}
		]}/>
	</>;
};
