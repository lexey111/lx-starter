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
			Pretty important component. It displays the <code>page</code> field component from routing config:
		</p>
		<SyntaxHighlight
			title={'src/config/app-site-map.tsx'}
			lines={5}
			content={`...
{
	title: 'In-page navigation',
	url: '/layout/page-navigation',
	page: <SomePage/>,
},
...`}/>
		<p>
			with very short animation (opacity through <code>@keyframes app-page-animation...</code>).
		</p>

		<p>
			It adds some wrappers. First, <Tag>AppContainer</Tag> (<Src src={'src/engine/layout/page/app-container-component.tsx'} inline/>) which
			adds the height observer.
		</p>

		<p>
			The observer is required because of <Link to={'/layout/top-panel'}>Top Panel</Link> component which could be
			fixed or scrollable so some logic involved to calculate container's position.
		</p>

		<Title nav={'auth'}>Auth guard</Title>
		<p>
			Next one is Authorization guard.
		</p>

		<SyntaxHighlight
			title={'src/engine/layout/page/app-page-component.tsx'}
			content={`if (!AppStateStore.isAuthorized && AppStateStore.isAuthorizationInProgress) {
	return <WaitBlock message={'Please wait, auth is in progress...'}/>;
}

if (!AppStateStore.isAuthorized && AppStateStore.currentRoute?.onlyWhenAuthorized) {
	if (LoginRoute && LoginRoute.url) {
		return <Redirect to={LoginRoute.url}/>;
	}
	return <Redirect to={HomeRoute.url}/>;
}

if (AppStateStore.isAuthorized && AppStateStore.currentRoute?.onlyWhenNotAuthorized) {
	return <Redirect to={HomeRoute.url}/>;
}
// render the page
`}/>
		<p>
			Very straightforward dispatcher:
		</p>

		<ol>
			<li>
				If authorization is in progress (pending request) &mdash; display <Link to={'/ui/display#block_wait'}>Block Wait</Link> until response come, then
				display the page.
			</li>
			<li>
				If page is <code>onlyWhenAuthorized</code> and no user is logged in
				(<code>AppStateStore.<b>isAuthorized</b></code> is <code>false</code>) &mdash; redirect to Login page.
				If no Login page present &mdash; redirect to Home page.
			</li>
			<li>
				If page is <code>onlyWhenNotAuthorized</code> and user is logged in &mdash; redirect to Home.
			</li>
			<li>
				If the requested page has nor <code>onlyWhenAuthorized</code> nor <code>onlyWhenNotAuthorized</code> specified &mdash;
				display the target page.
			</li>
		</ol>
	</>;
};
