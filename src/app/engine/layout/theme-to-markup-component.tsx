import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {AppStateStore} from '../../store/@stores';
import {AvailableThemes} from '../../store/app-state/app-state-store';

/**
 * Component performs synchronization between current theme (AppStateStore.theme) and document.body
 *
 * @constructor
 */
export const ThemeToMarkupComponent: React.FC = observer(() => {
	useEffect(() => {
		// subscribe to theme changes and apply current theme to body
		AvailableThemes.forEach(t => {
			window.document.body.classList.remove('theme-' + t);
		});
		window.document.body.classList.add('theme-' + AppStateStore.theme);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AppStateStore.theme]);

	return null;
});
