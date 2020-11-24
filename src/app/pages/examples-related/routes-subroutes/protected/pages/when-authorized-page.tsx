import React from 'react';
import {Link} from 'react-router-dom';
import {PageRelated} from '../../../../../../engine/layout/page/related/app-page-related-component';
import {Title} from '../../../../../../engine/ui-components/general/typography/title-component';
import {FakeLogout} from '../fake-logout-component';

export const ProtectedRoutesWhenAuthorizedPage: React.FC = () => {
	return <>
		<Title
			subTitle={'This page only available when user is authorized'}>
			Authorized
		</Title>

		<div className={'example-component-container'}>
			<FakeLogout/>
		</div>

		<p>
			After log out user will be redirected to Login page because route become unavailable (it is reachable only
			for authenticated users) and therefore user should enter his credentials again.
		</p>

		<p>
			Read more:
		</p>

		<ul>
			<li>
				<Link to={'/layout/page#auth'}>Page guard</Link>
			</li>
			<li>
				<Link to={'/profile'}>Profile page and Logout component</Link>
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

