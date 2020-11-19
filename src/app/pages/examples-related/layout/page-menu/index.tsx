import React from 'react';
import {Link} from 'react-router-dom';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

export const PageMenuPage: React.FC = () => {
	return <>

		<Title>Page menu</Title>

		<Src src={'src/engine/layout/page-submenu/page-submenu-component.tsx'}/>

		<p>
			Component displays page sub-menu in <Link to={'/layout/breadcrumbs'}>breadcrumb</Link> container.
		</p>

		<Title level={2} nav={'how_it_works'}>How it works</Title>
	</>;
};
