import React from 'react';
import {FakeLogin} from '../examples-related/routes-subroutes/protected/fake-login-component';

export const LoginPage: React.FC = () => {
	return <div className={'example-component-container'}>
		<FakeLogin/>
	</div>;
};

