import React from 'react';
import {Redirect} from 'react-router-dom';
import {HomeRoute} from '../route-mapping';

export const RedirectToHome: React.FC = () => {
	return <Redirect to={HomeRoute.url}/>;
};
