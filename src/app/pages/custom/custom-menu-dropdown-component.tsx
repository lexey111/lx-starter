import {observer} from 'mobx-react';
import React from 'react';
import {MenuPositionSwitcher} from '../../components/ui/example-related/menu-switcher-component';
import {ThemeSwitcher} from '../../components/ui/example-related/theme-switcher-component';
import {IconSettings} from '../../components/ui/general/icons/icon-settings-component';

export const CustomMenuDropdown: React.FC = observer(() => {
	return <div className={'custom-menu-dropdown'}>
		<IconSettings/>
		<div className={'custom-menu-dropdown-list'}>
			<p>
				Theme
			</p>
			<div>
				<ThemeSwitcher/>
			</div>
			<p>
				Menu
			</p>
			<MenuPositionSwitcher/>
		</div>
	</div>;
});

