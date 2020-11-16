import React from 'react';
import {LipsumPara} from '../../../engine/ui-components/examples-related/lipsum';
import {Title} from '../../../engine/ui-components/general/typography/title-component';

export const CustomPage: React.FC = () => {
	return <>
		<Title level={1}>Custom page</Title>
		<p>
			Custom menu item example page
		</p>
		<LipsumPara paragraphs={10}/>
	</>;
};

