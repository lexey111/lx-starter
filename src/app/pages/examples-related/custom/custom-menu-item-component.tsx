import React from 'react';
import {Icon} from '../../../../engine/ui-components/general/icons/icon-component';

export const CustomMenuItem: React.FC = () => {
	return <div style={
		{
			padding: 0,
			height: '48px',
			width: '48px',
			display: 'flex',
			flexFlow: 'column wrap',
			justifyContent: 'center',
			alignContent: 'center',
		}}>
		<Icon type={'user'}/>
	</div>;
};

