import React, {useCallback, useState} from 'react';
import {IconExpander} from '../../components/ui/general/icons/icon-expander-component';
import {IconMenu} from '../../components/ui/general/icons/icon-menu-component';
import {TMenuItems, TUseHistory} from './main-menu-component';
import {MainMenuItem} from './menu-item/main-menu-item-component';

type TAppMainMenuMarkupProps = {
	containerRef: any
	expanded: boolean
	position: 'side' | 'top'
	history: TUseHistory
	primaryMenuItems: TMenuItems
	lateralMenuItems: TMenuItems
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

function _handleMenuClick(history: TUseHistory, e: React.MouseEvent<HTMLElement>): boolean {
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
}

function _handleMenuKey(history: TUseHistory, e: TKeyboardEventWithDataset): boolean {
	if (e.persist) {
		e.persist();
	}
	const code = e.key;
	if (code !== 'Enter' && code !== ' ') {
		return true;
	}
	const url: unknown = e.target?.dataset?.url;
	if (url) {
		history.push(url as string);
	} else {
		return true;
	}

	e.preventDefault();
	e.stopPropagation();
	return false;
}

export const AppMainMenuMarkup: React.FC<TAppMainMenuMarkupProps> = (props: TAppMainMenuMarkupProps) => {
	const [expanded, setExpanded] = useState(false);
	const handleMenuClick = useCallback(e => {
		return _handleMenuClick(props.history, e);
	}, [props.history]);

	const handleMenuKey = useCallback(e => {
		return _handleMenuKey(props.history, e);
	}, [props.history]);

	const handleToggleExpand = useCallback(() => {
		setExpanded(v => !v);
	}, []);


	return <div className={'app-menu'}>
		<div
			ref={props.containerRef}
			className={'app-main-menu-container ' + (expanded ? 'app-menu-expanded' : 'app-menu-collapsed')}
		>
			{props.position === 'top' && <div
				className={'app-menu-burger'}
				tabIndex={0}
				onKeyDownCapture={handleBurgerMenuKey}
				onClick={handleBurgerMenu}>
				<IconMenu/>
			</div>
			}

			<div
				className={'app-main-menu'}
				onClick={handleMenuClick}
				onKeyDownCapture={handleMenuKey}>

				{props.position === 'side' && <div
					className={'app-menu-expander'}
					onClick={handleToggleExpand}>
					<IconExpander/><i>Collapse</i>
				</div>
				}

				{props.primaryMenuItems.map(
					(item, idx) => <MainMenuItem
						key={item.url || idx} item={item}/>)}

				<div className={'app-menu-stub'}></div>
				<div className={'app-menu-laterals'}>
					{props.lateralMenuItems.map(
						(item, idx) => <MainMenuItem
							key={item.url || idx} item={item}/>)}
				</div>

				<div className={'menu-spacer'}></div>
			</div>

			{props.position === 'side' && <div className={'app-menu-backdrop'} onClick={handleToggleExpand}></div>}
		</div>
	</div>;
};
