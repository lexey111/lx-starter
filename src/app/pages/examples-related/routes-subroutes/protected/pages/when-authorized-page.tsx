import React from 'react';
import {Link} from 'react-router-dom';
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
	</>;
};

