import React from 'react';
import {TIconProps} from './icons-interface';

export const IconMenu: React.FC<TIconProps> = (props: TIconProps) => {
	const {
		className,
		style
	} = props;
	// antd: menu.svg
	return <svg viewBox="64 64 896 896" focusable="false" className={'app-icon' + (className ? ' ' + className : '')} style={{...style}}>
		<path
			d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"/>
	</svg>;
};
