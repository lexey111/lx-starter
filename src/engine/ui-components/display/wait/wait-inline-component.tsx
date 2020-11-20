import React from 'react';
import {Icon} from '../../general/icons/icon-component';

type TWaitInlineComponentProps = {
	message?: string
	className?: string
};

export const WaitInlineComponent: React.FC<TWaitInlineComponentProps> = (props: TWaitInlineComponentProps) => {
	return <span className={'app-wait-inline' + (props.className ? ' ' + props.className : '')}>
		<Icon type={'spinner'}/>&nbsp; {props.message || 'Processing... it can take some time...'}
	</span>;
};
