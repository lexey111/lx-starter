import {observer} from 'mobx-react';
import React from 'react';
import {MenuPositionSwitcher} from '../../../../engine/ui-components/examples-related/menu-switcher-component';
import {ThemeSwitcher} from '../../../../engine/ui-components/examples-related/theme-switcher-component';
import {Icon} from '../../../../engine/ui-components/general/icons/icon-component';

export const CustomMenuDropdown: React.FC = observer(() => {
	return <div className={'custom-menu-dropdown'}>
		<div className={'app-menu-title'}>
			<Icon type={'settings'}/>
		</div>

		<div className={'app-menu-sub-items custom-menu-dropdown-list'}>
			<div>
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
		</div>
	</div>;
});

