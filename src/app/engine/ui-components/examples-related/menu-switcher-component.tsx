import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppStateStore} from '../../../store/@stores';
import {Radio, RadioGroup} from '../data-entry/radio-button/radio-group-component';

const MenuPositionSwitcher: React.FC = observer(() => {
	const handleMenuPositionChange = useCallback((position: string) => {
		AppStateStore.setMenuPosition(position);
	}, []);

	return <div className={'app-menu-switcher'}>
		<RadioGroup value={AppStateStore.mainMenuPosition} onChange={handleMenuPositionChange} inline>
			<Radio value={'top'} key={'top'}>At top</Radio>
			<Radio value={'side'} key={'side'}>At left</Radio>
		</RadioGroup>
	</div>;
});

export {MenuPositionSwitcher};
