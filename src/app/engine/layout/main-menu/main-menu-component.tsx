import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {AppStateStore} from '../../../store/@stores';
import useLocationParams from '../../hooks/use-location-params';
import useLoggedIn from '../../hooks/use-logged-in';
import {TRouteMappingItem} from '../../routing/route-mapping-interface';
import {AppMainMenuMarkup} from './main-menu-markup-component';
import {calculateMenuParts} from './main-menu-utils';

export type TMenuItem = TRouteMappingItem & { isActive?: boolean };
export type TMenuItems = Array<TMenuItem>;

export type TUseHistory = {
	push: (string) => void
};

export const AppMainMenu: React.FC = observer(() => {
	const history = (useHistory as () => any)() as TUseHistory;

	const [primaryMenuItems, setPrimaryMenuItems] = useState<TMenuItems>([]);
	const [lateralMenuItems, setLateralMenuItems] = useState<TMenuItems>([]);

	const {loggedIn} = useLoggedIn();
	const location = useLocationParams();

	useEffect(() => {
		// re-render on each location (and logged in state) change
		// to actualize menu items
		const [leftMenu, rightMenu] = calculateMenuParts(location.url, loggedIn);

		setPrimaryMenuItems(leftMenu);
		setLateralMenuItems(rightMenu);

		const focusedElement = document.activeElement;

		if (focusedElement && (
			focusedElement.classList.contains('app-menu-sub-item') ||
			focusedElement.classList.contains('app-menu-item'))
		) {
			(focusedElement as HTMLDivElement).blur();
		}
		if (AppStateStore._mainMenuPosition === 'top') {
			document.body.classList.add('with-top-menu');
		} else {
			document.body.classList.remove('with-top-menu');
		}

		if (AppStateStore._mainMenuPosition === 'side') {
			document.body.classList.add('with-side-menu');
		} else {
			document.body.classList.remove('with-side-menu');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedIn, location.url, AppStateStore._mainMenuPosition]);

	const handleItemClick = useCallback((url: string) => {
		history.push(url);
	}, [history]);

	return <AppMainMenuMarkup
		position={AppStateStore._mainMenuPosition}
		onItemClick={handleItemClick}
		primaryMenuItems={primaryMenuItems}
		lateralMenuItems={lateralMenuItems}/>;
});
