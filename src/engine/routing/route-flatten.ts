import {TRouteMappingItem} from './route-mapping-interface';

export type TFlattenedRoute = TRouteMappingItem & { parentUrl?: string };

/**
 * Transforms RouteMapping from nested structure to flat array
 * From
 * [
 *	   {
 *		   url: '/A'
 *	   },
 *	   {
 *		   url: '/B',
 *		   routes: [
 *			   {url: '/B.1'},
 *			   {url: '/B.2'},
 *		   ]
 *	   }
 * ]
 *
 * to
 *
 * [{url: 'A'}, {url: 'B'}, {url: '/B.1', _parentUrl: 'B'}, {url: '/B.2', _parentUrl: 'B'}]
 *
 * @param routes
 * @param parentUrl
 */
export function flattenRoutes(routes: Array<TFlattenedRoute>, parentUrl?: string): Array<TFlattenedRoute> {
	let result: Array<TFlattenedRoute> = [];

	if (!routes) {
		return result;
	}

	routes.forEach(route => {
		if (!route.routes || route.routes.length === 0) {
			result.push({
				url: route.url,
				title: route.title,
				subtitle: route.subtitle,
				icon: route.icon,
				page: route.page,
				topPanel: route.topPanel,
				isHomePage: route.isHomePage,
				isLoginPage: route.isLoginPage,
				onlyWhenAuthorized: route.onlyWhenAuthorized,
				onlyWhenNotAuthorized: route.onlyWhenNotAuthorized,
				breadcrumbs: route.breadcrumbs,
				isLateral: route.isLateral,
				pageClass: route.pageClass,
				_hasSubRoutes: false,
				_hasVisibleSubRoutes: false,
				_parentUrl: parentUrl
			});
			return;
		}
		const inner = flattenRoutes(route.routes, route.url);

		result.push({
			url: route.url,
			title: route.title,
			subtitle: route.subtitle,
			icon: route.icon,
			page: route.page,
			topPanel: route.topPanel,
			isHomePage: route.isHomePage,
			isLoginPage: route.isLoginPage,
			onlyWhenAuthorized: route.onlyWhenAuthorized,
			onlyWhenNotAuthorized: route.onlyWhenNotAuthorized,
			breadcrumbs: route.breadcrumbs,
			isLateral: route.isLateral,
			pageClass: route.pageClass,

			_hasSubRoutes: Boolean(route.routes) && route.routes.length > 0,
			_hasVisibleSubRoutes: route.routes && route.routes.filter(item => item.url?.indexOf('/:') === -1).length > 0,
			_parentUrl: parentUrl
		});

		result = result.concat(inner);
	});

	return result;
}
