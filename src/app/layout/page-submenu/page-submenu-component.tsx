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
		const subRoutes = getRoutesByParentUrl(location.url, true);
		const switchToParent = Boolean(subRoutes?.length === 0);
		// if current route is a single one, move one level up to it's parent, if any
		const parentRoute = route?._parentUrl ? getRouteByUrl(route?._parentUrl) : void 0;

		let routes: TMenuItems;
		if (switchToParent && parentRoute) {
			routes = [parentRoute, ...getRoutesByParentUrl(route?._parentUrl, true)]; // routes of current parent route
		} else {
			routes = [route, ...subRoutes]; // parent route + all 1st level siblings
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
