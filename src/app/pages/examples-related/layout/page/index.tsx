import React from 'react';
import {Link} from 'react-router-dom';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../../engine/ui-components/examples-related/tag-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

export const PagePage: React.FC = () => {
	return <>

		<Title nav={'overview'}>Page</Title>

		<Src src={'src/engine/layout/page/app-page-component.tsx'}/>
		<p>
			Pretty interesting component. It displays the <code>page</code> field component from routing config:
		</p>
		<SyntaxHighlight
			title={'src/config/app-site-map.tsx'}
			lines={5}
			content={`...
{
	title: 'In-page navigation',
	url: '/layout/page-navigation',
	page: <PageNavigationPage/>,
},
...`}/>
		<p>
			with very short animation (opacity, <code>@keyframes app-page-animation...</code>).
		</p>

		<p>
			But some wrappers present. First, <Tag>AppContainer</Tag> (<Src src={'src/engine/layout/page/app-container-component.tsx'} inline/>) which
			adds the height observer.
		</p>

		<p>
			The observer is required because of <Link to={'/layout/top-panel'}>Top Panel</Link> component which could be
			fixed or scrollable so some logic involved to calculate container's position.
		</p>

		<p>
			Next one is Authorization guard.
		</p>
	</>;
};
