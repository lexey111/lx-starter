import React from 'react';
import {Link} from 'react-router-dom';
import {PageRelated} from '../../../../../../engine/layout/page/related/app-page-related-component';
import {Title} from '../../../../../../engine/ui-components/general/typography/title-component';
import {FakeLogin} from '../fake-login-component';

export const ProtectedRoutesWhenNotAuthorizedPage: React.FC = () => {
	return <>
		<Title
			subTitle={'This page only available when user is NOT authorized'}>
			NOT Authorized
		</Title>

		<div className={'example-component-container'}>
			<FakeLogin/>
		</div>

		<p>
			After log in user will be redirected to Home page because route become unavailable (it is reachable only
			for NOT authenticated users) and therefore user should leave the page and the only page 100% available is Home.
		</p>

		<p>
			Read more:
		</p>

		<ul>
			<li>
				<Link to={'/layout/page#auth'}>Page guard</Link>
			</li>
			<li>
				<Link to={'/login'}>Login page and Login component</Link>
			</li>
		</ul>
		<PageRelated items={[
			{
				url: '/routing/protected-routes',
				title: 'Protected routes'
			},
			{
				url: '/login',
				title: 'Login form'
			},
			{
				url: '/layout/page',
				title: 'Page & Auth'
			},
			{
				url: '/layout/main-menu',
				title: 'Main menu'
			},
			{
				url: '/layout/page-submenu',
				title: 'Page sub-menu'
			},
			{
				url: '/layout/breadcrumbs',
				title: 'Breadcrumbs'
			},
			{
				url: '/state-management/app-state',
				title: 'AppState Store'
			},
			{
				url: '/routing/example-pages',
				title: 'Example pages'
			},
			{
				url: '/routing/example-pages/list-of-articles',
				title: 'List of Articles'
			},
		]}/>
	</>;
};

