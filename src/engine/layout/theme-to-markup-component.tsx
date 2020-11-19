import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {AppStateStore} from '../../app/store/@stores';

/**
 * Component performs synchronization between current theme (AppStateStore.theme) and document.body
 *
 * @constructor
 */
export const ThemeToMarkupComponent: React.FC = observer(() => {
	// subscribe to theme changes and apply current theme to body
	useEffect(() => {
		const bodyThemeList = Array.from(window.document.body.classList)
			.filter(c => c.includes('theme-') && c !== 'theme-' + AppStateStore.themeCode);

		// remove other theme classes if any
		bodyThemeList.forEach(t => {
			window.document.body.classList.remove(t);
		});
		// set actual theme
		window.document.body.classList.add('theme-' + AppStateStore.themeCode);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AppStateStore.themeCode]);

	return null;
});
