import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {RedirectToLogin} from '../../routing/aux-components/redirect-to-login-component';
import {AppStateStore} from '../../../store/@stores';
import {IconSpinner} from '../../ui-components/general/icons/icon-spinner-component';

type TAppAuthPageProps = {
	children?: any
	className?: string
};

export const AppAuthPage: React.FC<TAppAuthPageProps> = observer((props: TAppAuthPageProps) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (!AppStateStore.isAuthorized && AppStateStore.isAuthorizationInProgress) {
		return <div className={'app-wait-page'}><IconSpinner/></div>;
	}

	if (!AppStateStore.isAuthorized && !AppStateStore.isAuthorizationInProgress) {
		return <RedirectToLogin/>;
	}

	return <div className={'app-page' + (props.className ? ' ' + props.className : '')}>{props?.children}</div>;
});
