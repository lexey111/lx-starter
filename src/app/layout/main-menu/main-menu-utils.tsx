import React from 'react';
import {AppSiteMap} from '../../../config/app-site-map';
import {TRouteMappingItem, TRouteMappingItems} from '../../routing/route-mapping-interface';
import {getRouteByUrl} from '../../routing/route-mapping-utils';
import {TMenuItems} from './main-menu-component';
import {MainMenuItem} from './menu-items/main-menu-item-component';

function filterByMenuType(items: TMenuItems, forLateral: boolean): TMenuItems {
	return items.filter(item => {
		if (item.isLateral === true && forLateral) {
			return true;
		}
		if (item.isLateral !== true && !forLateral) {
			return true;
		}
		return false;
	});
}

function filterByLoggedIn(items: TRouteMappingItems, isLoggedIn: boolean): TRouteMappingItems {
	return items.filter(item => {
		if (item.onlyWhenLoggedIn === true && !isLoggedIn) {
			return false;
		}
		if (item.onlyWhenLoggedOut === true && isLoggedIn) {
			return false;
		}
		return true;
	});
}

function mapActive(items: TRouteMappingItems, firstLevelActiveUrl: string): TMenuItems {
	return items.map(item => ({...item, isActive: item.url === firstLevelActiveUrl}));
}

export function calculateMenuParts(locationUrl: string, isLoggedIn: boolean): [TMenuItems, TMenuItems, string] {
	const parts = locationUrl.split('/').filter(item => Boolean(item));
	const firstLevelActiveItem = getRouteByUrl(parts.length ? '/' + parts[0] : '');
	const firstLevelActiveUrl = firstLevelActiveItem?.url || '/home';

	const firstLevelItems = mapActive(filterByLoggedIn(AppSiteMap, isLoggedIn), firstLevelActiveUrl);
	const primaryMenu = filterByMenuType(firstLevelItems, false);
	const lateralMenu = filterByMenuType(firstLevelItems, true);

	return [primaryMenu, lateralMenu, firstLevelActiveUrl];
}

export function createMenuItem(item: TRouteMappingItem & { isActive?: boolean }): React.ReactNode {
	return <div key={item.url} className={'app-menu-item' + (item.isActive ? ' selected' : '')}>
		<MainMenuItem item={item}/>
	</div>;
}
