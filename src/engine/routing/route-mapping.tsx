import {AppSiteMap} from '../../config/app-site-map';
import {flattenRoutes} from './route-flatten';
import {TRouteMappingItem, TRouteMappingItems} from './route-mapping-interface';

// main app routing
export const RouteMapping: TRouteMappingItems = flattenRoutes(AppSiteMap);

export const HomeRoute: TRouteMappingItem = RouteMapping.find(item => item.isHomePage) as TRouteMappingItem; // suppress "undefined"

export const LoginRoute: TRouteMappingItem = RouteMapping.find(item => item.isLoginPage) as TRouteMappingItem; // suppress "undefined"

if (!HomeRoute) {
	throw new Error('No home route declared!');
}
