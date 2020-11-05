import {observer} from 'mobx-react';
import React from 'react';
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
			<a href="#">Menu at top</a>
			<a href="#">Menu at left</a>
		</div>
	</div>;
});

