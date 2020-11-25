import React from 'react';
import {Button} from '../../../../engine/ui-components/general/button/button-component';
import {Icon} from '../../../../engine/ui-components/general/icons/icon-component';

type TCustomPageActionsProps = {
	onClick: () => void
};

export const CustomPageActions: React.FC<TCustomPageActionsProps> = (props: TCustomPageActionsProps) => {
	return <>
		<Icon type={'user'} style={{
			width: '24px',
			height: '24px',
			paddingRight: '6px',
			fill: 'var(--app-success-background)'
		}}/>
		<Button type={'success'} onClick={props.onClick}>Alert</Button>
	</>;
};
