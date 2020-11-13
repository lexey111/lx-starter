import React from 'react';
import {LipsumPara} from '../../engine/ui-components/example-related/lipsum';
import {Title} from '../../engine/ui-components/general/typography/title-component';
import {PageTopPanel} from '../../engine/layout/top-panel/page-top-panel-component';

export const HomePageTopPanel: React.FC = () => {
	return <PageTopPanel>
		<Title level={1}>Hello</Title>
		<LipsumPara paragraphs={1}/>
	</PageTopPanel>;
};

