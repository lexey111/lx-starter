import {observer} from 'mobx-react';
import React from 'react';
import {Link} from 'react-router-dom';
import {TRouteMappingItem} from '../../../routing/route-mapping-interface';
import {AppStateStore} from '../../../store/@store';
import {IconSpinner} from '../../../components/ui/general/icons/icon-spinner-component';

type TMainMenuItemProps = {
	item: TRouteMappingItem
};

export const MainMenuItem: React.FC<TMainMenuItemProps> = observer((props: TMainMenuItemProps) => {
	const {item} = props;

	if (AppStateStore.isAuthorizationInProgress && item.spinnerDuringLogin) {
		return <Link to={item.url}>
			<div className={'app-menu-item-content'}>
				<div className={'app-menu-title'}>
					<IconSpinner/>
				</div>
			</div>
		</Link>;
	}

	let {icon} = item;
	if (!icon && typeof item.title === 'string') {
		icon = <span className={'app-menu-pseudo-icon'}>{item.title.substring(0, 1)}</span>;
	}

	const itemHasVisibleRoutes = item.routes && item?.routes.filter(x => x.url.indexOf('/:') === -1).length > 0;

	return <>
		<Link to={item.url}>
			<div className={'app-menu-item-content'}>
				<div className={'app-menu-title'}>
					{icon}
					<div className={'app-menu-title-parts'}>
						{item.title}
						{item.subtitle && <div className={'app-menu-subtitle'}>{item.subtitle}</div>}
					</div>
				</div>
			</div>
		</Link>

		{itemHasVisibleRoutes && <div className={'app-menu-sub-items'}>
			{item.routes?.filter(x => x.url.indexOf('/:') === -1).map(subRoute => {
				return <Link
					className={'app-menu-sub-item' + (subRoute.url === AppStateStore.currentRoute?.url ? ' active' : '')}
					key={subRoute.url}
					to={subRoute.url}>
					{subRoute.title}
				</Link>;
			})}
		</div>}
	</>;
});
