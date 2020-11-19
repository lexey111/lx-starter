import React from 'react';
import {IconSpinner} from '../../general/icons/icon-spinner-component';

type TWaitTagProps = {
	children?: any
	type?: 'default' | 'danger' | 'warning' | 'success'
	showSpinner?: boolean
};

export const WaitTag: React.FC<TWaitTagProps> = (props: TWaitTagProps) => {
	if (!props.children && !props.showSpinner) {
		return null;
	}

	if (!props.children && props.showSpinner) {
		return <span className={'app-wait-tag-empty'}><IconSpinner/></span>;
	}

	return <span className={'app-wait-tag' + (props.type ? ' ' + props.type : '')}>{props.children}</span>;
};
