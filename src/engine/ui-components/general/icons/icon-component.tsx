import React from 'react';
import {TIconProps} from './icons-interface';
import {IconsMap} from './icons-map';

export const Icon: React.FC<TIconProps> = (props: TIconProps) => {
	const iconName = props.type ? props.type : 'unknown';

	const iconContent = IconsMap[iconName];

	if (!iconContent) {
		return <span className={'app-icon unknown-icon'}>?</span>; // icon not found
	}

	const viewBox = typeof iconContent['viewBox'] === 'string' ? iconContent['viewBox'] : '64 64 896 896';
	const viewContent = typeof iconContent['content'] !== 'undefined'
		? iconContent['content'] as JSX.Element
		: iconContent as JSX.Element;
	const className = 'app-icon'
		+ (typeof iconContent['ownClass'] === 'string' ? ' ' + iconContent['ownClass'] : '')
		+ (props.className ? ' ' + props.className : '');

	return <svg
		viewBox={viewBox}
		focusable="false"
		className={className} style={{...props.style}}>
		{viewContent}
	</svg>;
};
