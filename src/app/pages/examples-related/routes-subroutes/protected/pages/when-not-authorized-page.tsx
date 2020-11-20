import React from 'react';
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

	</>;
};

