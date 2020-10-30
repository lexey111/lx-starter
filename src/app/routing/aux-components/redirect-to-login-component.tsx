import React from 'react';
import {Redirect} from 'react-router-dom';
import {LoginRoute} from '../route-mapping';

export const RedirectToLogin: React.FC = () => {
	return <Redirect to={LoginRoute.url}/>;
};
