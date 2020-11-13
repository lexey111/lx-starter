import {observer} from 'mobx-react';
import React from 'react';
import {MenuPositionSwitcher} from '../../engine/components/ui/example-related/menu-switcher-component';
import {ThemeSwitcher} from '../../engine/components/ui/example-related/theme-switcher-component';
import {IconSettings} from '../../engine/components/ui/general/icons/icon-settings-component';

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

