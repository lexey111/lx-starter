import React from 'react';
import {Link} from 'react-router-dom';
import {A} from '../../../../engine/ui-components/examples-related/a-component';
import {Src} from '../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../engine/ui-components/examples-related/syntax-highlight';
import {FakeLogin} from '../routes-subroutes/protected/fake-login-component';

export const LoginPage: React.FC = () => {
	return <>
		<Src src={'src/app/pages/examples-related/login/index.tsx'}/>

		<div className={'example-component-container'}>
			<FakeLogin/>
		</div>

		<p>
			This page is an example of Login/Logout functionality. Feel free to remove it or extend, or replace with own/3rd party
			implementation like <A href={'https://firebase.google.com/docs/auth'}>Firebase</A>.
		</p>

		<p>
			The page uses <Src src={'src/app/pages/examples-related/routes-subroutes/protected/fake-login-component.tsx'} inline/> component to display the Log In
			block.
		</p>
		<p>
			The component just assigns some values to <Link to={'/state-management/app-state'}>AppStateStore</Link> fields
			with delay:
		</p>

		<SyntaxHighlight
			title={'fake-login-component.tsx'}
			content={`AppStateStore.isAuthorizationInProgress = true;

const delay = setTimeout(() => {
	AppStateStore.isAuthorizationInProgress = false;
	AppStateStore.isAuthorized = true;
	AppStateStore.userName = 'John Doe';
	AppStateStore.userId = '42';
	AppStateStore.userImageUrl = 'https://randomuser.me/api/portraits/lego/1.jpg';
}, 2500);
`}/>
	</>;
};

