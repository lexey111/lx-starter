import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import useLocationParams from '../../hooks/use-location-params';
import {AppPageNavigationStore} from '../../../store/@stores';

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

export const AppPageNavigation: React.FC = observer(() => {
	const appLocation = useLocationParams();

	useEffect(() => {
		window.addEventListener('hashchange', scrollToHash as () => void, false);

		const delayedScroll = setTimeout(() => {
			scrollToHash(true); // initial scroll
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
						<a href={appLocation.url + '#' + item.targetId}>
							{item.title}
						</a>
					</div>;
				})}
			</div>
		</div>
	</div>;
});
