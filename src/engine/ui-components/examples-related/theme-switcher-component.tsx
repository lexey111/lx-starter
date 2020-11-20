import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppStateStore} from '../../../app/store/@stores';
import {Radio, RadioGroup} from '../data-entry/radio-button/radio-group-component';
import {AvailableThemes} from '../../themes/theme-interface';

const ThemeSwitcher: React.FC = observer(() => {
	const handleThemeChange = useCallback((theme) => {
		AppStateStore.setTheme(theme);
	}, []);

	return <div className={'app-theme-switcher'}>
		<RadioGroup value={AppStateStore.themeCode} onChange={handleThemeChange} inline>
			{AvailableThemes.map(theme => {
				const themeName = theme.title;
				return <Radio value={theme.code} key={theme.code}>{themeName}</Radio>;
			})}
		</RadioGroup>
	</div>;
});

export {ThemeSwitcher};
