import React from 'react';
import {SyntaxHighlight} from '../../../engine/ui-components/example-related/syntax-highlight';
import useLocationParams from '../../../engine/hooks/use-location-params';
import {AppStateStore} from '../../../engine/store/@stores';

export const SecondaryPageContent: React.FC = () => {
	const location = useLocationParams();

	return <>
		<SyntaxHighlight language={'bash'} title={'Current URL'}>{AppStateStore.currentLocation}</SyntaxHighlight>

		<SyntaxHighlight language={'bash'} title={'Matching URL'}>{AppStateStore.currentRoute?.url}</SyntaxHighlight>

		<SyntaxHighlight title={'Location params'}>{location.params}</SyntaxHighlight>
	</>;
};

