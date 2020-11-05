import React from 'react';
import {LipsumPara} from '../../components/ui/example-related/lipsum';
import {Title} from '../../components/ui/general/typography/title-component';
import {PageTopPanel} from '../../layout/top-panel/page-top-panel-component';

export const HomePageTopPanel: React.FC = () => {
	return <PageTopPanel>
		<Title level={1}>Hello</Title>
		<LipsumPara paragraphs={1}/>
	</PageTopPanel>;
};

