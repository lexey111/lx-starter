import React from 'react';
import {AppHeightAware} from './app-height-aware-component';

type TAppTopFrameProps = {
	children?: any
};

/**
 * Component that adds top padding to menu frame if top panel is present and has 'fixed' position
 *
 */
export const AppTopFrame: React.FC<TAppTopFrameProps> = (props: TAppTopFrameProps) => {
	return <AppHeightAware containerId={'app-top-frame'} targetCSSProp={'top'}>
		{props.children}
	</AppHeightAware>;
};
