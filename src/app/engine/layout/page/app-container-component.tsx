import React from 'react';
import {WaitBlock} from '../../ui-components/display/wait/wait-block-component';
import {AppStateStore} from '../../store/@stores';

type TAppContainerProps = {
	children?: any
};

export const AppContainer: React.FC<TAppContainerProps> = (props: TAppContainerProps) => {
	return <>
		{!AppStateStore.isAuthorized && AppStateStore.isAuthorizationInProgress && <WaitBlock/>}

		<div className={'app-container'}>
			{props.children}
		</div>
	</>;
};
