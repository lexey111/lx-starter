import React from 'react';
import {PageTopPanel} from '../../../engine/layout/top-panel/page-top-panel-component';
import {WaitTag} from '../../../engine/ui-components/display/wait/wait-tag-component';
import {Title} from '../../../engine/ui-components/general/typography/title-component';

const columnClassName = 'home-top-column';

export const HomePageTopPanel: React.FC = () => {
	return <PageTopPanel className={'home-top-panel'}>

		<div className={columnClassName}>
			<Title level={1} subTitle={'1xStarter | by Lexey111'}>
				Hand crank handle kit
			</Title>
			<p>
				Just add some code.
			</p>
		</div>

		<div className={columnClassName}>
			<p>
				Welcome here. This is <b>1xStarter Kit</b> and it's cool. It includes:
			</p>
		</div>

		<div className={columnClassName}>
			<ul>
				<li>React <WaitTag>17</WaitTag></li>
				<li>Webpack <WaitTag>5</WaitTag></li>
				<li>LESS <WaitTag>3</WaitTag></li>
				<li>Typescript <WaitTag>4</WaitTag></li>
			</ul>
		</div>

		<div className={'home-top-panel-bg'}></div>
	</PageTopPanel>;
};

