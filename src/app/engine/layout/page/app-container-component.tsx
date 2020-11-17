import React from 'react';
import {AppHeightAware} from '../app-height-aware-component';

type TAppContainerProps = {
	children?: any
};

export const AppContainer: React.FC<TAppContainerProps> = (props: TAppContainerProps) => {
	return <AppHeightAware containerId={'app-container'} targetCSSProp={'paddingTop'}>
		{props.children}
	</AppHeightAware>;
};
