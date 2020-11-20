import React from 'react';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';
import {FakeLogin} from './fake-login-component';

export const ProtectedRoutesPage: React.FC = () => {
	return <>
		<Title>Protected routes</Title>
		<p>
			Protected routes are the routes configured with one of
		</p>

		<SyntaxHighlight
			title={'src/config/app-site-map.tsx'}
			content={`onlyWhenAuthorized?: boolean
onlyWhenNotAuthorized?: boolean
`}/>
		<p>
			properties. They react to
		</p>

		<SyntaxHighlight
			title={'src/app/store/app-state/app-state-store.ts'}
			content={`isAuthorized: boolean // is current user logged in
isAuthorizationInProgress: boolean
`}/>
		<p>
			observable fields which reflect the current authorization state.
		</p>

		<Title level={2} nav={'principles'}>Basic principles</Title>

		<div className={'example-component-container'}>
			<FakeLogin/>
		</div>
	</>;
};

