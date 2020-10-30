import React from 'react';
import {IconSpinner} from '../../general/icons/icon-spinner-component';

type TWaitInlineComponentProps = {
	message?: string
	className?: string
};

export const WaitInlineComponent: React.FC<TWaitInlineComponentProps> = (props: TWaitInlineComponentProps) => {
	return <span className={'app-wait-inline' + (props.className ? ' ' + props.className : '')}>
		<IconSpinner/>&nbsp; {props.message || 'Processing... it can take some time...'}
	</span>;
};
