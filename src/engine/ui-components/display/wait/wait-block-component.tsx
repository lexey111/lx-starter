import React from 'react';
import {Icon} from '../../general/icons/icon-component';

type TWaitBlockComponentProps = {
	message?: string
};

export const WaitBlock: React.FC<TWaitBlockComponentProps> = (props: TWaitBlockComponentProps) => {
	return <div className={'app-block-message'}>
		<Icon type={'spinner'}/> &nbsp; <span>{props.message || 'Loading...'}</span>
	</div>;
};
