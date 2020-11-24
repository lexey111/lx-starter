import React from 'react';

/**
 * Just a container that is used through Portal by id
 * https://reactjs.org/docs/portals.html
 */
export const AppPageRelatedPanel: React.FC = () => {
	return <div className={'app-page-related'}>
		<div className={'app-page-related-content'} id={'app-page-related-portal'}></div>
	</div>;
};
