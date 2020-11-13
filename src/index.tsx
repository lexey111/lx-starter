import {configure} from 'mobx';
import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './app/@app';

import {AppStateStore} from './app/engine/store/@stores';
import {AvailableThemes} from './app/engine/store/app-state/app-state-store';
import './styles/app.less';

declare const PRODUCTION: boolean; // webpack DefinePlugin

configure({
	enforceActions: 'never',
	// enforceActions: 'always',
	// computedRequiresReaction: true,
	// reactionRequiresObservable: true,
	// observableRequiresReaction: true,
	disableErrorBoundaries: !PRODUCTION,
	isolateGlobalState: true,
	// reactionScheduler: (f): void => {
	// 	console.log('Running an event after a delay:', f);
	// 	setTimeout(f, 500);
	// }
});

let lastKnownScrollPosition = 0;
let ticking = false;

// restore app theme from the local storage
const value: string = localStorage.getItem('app-theme') || 'light';
const theme = AvailableThemes.includes(value) ? value : 'light';
AvailableThemes.forEach(t => {
	window.document.body.classList.remove('theme-' + t);
});
window.document.body.classList.add('theme-' + theme);

const runApp = (): void => {
	// subscribe to page scroll (for breadcrumbs component)
	window.addEventListener('scroll', () => {
		lastKnownScrollPosition = window.scrollY;

		if (!ticking) {
			window.requestAnimationFrame(() => {
				AppStateStore.setYScrollPos(lastKnownScrollPosition);
				ticking = false;
			});

			ticking = true;
		}
	});

	ReactDOM.render(
		<App/>,
		document.getElementById('app-mount-point')
	);
};

runApp();

// Hot reloading
if ((module as unknown as { hot: any }).hot) {
	(module as unknown as { hot: { accept: (string, Function) => void } }).hot['accept']('./App', () => {
		runApp();
	});
}
