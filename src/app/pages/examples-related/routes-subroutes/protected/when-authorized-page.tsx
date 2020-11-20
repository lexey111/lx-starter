import React from 'react';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';
import {FakeLogout} from './fake-logout-component';

export const ProtectedRoutesWhenAuthorizedPage: React.FC = () => {
	return <>
		<Title
			subTitle={'This page only available when user is authorized'}>
			Authorized
		</Title>

		<div className={'example-component-container'}>
			<FakeLogout/>
		</div>
	</>;
};

