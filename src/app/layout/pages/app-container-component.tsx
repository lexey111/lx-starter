import React, {useEffect, useState} from 'react';
import {WaitBlock} from '../../components/ui/display/wait/wait-block-component';
import useLocationParams from '../../hooks/use-location-params';
import {AppStateStore} from '../../store/@store';

type TAppContainerProps = {
	children?: any
};

export const AppContainer: React.FC<TAppContainerProps> = (props: TAppContainerProps) => {
	const [hideBreadcrumbs, setHideBreadcrumbs] = useState(false);
	const location = useLocationParams();

	useEffect(() => {
		// refresh on location change: AppStateStore.currentRoute is not observable
		// and updating by route-to-store-component
		setHideBreadcrumbs(AppStateStore.currentRoute?.noBreadcrumbs === true);
	}, [location.url]);

	return <>
		{!AppStateStore.isAuthorized && AppStateStore.isAuthorizationInProgress && <WaitBlock/>}

		<div className={'app-container' + (hideBreadcrumbs ? ' no-breadcrumbs' : '')}>
			{props.children}
		</div>
	</>;
};
