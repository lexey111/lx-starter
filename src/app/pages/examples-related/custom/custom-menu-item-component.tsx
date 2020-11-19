import React from 'react';
import {IconUser} from '../../../../engine/ui-components/general/icons/icon-user-component';

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
		<IconUser/>
	</div>;
};

