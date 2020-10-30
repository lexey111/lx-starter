import React, {useCallback, useEffect, useState} from 'react';
import useLocationParams from '../../hooks/use-location-params';
import useLoggedIn from '../../hooks/use-logged-in';
import {TRouteMappingItem} from '../../routing/route-mapping-interface';
import {IconExpander} from '../../components/ui/general/icons/icon-expander-component';
import {calculateMenuParts, createMenuItem} from './main-menu-utils';

export type TMenuItem = TRouteMappingItem & { isActive?: boolean };
export type TMenuItems = Array<TMenuItem>;

export const AppMainMenu: React.FC = () => {
	const [primaryMenuItems, setPrimaryMenuItems] = useState<TMenuItems>([]);
	const [lateralMenuItems, setLateralMenuItems] = useState<TMenuItems>([]);
	const [expanded, setExpanded] = useState(false);

	const {loggedIn} = useLoggedIn();
	const location = useLocationParams();

	const handleToggleExpand = useCallback(() => {
		setExpanded(v => !v);
	}, []);

	useEffect(() => {
		// re-render on each location and logged in state change
		// to actualize menu items
		const [leftMenu, rightMenu] = calculateMenuParts(location.url, loggedIn);

		setPrimaryMenuItems(leftMenu);
		setLateralMenuItems(rightMenu);

		setExpanded(false);
	}, [loggedIn, location.url]);

	return <div className={'app-menu'}>
		<div className={'app-main-menu-container ' + (expanded ? 'app-menu-expanded' : 'app-menu-collapsed')}>
			<div className={'app-main-menu'}>

				<div className={'app-menu-expander'} onClick={handleToggleExpand}>
					<IconExpander/><i>Collapse</i>
				</div>

				{primaryMenuItems.map(createMenuItem)}

				<div className={'app-menu-stub'}/>

				{lateralMenuItems.map(createMenuItem)}
				<div className={'bottom-menu-spacer'}></div>
			</div>
			<div className={'app-menu-backdrop'} onClick={handleToggleExpand}></div>
		</div>
	</div>;
};
