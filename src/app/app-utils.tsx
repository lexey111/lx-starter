import React from 'react';
import {Route} from 'react-router-dom';
import {AppPage} from '../engine/layout/page/app-page-component';
import {HomeRoute, RouteMapping} from '../engine/routing/route-mapping';
import {TRouteMappingItem} from '../engine/routing/route-mapping-interface';
import {AppTitle} from './@app';
import {AppStateStore} from './store/@stores';

function createRoute(routeItem: TRouteMappingItem) {
	return function renderRoute(props: { match: { params: Record<string, string> } }) {
		// actualize current page & route params in AppState Store
		AppStateStore.setCurrentRoute(routeItem, props.match.params);
		// set document title
		if (typeof routeItem.title === 'string') {
			document.title = AppTitle + ' | ' + routeItem.title;
		} else {
			document.title = AppTitle;
		}

		// return page wrapper
		return <AppPage className={routeItem.pageClass}>{routeItem.page}</AppPage>;
	};
}

const AppRoutes = RouteMapping
	.filter(routeItem => Boolean(routeItem.url))
	.map((routeItem: TRouteMappingItem, idx: number) => {
		return <Route
			exact path={routeItem.url}
			key={idx}
			render={createRoute(routeItem)}/>;
	});

// Push '/' mapping to the routes to serve 404 and /
AppRoutes.push(<Route
	path={'/'}
	key={AppRoutes.length}
	render={createRoute(HomeRoute)}/>);

export default AppRoutes;
