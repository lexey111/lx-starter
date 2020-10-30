import {RouteMapping} from './route-mapping';
import {TRouteMappingItem} from './route-mapping-interface';

function testParametrizedItem(item: TRouteMappingItem, url: string): boolean {
	if (!item.url.includes(':')) {
		return false;
	}

	const idMatcher = item.url
		.split('/')
		.filter(entry => Boolean(entry))
		.reduce((prev, current) => {
			if (!current.includes(':')) {
				return prev + '\\/' + current;
			}
			return prev + '\\/(\\w+)';
		}, '^') + '$';

	return new RegExp(idMatcher).test(url);
}

export function getRouteByUrl(url: string): TRouteMappingItem | undefined {
	const currentLocation = RouteMapping.find(item => item.url === url);

	if (currentLocation) {
		return currentLocation;
	}

	// no direct match, try to find route/to/:param1/:param2...
	return RouteMapping.find(item => testParametrizedItem(item, url));
}

export function getRoutesByParentUrl(url: string | undefined, skipParametrized = false): TRouteMappingItem[] {
	if (!url) {
		return [];
	}
	const result = RouteMapping.filter(item => item._parentUrl === url);
	if (skipParametrized) {
		return result.filter(item => item.url.indexOf('/:') === -1);
	}
	return result;
}
