import {observer} from 'mobx-react';
import React, {useEffect, useRef} from 'react';
import {AppStateStore} from '../../../app/store/@stores';
import useLocationParams from '../../hooks/use-location-params';
import useHeightObserver from '../hooks/use-height-observer';

export const AppTopPanel: React.FC = observer((): JSX.Element | null => {
	const location = useLocationParams();
	const ref = useRef<HTMLDivElement>(null);
	const {height} = useHeightObserver(ref);

	useEffect(() => {
		AppStateStore._topPanelHeight = height;
		return () => {
			AppStateStore._topPanelHeight = 0;
		};
	}, [height]);

	return <div
		ref={ref}
		className={'app-top-panel'
		+ (AppStateStore._topPanelClass ? ' ' + AppStateStore._topPanelClass : '')
		+ (AppStateStore._topPanelType === 'fixed' ? ' app-top-panel-fixed' : '')
		}>
		{location.route?.topPanel}
	</div>;
});

