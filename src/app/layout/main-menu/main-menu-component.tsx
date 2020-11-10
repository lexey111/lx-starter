import {observer} from 'mobx-react';
import React, {createRef, useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import useLocationParams from '../../hooks/use-location-params';
import useLoggedIn from '../../hooks/use-logged-in';
import {TRouteMappingItem} from '../../routing/route-mapping-interface';
import {AppStateStore} from '../../store/@stores';
import {AppMainMenuMarkup} from './main-menu-markup-component';
import {calculateMenuParts} from './main-menu-utils';

export type TMenuItem = TRouteMappingItem & { isActive?: boolean };
export type TMenuItems = Array<TMenuItem>;

type TAppMainMenuProps = {
	position: string
};

export type TUseHistory = {
	push: (string) => void
};

export const AppMainMenu: React.FC<TAppMainMenuProps> = observer((props: TAppMainMenuProps) => {
	const history = (useHistory as () => any)() as TUseHistory;
	const destroying = useRef(false);

	const [primaryMenuItems, setPrimaryMenuItems] = useState<TMenuItems>([]);
	const [lateralMenuItems, setLateralMenuItems] = useState<TMenuItems>([]);

	const {loggedIn} = useLoggedIn();
	const {position} = props;
	const location = useLocationParams();

	const containerRef = createRef<HTMLDivElement>();

	useEffect(() => {
		return () => {
			destroying.current = true;
		};
	}, []);

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
		if (position === 'top') {
			document.body.classList.add('with-top-menu');
		} else {
			document.body.classList.remove('with-top-menu');
		}
		if (position === 'side') {
			document.body.classList.add('with-side-menu');
		} else {
			document.body.classList.remove('with-side-menu');
		}
	}, [loggedIn, location.url, position]);

	useLayoutEffect(() => {
		// sync scroll position if TopPanel presents and menu has 'side' position
		if (position !== 'side' || !containerRef.current) {
			if (containerRef.current && containerRef.current.style?.paddingTop !== '0') {
				containerRef.current.style.paddingTop = '0';
			}
			return;
		}

		window.requestAnimationFrame(() => {
			if (!destroying.current && containerRef.current && containerRef.current.style) {
				const margin = AppStateStore._topPanelHeight - AppStateStore._yScrollPos;
				containerRef.current.style.paddingTop = margin > 0 ? margin.toString() + 'px' : '0';
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [position, containerRef, AppStateStore._topPanelHeight, AppStateStore._yScrollPos]);

	const handleItemClick = useCallback((url: string) => {
		history.push(url);
	}, [history]);

	return <AppMainMenuMarkup
		ref={containerRef}
		position={props.position}
		onItemClick={handleItemClick}
		primaryMenuItems={primaryMenuItems}
		lateralMenuItems={lateralMenuItems}/>;
});
