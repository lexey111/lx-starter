import {observer} from 'mobx-react';
import React, {useEffect, useRef} from 'react';
import {AppPageNavigationStore, AppStateStore} from '../../../../store/@stores';
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
	if (!offset) {
		return;
	}

	window.scrollTo({
		top: offset - 100,
		behavior: smooth === true ? 'smooth' : 'auto'
	});
}

let ticking = false;

// function updateAnchorsVisibility(anchors: TNavigationItems): void {
// 	anchors.forEach(anchor => {
// 		anchor.isInViewPort = isElementInViewport(anchor.titleRef);
// 	}, []);
// }

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
			if (!destroying.current) {
				scrollToHash(true); // initial scroll
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
				// updateAnchorsVisibility(AppPageNavigationStore.items);
				sortAnchors(AppPageNavigationStore.items);
				ticking = false;
			});

			ticking = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AppStateStore._yScrollPos]);

	if (!AppPageNavigationStore.hasItems) {
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
