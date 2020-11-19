import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import useLocationParams from '../../hooks/use-location-params';
import {getRouteByUrl, getRoutesByParentUrl} from '../../routing/route-mapping-utils';
import {TMenuItem, TMenuItems} from '../main-menu/main-menu-component';

export const PageSubmenu: React.FC = () => {
	const [listOfRoutes, setListOfRoutes] = useState<TMenuItems>([]);
	const location = useLocationParams();

	useEffect(() => {
		if (!location.url) {
			return;
		}
		const route = getRouteByUrl(location.url);
		if (!route) {
			return;
		}
		let routes: TMenuItems = [];

		if (route && route.breadcrumbs === 'sub-menu' && route._hasVisibleSubRoutes) {
			// This is the root of submenu. Include it + it's subroutes
			const subRoutes = getRoutesByParentUrl(route.url);
			routes = [route, ...subRoutes];
		}

		if (routes.length === 0) {
			// let's check the parent
			const parentRoute = getRouteByUrl(route._parentUrl);
			if (parentRoute && parentRoute.breadcrumbs === 'sub-menu' && parentRoute._hasVisibleSubRoutes) {
				// ok, submenu root - the parent of current route
				const subRoutes = getRoutesByParentUrl(parentRoute.url);
				routes = [parentRoute, ...subRoutes];
			}
		}

		if (routes) {
			// set active flag
			routes.forEach(item => {
				if (item) {
					item.isActive = item.url === route?.url;
				}
			});
		}
		setListOfRoutes(routes);
	}, [location.url]);

	return <div className={'page-submenu'}>
		{listOfRoutes?.map((route: TMenuItem) => {
			return <Link className={'page-submenu-item' + (route.isActive ? ' active' : '')} key={route.url} to={route.url}>
				{route.title}
			</Link>;
		})}
	</div>;
};
