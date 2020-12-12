import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {WaitBlock} from '../../../../../engine/ui-components/display/wait/wait-block-component';
import {Button} from '../../../../../engine/ui-components/general/button/button-component';
import {Icon} from '../../../../../engine/ui-components/general/icons/icon-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';
import {AppStateStore} from '../../../../store/@stores';
import {FakeLogout} from './fake-logout-component';

export const FakeLogin: React.FC = observer(() => {
	const login = useCallback(() => {
		AppStateStore.isAuthorizationInProgress = true;
		const delay = setTimeout(() => {
			AppStateStore.isAuthorizationInProgress = false;
			AppStateStore.isAuthorized = true;
			AppStateStore.userName = 'John Doe';
			AppStateStore.userId = '42';
			AppStateStore.userImageUrl = 'https://randomuser.me/api/portraits/lego/1.jpg';
		}, 2500);

		return () => {
			clearTimeout(delay);
		};
	}, []);

	if (AppStateStore.isAuthorized) {
		return <FakeLogout/>;
	}

	return <div className={'fake-login-form'}>
		<Title
			level={4}
			subTitle={'This is fake component so just click "Login" button'}>
			<Icon type={'login'}/> Please log in using your credentials
		</Title>

		{AppStateStore.isAuthorizationInProgress && <WaitBlock message={'Please wait, checking credentials...'}/>}

		{!AppStateStore.isAuthorized && !AppStateStore.isAuthorizationInProgress && <>
			<div className={'line'}>
				<input type={'text'} placeholder={'Login'}/>
			</div>
			<div className={'line'}>
				<input type={'password'} placeholder={'Password'}/>
			</div>
			<div className={'line'}>
				<Button type={'primary'} onClick={login}>Login</Button>
				<Button disabled={true}>Register</Button>
			</div>
		</>}
	</div>;
});
