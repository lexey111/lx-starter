import React from 'react';
import {PageTopPanel} from '../../engine/layout/top-panel/page-top-panel-component';
import {WaitTag} from '../../engine/ui-components/display/wait/wait-tag-component';
import {Title} from '../../engine/ui-components/general/typography/title-component';

export const HomePageTopPanel: React.FC = () => {
	return <PageTopPanel>
		<Title level={1}>STARTER KIT</Title>
		<p>
			Welcome here. This is <b>1xStarter Kit</b> and it's cool. It includes:
		</p>
		<ul>
			<li>React <WaitTag>17</WaitTag></li>
			<li>Webpack <WaitTag>5</WaitTag></li>
			<li>LESS <WaitTag>3</WaitTag></li>
			<li>Typescript <WaitTag>4</WaitTag></li>
		</ul>
	</PageTopPanel>;
};

