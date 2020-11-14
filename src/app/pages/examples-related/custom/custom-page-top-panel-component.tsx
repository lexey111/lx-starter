import React from 'react';
import {PageTopPanel} from '../../../engine/layout/top-panel/page-top-panel-component';
import {IconStar} from '../../../engine/ui-components/general/icons/icon-star-component';

export const CustomPageTopPanel: React.FC = () => {
	return <PageTopPanel className={'custom-page-top-panel'}>
		<IconStar/>

		<h1>Custom Systems</h1>

		<div className={'custom-search'}>
			<input type="text" placeholder={'Search...'}/>
		</div>

		<div className={'custom-avatar'}>
			<img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="lego user"/>
		</div>
	</PageTopPanel>;
};

