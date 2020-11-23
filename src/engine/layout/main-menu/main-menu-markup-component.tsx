import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AppStateStore} from '../../../app/store/@stores';
import {Icon} from '../../ui-components/general/icons/icon-component';
import {TMenuItems} from './main-menu-component';
import {MainMenuItem} from './menu-item/main-menu-item-component';

type TAppMainMenuMarkupProps = {
	position: string
	primaryMenuItems: TMenuItems
	lateralMenuItems: TMenuItems
	onItemClick: (url) => void
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

function handleBurgerMenu(): void {
	// just focus first menu item
	const homeMenu = document.querySelector('.app-menu-home-item') as HTMLDivElement;
	if (!homeMenu) {
		return;
	}
	homeMenu.focus();
}

function handleBurgerMenuKey(e: TKeyboardEventWithDataset): boolean {
	if (e.persist) {
		e.persist();
	}
	const code = e.key;
	if (code !== 'Enter' && code !== ' ') {
		return true;
	}
	handleBurgerMenu();
	e.preventDefault();
	e.stopPropagation();

	return false;
}

function _handleMenuClick(callback: (string) => void, e: React.MouseEvent<HTMLElement>): boolean {
	if (e.persist) {
		e.persist();
	}
	const element = findParentMenuItem((e.target || e.currentTarget) as HTMLElement);
	const url = element?.dataset?.url;

	if (url) {
		callback(url);
	}
	e.preventDefault();
	e.stopPropagation();
	return Boolean(url);
}

function _handleMenuKey(callback: (string) => void, e: TKeyboardEventWithDataset): boolean {
	if (e.persist) {
		e.persist();
	}
	const code = e.key;
	if (code !== 'Enter' && code !== ' ') {
		return false;
	}
	const url: unknown = e.target?.dataset?.url;

	if (!url) {
		return false;
	}

	callback(url as string);

	e.preventDefault();
	e.stopPropagation();
	return true;
}

let ticking = false;

function correctMenuPos(element?: HTMLDivElement | null): void {
	if (!element) {
		return;
	}
	let top = '0';
	if (AppStateStore._mainMenuPosition === 'side') {
		const pHeight = Math.ceil(AppStateStore._topPanelHeight);

		if (AppStateStore._topPanelType === 'fixed') {
			top = pHeight > 0 ? pHeight.toString() + 'px' : '0';
		}

		if (AppStateStore._topPanelType !== 'fixed') {
			const padding = pHeight - AppStateStore._yScrollPos;
			top = padding > 0 ? padding.toString() + 'px' : '0';
		}
	}

	if (top !== element.style.top) {
		element.style.top = top;
	}
}

export const AppMainMenuMarkup = observer((props: TAppMainMenuMarkupProps): JSX.Element => {
	const [expanded, setExpanded] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	const handleMenuClick = useCallback(e => {
		if (_handleMenuClick(props.onItemClick, e)) {
			setExpanded(false); // collapse after click
			return false;
		}
		return true;
	}, [props.onItemClick]);

	const handleMenuKey = useCallback(e => {
		if (_handleMenuKey(props.onItemClick, e)) {
			setExpanded(false); // collapse after Enter key pressed
			return false;
		}
		return true;
	}, [props.onItemClick]);

	const handleToggleExpand = useCallback(() => {
		setExpanded(v => !v);
	}, []);

	const handleFocusing = useCallback((e: React.ChangeEvent) => {
		if (props.position !== 'side' || expanded) {
			return;
		}

		const elem = e.target;

		if (!elem || !elem.classList.contains('with-subroutes')) {
			return;
		}

		setExpanded(true);
	}, [expanded, props.position]);

	useEffect(() => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				const element = ref.current;
				correctMenuPos(element);
				ticking = false;
			});
			ticking = true;
		}
	}, [
		ref.current,
		AppStateStore._topPanelType,
		AppStateStore._topPanelHeight,
		AppStateStore._mainMenuPosition,
		AppStateStore._yScrollPos
	]);

	return <div className={'app-menu'}>
		<div
			ref={ref}
			className={'app-main-menu-container ' + (expanded ? 'app-menu-expanded' : 'app-menu-collapsed')}>
			{props.position === 'top' && <div
				className={'app-menu-burger'}
				tabIndex={0}
				onKeyDownCapture={handleBurgerMenuKey}
				onClick={handleBurgerMenu}>
				<Icon type={'menu'}/>
			</div>
			}

			<div
				className={'app-main-menu'}
				onFocus={handleFocusing}
				onClick={handleMenuClick}
				onKeyDownCapture={handleMenuKey}>
				{props.position === 'side' && <div
					className={'app-menu-expander'}
					onClick={handleToggleExpand}>
					<Icon type={'expander'}/><i>Collapse</i>
				</div>
				}

				{props.primaryMenuItems.map(
					(item, idx) => <MainMenuItem
						key={item.url || idx} item={item}/>)}

				<div className={'app-menu-laterals'}>
					{props.lateralMenuItems.map(
						(item, idx) => <MainMenuItem
							key={item.url || idx} item={item}/>)}
				</div>
			</div>

		</div>
	</div>;
});
