import React, {useEffect} from 'react';
import {AppStateStore} from '../../../store/@stores';

type TTopPanelProps = {
	children: any
	className?: string
	type?: 'default' | 'fixed'
};

export const PageTopPanel: React.FC<TTopPanelProps> = (props: TTopPanelProps) => {

	useEffect(() => {
		// assign class passed (if any) to store -> container
		AppStateStore._topPanelClass = props.className || '';
		// assign type passed (if any) to store -> container
		AppStateStore._topPanelType = props.type === 'fixed' ? 'fixed' : 'default';

		return () => {
			AppStateStore._topPanelClass = '';
			AppStateStore._topPanelType = 'default';
		};
	}, [props.className, props.type]);

	if (!props.children) {
		return null;
	}

	return <div className={'app-top-panel-content'}>
		{props.children}
	</div>;
};

