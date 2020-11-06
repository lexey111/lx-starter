import {observer} from 'mobx-react';
import React, {useCallback, useEffect} from 'react';
import {AppPageNavigationStore} from '../../store/@stores';

export const AppPageNavigation: React.FC = observer(() => {
	const handleClick = useCallback((e: React.MouseEvent<any>) => {
		e.preventDefault();
		e.stopPropagation();

		if (!e || !e.target || !e.target['dataset']) {
			return false;
		}

		const target = (e as unknown as { target: { dataset: { anchor: string } } }).target.dataset.anchor;
		if (!target) {
			return;
		}

		const offset = document.getElementById(target)?.offsetTop;
		if (!offset) {
			return;
		}
		window.scrollTo({
			top: offset - 100,
			behavior: 'auto'
		});
		return false;
	}, []);

	useEffect(() => {
		if (AppPageNavigationStore.hasItems) {
			document.body.classList.add('with-page-navigation');
		} else {
			document.body.classList.remove('with-page-navigation');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AppPageNavigationStore.hasItems]);

	if (!AppPageNavigationStore.hasItems) {
		return null;
	}

	return <div className={'app-page-navigation'}>
		<div className={'app-page-navigation-content'}>
			<div className={'app-page-navigation-list'}>
				{AppPageNavigationStore.items.map(item => {
					return <div
						className={'app-page-nav-item'}
						key={item.targetId}>
						<a href={'#'} onClick={handleClick} data-anchor={item.targetId}>
							{item.title}
						</a>
					</div>;
				})}
			</div>
		</div>
	</div>;
});
