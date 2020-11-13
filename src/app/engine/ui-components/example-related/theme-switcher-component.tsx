import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppStateStore} from '../../store/@stores';
import {AvailableThemes} from '../../store/app-state/app-state-store';
import {Radio, RadioGroup} from '../data-entry/radio-button/radio-group-component';

const ThemeSwitcher: React.FC = observer(() => {
	const handleThemeChange = useCallback((theme) => {
		AppStateStore.setTheme(theme);
	}, []);

	return <div className={'app-theme-switcher'}>
		<RadioGroup value={AppStateStore.theme} onChange={handleThemeChange} inline>
			{AvailableThemes.map(theme => {
				const themeName = theme.substring(0, 1).toLocaleUpperCase() + theme.substring(1, theme.length);
				return <Radio value={theme} key={theme}>{themeName}</Radio>;
			})}
		</RadioGroup>
	</div>;
});

export {ThemeSwitcher};
