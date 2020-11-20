import React from 'react';
import {PageTopPanel} from '../../../../engine/layout/top-panel/page-top-panel-component';
import {Icon} from '../../../../engine/ui-components/general/icons/icon-component';

export const CustomPageTopPanel: React.FC = () => {
	return <PageTopPanel type='fixed' className={'custom-page-top-panel'}>
		<Icon type={'star'}/>

		<h1>Custom Systems</h1>

		<div className={'custom-search'}>
			<input type="text" placeholder={'Search...'}/>
		</div>

		<div className={'custom-avatar'}>
			<img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="lego user"/>
		</div>
	</PageTopPanel>;
};

