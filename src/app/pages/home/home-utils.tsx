import React from 'react';
import {Link} from 'react-router-dom';
import {TRouteMappingItem} from '../../../engine/routing/route-mapping-interface';
import {Icon} from '../../../engine/ui-components/general/icons/icon-component';

function getRouteItem(route: TRouteMappingItem): string | JSX.Element {
	if (!route.url) {
		let result = 'Custom element';

		if (route.menuItem) {
			result = 'Custom menu item (no url)';
		}

		if (route.menuItemExpandable) {
			result += ', expandable';
		}

		return result;
	}

	if (route.url.includes('/:')) {
		return <>
			(parameters)&nbsp;
			<span className={'home-route-url'}>{route.url}
				{route.onlyWhenAuthorized && <span className={'home-route-auth'}><Icon type={'lock'}/></span>}
				{route.onlyWhenNotAuthorized && <span className={'home-route-not-auth'}><Icon type={'lock'}/></span>}
			</span>
		</>;
	}

	return <>
		<Link to={route.url}>{route.title}</Link>
		<span className={'home-route-url'}>{route.url}
			{route.onlyWhenAuthorized && <span className={'home-route-auth'}><Icon type={'lock'}/></span>}
			{route.onlyWhenNotAuthorized && <span className={'home-route-not-auth'}><Icon type={'lock'}/></span>}
		</span>
	</>;
}

export function getRoutes(routes: Array<TRouteMappingItem>): Array<JSX.Element> {
	let result: Array<JSX.Element> = [];

	routes.forEach((route, idx) => {
		result.push(<li key={idx}>{getRouteItem(route)}</li>);

		if (!route.routes || route.routes.length === 0) {
			return;
		}

		const inner = getRoutes(route.routes);
		result = [...result, <ul key={'nested_' + (route?.url || idx.toString())}>{...inner}</ul>];
	});

	return result;
}
