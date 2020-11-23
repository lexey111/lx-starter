import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {AppStateStore} from '../../app/store/@stores';
import {findTheme} from './theme-interface';

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
		const theme = findTheme(AppStateStore.themeCode);
		// set actual theme
		if (theme) {
			window.document.body.classList.add('theme-' + theme.code);
			window.document.body.classList.add('theme-family-' + theme.family);
		} else {
			window.document.body.classList.add('theme-default');
			window.document.body.classList.add('theme-family-light');
		}

	}, [AppStateStore.themeCode]);

	return null;
});
