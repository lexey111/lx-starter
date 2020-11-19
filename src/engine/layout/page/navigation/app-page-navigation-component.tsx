import {observer} from 'mobx-react';
import React, {useEffect, useRef} from 'react';
import {AppPageNavigationStore, AppStateStore} from '../../../../app/store/@stores';
import useLocationParams from '../../../hooks/use-location-params';
import {sortAnchors} from './navigation-utils';

function scrollToHash(smooth?: boolean): void {
	if (!window.location.hash) {
		return;
	}

	const target = window.location.hash.substring(1);
	if (!target) {
		return;
	}

	const element = document.querySelector('[data-nav-target="' + target + '"]');
	const offset = (element as HTMLDivElement)?.offsetTop;
	if (typeof offset === 'undefined') {
		return;
	}

	window.scrollTo({
		top: offset - 100,
		behavior: smooth === true ? 'smooth' : 'auto'
	});
}

let ticking = false;

export const AppPageNavigation: React.FC = observer(() => {
	const appLocation = useLocationParams();

	const destroying = useRef(false);

	useEffect(() => {

		return () => {
			destroying.current = true;
		};
	}, []);

	useEffect(() => {
		window.addEventListener('hashchange', scrollToHash as () => void, false);

		const delayedScroll = setTimeout(() => {
			// initial scroll
			if (!destroying.current) {
				scrollToHash(true);
				// initial detect visible nav anchors to highlight them
				sortAnchors(AppPageNavigationStore.items, AppStateStore._topPanelHeight);
			}
		}, 200);

		return () => {
			clearTimeout(delayedScroll);
			window.addEventListener('hashchange', scrollToHash as () => void, false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AppPageNavigationStore.hasItems]);

	useEffect(() => {
		if (AppPageNavigationStore.hasItems) {
			document.body.classList.add('with-page-navigation');
		} else {
			document.body.classList.remove('with-page-navigation');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AppPageNavigationStore.hasItems]);

	useEffect(() => {
		if (!ticking) {
			window.requestAnimationFrame(() => {
				if (destroying.current) {
					return;
				}
				// detect visible nav anchors to highlight them
				sortAnchors(AppPageNavigationStore.items, AppStateStore._topPanelHeight);
				ticking = false;
			});

			ticking = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AppStateStore._yScrollPos, AppStateStore._topPanelHeight]);

	if (!AppPageNavigationStore.hasItems || AppPageNavigationStore.items.length < 2) {
		return null;
	}

	return <div className={'app-page-navigation'}>
		<div className={'app-page-navigation-content'}>
			<div className={'app-page-navigation-list'}>
				{AppPageNavigationStore.items.map(item => {
					return <div
						className={'app-page-nav-item'
						+ (item.partiallyVisible ? ' partially-visible' : '')
						+ (item.current ? ' current' : '')
						}
						key={item.targetId}>
						<a href={appLocation.url + '#' + item.targetId}>
							{item.title}
						</a>
					</div>;
				})}
			</div>
		</div>
	</div>;
});
