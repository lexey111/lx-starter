import React from 'react';
import {Icon} from '../../general/icons/icon-component';

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
		return <span className={'app-wait-tag-empty'}><Icon type={'spinner'}/></span>;
	}

	return <span className={'app-wait-tag' + (props.type ? ' ' + props.type : '')}>{props.children}</span>;
};
