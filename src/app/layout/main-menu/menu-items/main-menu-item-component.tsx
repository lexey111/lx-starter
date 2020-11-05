import {observer} from 'mobx-react';
import React from 'react';
import {IconStar} from '../../../components/ui/general/icons/icon-star-component';
import {AppStateStore} from '../../../store/@stores';
import {TMenuItem} from '../main-menu-component';

type TMainMenuItemProps = {
	item: TMenuItem
};

export const MainMenuItem: React.FC<TMainMenuItemProps> = observer((props: TMainMenuItemProps) => {
	const {item} = props;
	let {icon} = item;

	if (!icon && typeof item.title === 'string' && AppStateStore.mainMenuPosition === 'side') {
		icon = <IconStar/>;
	}

	const activeUrl = AppStateStore.currentRoute?.url;
	const availableSubroutes = item.routes?.filter(x => x.url?.indexOf('/:') === -1);
	const itemHasVisibleRoutes = availableSubroutes && availableSubroutes.length > 0;
	const activeSubroute = availableSubroutes?.find(x => x.url === activeUrl);
	const itemIsActive = item.isActive; // activeUrl === item.url;
	const hasCustomItem = Boolean(item.menuItem);
	const hasText = Boolean(item.title) || Boolean(item.subtitle) || Boolean(activeSubroute?.title);

	return <div
		className={'app-menu-item' + (itemIsActive ? ' selected' : '') +
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
						{activeSubroute && <div className={'app-menu-subtitle app-menu-active-subroute'}>
							{activeSubroute.title}
						</div>}
					</div>
				</div>
			</div>
		}

		{availableSubroutes && availableSubroutes.length > 0 && <div className={'app-menu-sub-items'}>
			<div
				className={'app-menu-sub-item' + (item.url === activeUrl ? ' active' : '')}
				data-url={item.url}
				tabIndex={0}>
				{item.title}
			</div>
			{availableSubroutes.map(subRoute => {
				return <div
					className={'app-menu-sub-item' + (subRoute.url === activeUrl ? ' active' : '')}
					data-url={subRoute.url}
					tabIndex={0}
					key={subRoute.url}>
					{subRoute.title}
				</div>;
			})}
		</div>}
	</div>;
});
