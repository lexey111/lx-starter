import {observer} from 'mobx-react';
import React from 'react';
import {IconStar} from '../../../components/ui/general/icons/icon-star-component';
import {AppStateStore} from '../../../store/@stores';
import {TMenuItem} from '../main-menu-component';

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

	if (!icon && typeof item.title === 'string' && AppStateStore.mainMenuPosition === 'side') {
		icon = <IconStar/>; // side menu must have an icon
	}

	const activeUrl = AppStateStore.currentRoute?.url;
	const availableSubRoutes = item.routes?.filter(x => x.url?.indexOf('/:') === -1);
	const itemHasVisibleRoutes = availableSubRoutes && availableSubRoutes.length > 0;
	const activeSubRoute = availableSubRoutes?.find(x => x.url === activeUrl);
	const itemIsActive = item.isActive;
	const hasCustomItem = Boolean(item.menuItem);
	const hasText = Boolean(item.title) || Boolean(item.subtitle) || Boolean(activeSubRoute?.title);

	return <div
		className={'app-menu-item' + (itemIsActive ? ' selected' : '') +
		(item.isHomePage ? ' app-menu-home-item' : '') +
		(itemHasVisibleRoutes ? ' with-subroutes' : '')}
		data-url={itemHasVisibleRoutes ? '' : item.url}
		tabIndex={0}>

		{hasCustomItem
			? <div className={'app-menu-item-content own-content'}>{item.menuItem}</div>
			: <div className={'app-menu-item-content'}>
				<div className={'app-menu-title' + (hasText ? ' icon-and-text' : '')}>
					{icon}
					<div className={'app-menu-title-parts'}>
						{item.title}
						{item.subtitle && <div className={'app-menu-subtitle'}>{item.subtitle}</div>}
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
