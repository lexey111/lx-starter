import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {WaitBlock} from '../../../../../engine/ui-components/display/wait/wait-block-component';
import {Button} from '../../../../../engine/ui-components/general/button/button-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';
import {AppStateStore} from '../../../../store/@stores';
import {FakeLogin} from './fake-login-component';

export const FakeLogout: React.FC = observer(() => {
	const logout = useCallback(() => {
		AppStateStore.isAuthorizationInProgress = true;
		const delay = setTimeout(() => {
			AppStateStore.isAuthorizationInProgress = false;
			AppStateStore.isAuthorized = false;
			AppStateStore.userName = '';
			AppStateStore.userId = '';
			AppStateStore.userImageUrl = '';
		}, 2500);

		return () => {
			clearTimeout(delay);
		};
	}, []);

	if (!AppStateStore.isAuthorized) {
		return <FakeLogin/>;
	}

	return <div className={'fake-login-form'}>
		{AppStateStore.isAuthorizationInProgress && <WaitBlock message={'Logging out...'}/>}

		{!AppStateStore.isAuthorizationInProgress && <>
			<Title
				level={4}
				subTitle={'This is fake component so just click "Logout" button'}>
				Log out
			</Title>

			<div className={'line-centered'}>
				<Button type={'danger'} onClick={logout}>Logout</Button>
				<Button disabled={true}>Cancel</Button>
			</div>
		</>}
	</div>;
});
