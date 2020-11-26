import React from 'react';
import {PageTopPanel} from '../../../engine/layout/top-panel/page-top-panel-component';
import {WaitTag} from '../../../engine/ui-components/display/wait/wait-tag-component';
import {Title} from '../../../engine/ui-components/general/typography/title-component';

const columnClassName = 'home-top-column';

export const HomePageTopPanel: React.FC = () => {
	return <PageTopPanel className={'home-top-panel'}>
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
				<li>Smart adaptive layouts</li>
				<li>Data Store & State Management</li>
				<li>Smart UI components (minimal set)</li>
				<li>Configurable auth-protected routing</li>
				<li>Theming engine</li>
				<li>Docs & Examples</li>
			</ul>
		</div>

		<div className={columnClassName}>
			<p>
				<b>Under the hood:</b>
			</p>
			<ul>
				<li>Core: React <WaitTag type={'danger'}>17</WaitTag></li>
				<li>Build: Webpack <WaitTag type={'danger'}>5</WaitTag></li>
				<li>Styles: LESS <WaitTag>3</WaitTag> and CSS variables</li>
				<li>Typescript <WaitTag type={'warning'}>4</WaitTag></li>
				<li>State: MobX <WaitTag>6</WaitTag></li>
				<li>Testing: Jest <WaitTag>26</WaitTag></li>
			</ul>
		</div>
	</PageTopPanel>;
};

