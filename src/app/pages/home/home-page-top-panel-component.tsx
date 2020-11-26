import React from 'react';
import {PageTopPanel} from '../../../engine/layout/top-panel/page-top-panel-component';
import {WaitTag} from '../../../engine/ui-components/display/wait/wait-tag-component';
import {Title} from '../../../engine/ui-components/general/typography/title-component';

const columnClassName = 'home-top-column';

export const HomePageTopPanel: React.FC = () => {
	return <PageTopPanel className={'home-top-panel'}>
		<div className={columnClassName} style={{padding: '16px 32px 16px 16px'}}>
			<img src={'/images/crank_opt.png'} alt="crank"/>
		</div>

		<div className={columnClassName}>
			<Title level={1} subTitle={<>HandCrank kit <span>by Lexey111</span></>}>
				1xStarter
			</Title>
			<p>
				Just remove some code and add some other code. Not vice versa!
			</p>
		</div>

		<div className={columnClassName}>
			<p>
				<b>Kit includes:</b>
			</p>
			<ul>
				<li>Smart layouts</li>
				<li>Data Store</li>
				<li>Smart components</li>
				<li>Configurable protected routing</li>
				<li>Theming engine</li>
				<li>Docs & Examples</li>
			</ul>
		</div>

		<div className={columnClassName}>
			<p>
				<b>Under the hood:</b>
			</p>
			<ul>
				<li>React <WaitTag type={'danger'}>17</WaitTag></li>
				<li>Webpack <WaitTag type={'danger'}>5</WaitTag></li>
				<li>LESS <WaitTag>3</WaitTag></li>
				<li>Typescript <WaitTag type={'warning'}>4</WaitTag></li>
				<li>MobX <WaitTag>6</WaitTag></li>
				<li>Jest <WaitTag>26</WaitTag></li>
			</ul>
		</div>
	</PageTopPanel>;
};

