import React from 'react';
import {LipsumPara} from '../../../components/ui/example-related/lipsum';
import {SyntaxHighlight} from '../../../components/ui/example-related/syntax-highlight';
import {Title} from '../../../components/ui/general/typography/title-component';
import useLocationParams from '../../../hooks/use-location-params';
import {AppStateStore} from '../../../store/@store';

export const SecondaryPageContent: React.FC = () => {
	const location = useLocationParams();

	return <>
		<SyntaxHighlight language={'bash'} title={'Current URL'}>{AppStateStore.currentLocation}</SyntaxHighlight>

		<SyntaxHighlight language={'bash'} title={'Matching URL'}>{AppStateStore.currentRoute?.url}</SyntaxHighlight>

		<SyntaxHighlight title={'Location params'}>{location.params}</SyntaxHighlight>

		<hr/>

		<Title level={5}>Filler</Title>
		<LipsumPara paragraphs={4}/>
	</>;
};

