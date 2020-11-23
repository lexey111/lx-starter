/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment */
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AppStateStore} from '../../../app/store/@stores';
import useLocationParams from '../../hooks/use-location-params';
import {HomeRoute} from '../../routing/route-mapping';
import {TRouteMappingItem, TRouteMappingItems} from '../../routing/route-mapping-interface';
import {getRouteByUrl} from '../../routing/route-mapping-utils';
import {PageSubmenu} from '../page-submenu/page-submenu-component';

function calculateBreadCrumbs(currentRoute?: TRouteMappingItem): Array<TRouteMappingItem> {
	if (!currentRoute || currentRoute.isHomePage) {
		return [HomeRoute];
	}

	if (typeof currentRoute.breadcrumbs !== 'undefined' && currentRoute.breadcrumbs !== 'default') {
		return [];
	}

	const parts = currentRoute.url?.split('/').filter(item => Boolean(item)) || [];
	parts.pop(); // remove current route

	const actualBreadcrumbs = [HomeRoute];

	let currentPath = '';

	parts.forEach(part => {
		currentPath += '/' + part;
		const currentPart = getRouteByUrl(currentPath);
		if (currentPart) {
			actualBreadcrumbs.push(currentPart);
		}
	});

	actualBreadcrumbs.push(currentRoute);

	return actualBreadcrumbs;
}

export const AppBreadcrumbs: React.FC = observer(() => {
	const [breadcrumbs, setBreadcrumbs] = useState<TRouteMappingItems>([]);
	const [useSubroutingMenu, setUseSubroutingMenu] = useState(false);
	const location = useLocationParams();

	useEffect(() => {
		const parentRoute = getRouteByUrl(AppStateStore.currentRoute?._parentUrl);
		const usePageMenu = Boolean(AppStateStore.currentRoute?.breadcrumbs === 'sub-menu')
			|| Boolean(parentRoute) && parentRoute?.breadcrumbs === 'sub-menu';

		setUseSubroutingMenu(usePageMenu);

		if (!usePageMenu) {
			setBreadcrumbs(calculateBreadCrumbs(AppStateStore.currentRoute));
		}
	}, [location.url]);

	if (useSubroutingMenu) {
		return <div
			className={'app-breadcrumbs with-page-submenu' + (AppStateStore._yScrollPos > 32 ? ' page-scrolled' : '')}>
			<div className={'app-breadcrumbs-content'}>
				<div className={'app-breadcrumbs-panel'}>
					<PageSubmenu/>
				</div>
			</div>
		</div>;
	}

	if (!breadcrumbs.length || breadcrumbs.length === 1) {
		return null;
	}

	return <div className={'app-breadcrumbs' + (AppStateStore._yScrollPos > 32 ? ' page-scrolled' : '')}>
		<div className={'app-breadcrumbs-content'}>
			<div className={'app-breadcrumbs-panel bottom-separator'}>
				{breadcrumbs.map((item, idx) => {
					const hasOwnLink = typeof item.title !== 'string';

					if (hasOwnLink) {
						return <div key={idx} className={'breadcrumb-item'}>
							{item.title}
						</div>;
					}

					return <div key={idx} className={'breadcrumb-item'}>
						{idx === breadcrumbs.length - 1 && item.title}
						{idx < breadcrumbs.length - 1 && <Link to={item.url}>
							{item.title}
						</Link>
						}
					</div>;
				})}
			</div>
			{AppStateStore.hasActions && <div className={'app-breadcrumbs-actions'}>{AppStateStore._pageActions}</div>}
		</div>
	</div>;
});
