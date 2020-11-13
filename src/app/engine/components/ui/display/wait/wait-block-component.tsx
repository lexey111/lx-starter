import React from 'react';
import {IconSpinner} from '../../general/icons/icon-spinner-component';

type TWaitBlockComponentProps = {
	message?: string
};

export const WaitBlock: React.FC<TWaitBlockComponentProps> = (props: TWaitBlockComponentProps) => {
	return <div className={'app-block-message'}>
		<IconSpinner/> &nbsp; <span>{props.message || 'Loading...'}</span>
	</div>;
};
