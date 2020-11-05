import React, {useCallback, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {IconExpander} from '../../components/ui/general/icons/icon-expander-component';
import useLocationParams from '../../hooks/use-location-params';
import useLoggedIn from '../../hooks/use-logged-in';
import {TRouteMappingItem} from '../../routing/route-mapping-interface';
import {calculateMenuParts} from './main-menu-utils';
import {MainMenuItem} from './menu-items/main-menu-item-component';

export type TMenuItem = TRouteMappingItem & { isActive?: boolean };
export type TMenuItems = Array<TMenuItem>;

type TAppMainMenuProps = {
	position: string
};

type TKeyboardEventWithDataset = React.KeyboardEvent<HTMLDivElement> & {
	target: {
		dataset: {
			url: string
		}
	}
};

function findParentMenuItem(node?: HTMLElement | null): HTMLElement | undefined {
	if (!node) {
		return void 0;
	}
	if (node.classList.contains('app-menu-item') || node.classList.contains('app-menu-sub-item')) {
		return node;
	}
	return findParentMenuItem(node.parentElement);
}

export const AppMainMenu: React.FC<TAppMainMenuProps> = (props: TAppMainMenuProps) => {
	const history = (useHistory as () => any)() as { push: (string) => void };

	const [primaryMenuItems, setPrimaryMenuItems] = useState<TMenuItems>([]);
	const [lateralMenuItems, setLateralMenuItems] = useState<TMenuItems>([]);
	const [expanded, setExpanded] = useState(false);

	const {loggedIn} = useLoggedIn();
	const {position} = props;
	const location = useLocationParams();

	const handleToggleExpand = useCallback(() => {
		setExpanded(v => !v);
	}, []);

	useEffect(() => {
		// re-render on each location (and logged in state) change
		// to actualize menu items
		const [leftMenu, rightMenu] = calculateMenuParts(location.url, loggedIn);

		setPrimaryMenuItems(leftMenu);
		setLateralMenuItems(rightMenu);

		setExpanded(false);

		const focusedElement = document.activeElement;
		if (focusedElement && focusedElement.classList.contains('app-menu-sub-item')) {
			(focusedElement as HTMLDivElement).blur();
		}
		if (position === 'top') {
			document.body.classList.add('with-top-menu');
		} else {
			document.body.classList.remove('with-top-menu');
		}
	}, [loggedIn, location.url]);

	const handleMenuClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
		if (e.persist) {
			e.persist();
		}
		const element = findParentMenuItem((e.target || e.currentTarget) as HTMLElement);
		const url = element?.dataset?.url;
		if (url) {
			history.push(url);
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleMenuKey = useCallback((e: TKeyboardEventWithDataset) => {
		if (e.persist) {
			e.persist();
		}
		const code = e.key;
		if (code !== 'Enter' && code !== ' ') {
			return;
		}
		const url: unknown = e.target?.dataset?.url;
		if (url) {
			history.push(url);
		} else {
			return;
		}

		e.preventDefault();
		e.stopPropagation();
		return false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <div className={'app-menu ' + (position === 'side' ? 'app-menu-side' : 'app-menu-top')}>
		<div className={'app-main-menu-container ' + (expanded ? 'app-menu-expanded' : 'app-menu-collapsed')}>
			<div
				className={'app-main-menu'}
				onClick={handleMenuClick}
				onKeyDownCapture={handleMenuKey}>

				{position === 'side' && <div className={'app-menu-expander'} onClick={handleToggleExpand}>
					<IconExpander/><i>Collapse</i>
				</div>
				}

				{primaryMenuItems.map((item, idx) => <MainMenuItem key={item.url || idx} item={item}/>)}

				<div className={'app-menu-stub'}/>

				{lateralMenuItems.map((item, idx) => <MainMenuItem key={item.url || idx} item={item}/>)}

				<div className={'menu-spacer'}></div>
			</div>

			{position === 'side' && <div className={'app-menu-backdrop'} onClick={handleToggleExpand}></div>}
		</div>
	</div>;
};
