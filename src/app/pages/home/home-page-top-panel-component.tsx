import React from 'react';
import {LipsumPara} from '../../engine/components/ui/example-related/lipsum';
import {Title} from '../../engine/components/ui/general/typography/title-component';
import {PageTopPanel} from '../../engine/layout/top-panel/page-top-panel-component';

export const HomePageTopPanel: React.FC = () => {
	return <PageTopPanel>
		<Title level={1}>Hello</Title>
		<LipsumPara paragraphs={1}/>
	</PageTopPanel>;
};

