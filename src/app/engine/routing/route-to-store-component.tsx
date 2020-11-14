import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {AppStateStore} from '../../store/@stores';

/**
 * Component performs synchronization between current URL and AppStateStore -
 * mostly for subscribers that need to react to route changes, like menu, breadcrumbs or
 * others which use route params
 *
 * @constructor
 */
export const RouteToStoreComponent: React.FC = () => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	const location = useLocation() as { pathname: string };

	useEffect(() => {
		if (AppStateStore.currentLocation !== location.pathname) {
			AppStateStore.setLocation(location.pathname);
			AppStateStore._topPanelHeight = 0;
		}
	}, [location]);

	return <div>
	</div>;
};
