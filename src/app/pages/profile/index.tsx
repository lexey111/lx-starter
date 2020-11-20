import React from 'react';
import {Title} from '../../../engine/ui-components/general/typography/title-component';
import {FakeLogout} from '../examples-related/routes-subroutes/protected/fake-logout-component';

export const ProfilePage: React.FC = () => {
	return <>
		<Title level={1} subTitle={'current user data'}>Profile page</Title>
		<p>
			Fake data to mimic real Profile page.
		</p>

		<div className={'example-component-container'}>
			<FakeLogout/>
		</div>
	</>;
};

