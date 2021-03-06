import {observer} from 'mobx-react';
import React from 'react';
import {AppStateStore} from '../../../../app/store/@stores';
import {Icon} from '../../../ui-components/general/icons/icon-component';
import {TMenuItem} from '../main-menu-component';
import {filterByLoggedIn} from '../main-menu-utils';

type TMainMenuItemProps = {
	item: TMenuItem
};

function getSubItem(item: TMenuItem, activeUrl?: string): JSX.Element {
	return <div
		className={'app-menu-sub-item' + (item.url === activeUrl ? ' active' : '')}
		data-url={item.url}
		tabIndex={0}
		key={item.url}>
		{item.title}
	</div>;
}

export const MainMenuItem: React.FC<TMainMenuItemProps> = observer((props: TMainMenuItemProps) => {
	const {item} = props;
	let {icon} = item;

	if (!icon && typeof item.title === 'string' && AppStateStore._mainMenuPosition === 'side') {
		icon = <Icon type={'star'}/>; // side menu must have an icon
	}
	if (icon && AppStateStore._mainMenuPosition === 'top' && item.showIconInTopMenu === false) {
		icon = void 0; // do not show icon in top menu
	}

	const activeUrl = AppStateStore.currentRoute?.url;
	const availableSubRoutes = filterByLoggedIn(item.routes?.filter(x => x.url?.indexOf('/:') === -1), AppStateStore.isAuthorized);
	let itemHasVisibleRoutes = availableSubRoutes && availableSubRoutes.length > 0;
	const activeSubRoute = availableSubRoutes?.find(x => x.url === activeUrl);
	const itemIsActive = item.isActive;
	const hasCustomItem = Boolean(item.menuItem);
	const hasText = Boolean(item.title) || Boolean(item.subtitle) || Boolean(activeSubRoute?.title);
	if (hasCustomItem && item.menuItemExpandable === true) {
		itemHasVisibleRoutes = true;
	}

	const showTitle = Boolean(item.title) && item.showTitleInTopMenu !== false;

	return <div
		className={'app-menu-item' + (itemIsActive ? ' current' : '') +
		(item.isHomePage ? ' app-menu-home-item' : '') +
		(hasCustomItem ? ' own-content' : '') +
		(itemHasVisibleRoutes ? ' with-subroutes' : '')}
		data-url={itemHasVisibleRoutes ? '' : item.url}
		tabIndex={0}>

		{hasCustomItem
			? <div className={'app-menu-item-content'}>{item.menuItem}</div>
			: <div className={'app-menu-item-content'}>
				<div className={'app-menu-title' + (hasText && showTitle ? ' icon-and-text' : '')}>
					{icon}
					<div className={'app-menu-title-parts'}>
						{showTitle && item.title}
						{item.subtitle && showTitle && <div className={'app-menu-subtitle'}>{item.subtitle}</div>}
					</div>
				</div>
			</div>
		}

		{availableSubRoutes && availableSubRoutes.length > 0 && <div className={'app-menu-sub-items'}>
			{getSubItem(item, activeUrl)}
			{availableSubRoutes.map(subRoute => getSubItem(subRoute, activeUrl))}
		</div>}
	</div>;
});
