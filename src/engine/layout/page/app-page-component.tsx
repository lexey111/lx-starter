import {observer} from 'mobx-react';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {AppPageNavigationStore, AppStateStore} from '../../../app/store/@stores';
import {HomeRoute, LoginRoute} from '../../routing/route-mapping';
import {WaitBlock} from '../../ui-components/display/wait/wait-block-component';

type TAppPageProps = {
	children?: any
	className?: string
};

export const AppPage: React.FC<TAppPageProps> = observer((props: TAppPageProps) => {
	const destroying = useRef(false);
	const [readyToRender, setReadyToRender] = useState(false);

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
		AppPageNavigationStore.reset();

		const delayedRender = setTimeout(() => {
			setReadyToRender(true);
		}, 100);
		//
		return () => {
			destroying.current = true;
			clearTimeout(delayedRender);
		};
	}, []);

	if (destroying.current) {
		return null;
	}

	if (!AppStateStore.isAuthorized && AppStateStore.isAuthorizationInProgress) {
		return <WaitBlock message={'Please wait, auth is in progress...'}/>;
	}

	if (!AppStateStore.isAuthorized && AppStateStore.currentRoute?.onlyWhenAuthorized) {
		if (LoginRoute && LoginRoute.url) {
			return <Redirect to={LoginRoute.url}/>;
		}
		return <Redirect to={HomeRoute.url}/>;
	}

	if (AppStateStore.isAuthorized && AppStateStore.currentRoute?.onlyWhenNotAuthorized) {
		return <Redirect to={HomeRoute.url}/>;
	}

	return <div className={'app-page' + (props.className ? ' ' + props.className : '')}>
		<div className={'app-page-content'}>
			{readyToRender && props.children}
		</div>
	</div>;
});
