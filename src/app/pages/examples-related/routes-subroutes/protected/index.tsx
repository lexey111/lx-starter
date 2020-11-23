import {observer} from 'mobx-react';
import React from 'react';
import {Link} from 'react-router-dom';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../../engine/ui-components/examples-related/tag-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';
import {AppStateStore} from '../../../../store/@stores';
import {FakeLogin} from './fake-login-component';

export const ProtectedRoutesPage: React.FC = observer(() => {
	return <>
		<Title nav={'protected_routes'}>Protected routes</Title>
		<p>
			Protected routes are the routes configured with one of
		</p>

		<SyntaxHighlight
			title={'src/config/app-site-map.tsx'}
			content={`onlyWhenAuthorized?: boolean
onlyWhenNotAuthorized?: boolean
`}/>
		<p>
			properties. They react to
		</p>

		<SyntaxHighlight
			title={'src/app/store/app-state/app-state-store.ts'}
			content={`isAuthorized: boolean // is current user logged in
isAuthorizationInProgress: boolean
`}/>
		<p>
			observable fields which reflect the current authorization state.
		</p>

		<Title level={3} nav={'login'}>Fake login form</Title>

		<div className={'example-component-container'}>
			<FakeLogin/>
		</div>

		<Title level={3} nav={'how_it_works'}>How it works</Title>
		<p>
			Application uses <Src src={'src/engine/layout/page/app-page-component.tsx'} inline/> component to wrap up all the
			content of the page client area:
		</p>

		<SyntaxHighlight
			title={'src/app/@app.tsx'}
			lines={7}
			content={`<Route
	exact path={routeItem.url}
	key={idx}
	render={(props: { match: { params: Record<string, string> } }) => {
...
		// return page wrapper
		return <AppPage className={routeItem.pageClass}>{routeItem.page}</AppPage>;
	}}/>`}/>

		<p>
			<Tag>AppPage</Tag> component contains the logic that, depends on current state of <code>AppStateStore.isAuthorized</code>, decides what should be
			displayed: target page or Login, or Home etc.
		</p>

		<p>
			Read more:
		</p>

		<ul>
			<li>
				<Link to={'/layout/page#auth'}>App page: auth guard</Link>
			</li>
			<li>
				<Link to={'/state-management/app-state'}>AppState Store</Link>
			</li>
			<li>
				<Link to={'/profile'}>Profile page and Logout component</Link>
				{!AppStateStore.isAuthorized ? ' (unavailable now, need to log in - will redirect to Login page)' : ''}
			</li>
			<li>
				<Link to={'/login'}>Login page and Login component</Link>
				{AppStateStore.isAuthorized ? ' (unavailable now, need to log out - will redirect to Home page)' : ''}
			</li>
		</ul>

	</>;
});

