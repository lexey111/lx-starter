import React from 'react';
import {Link} from 'react-router-dom';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

export const PageSubMenuPage: React.FC = () => {
	return <>

		<Title nav={'overview'}>Page submenu</Title>

		<Src src={'src/engine/layout/page-submenu/page-submenu-component.tsx'}/>

		<p>
			Component displays page sub-menu in <Link to={'/layout/breadcrumbs'}>breadcrumb</Link> container.
		</p>
		<p>
			The main idea of the menu you can see at top: it is secondary menu, sub-routing to make quick switches.
		</p>

		<Title level={2} nav={'how_it_works'}>How it works</Title>
		<p>
			It is an automatic component which displays the siblings of particular page (route). E.g.,
		</p>

		<SyntaxHighlight
			title={'src/config/app-site-map.tsx'}
			lines={[2, 8, 13]}
			content={`{
	title: 'UI & Components', // title of main menu item, level 1
	url: '/ui',
	page: <UiPage/>,
	breadcrumbs: 'sub-menu', // <- the magic, sign to display page submenu for this route
	routes: [
		{
			title: 'Themes',
			url: '/ui/themes',
			page: <ThemesPage/>,
		},
		{
			title: 'General',
			url: '/ui/general',
			page: <UiGeneralPage/>
		},
		...
	]
},`}/>
		<p>
			When Breadcrumb component meet <code>breadcrumbs: 'sub-menu'</code> it renders the content of the Page Submenu instead
			of breadcrumbs.
		</p>

		<p>
			But what is content of Page Submenu?
		</p>

		<p>
			This component subscribed to location change and when it happens &mdash; component requests all the sibling of
			current route, then adds the current route on the beginning of the list, and render the items. If item is sub-route
			(has no <code>breadcrumbs: 'sub-menu'</code> and is nested in the route which has it) &mdash; Submenu uses its parent
			as a root element.
		</p>

		<p>
			This is why in the example above submenu will include <i>(2) (8) (13)</i>.
		</p>
	</>;
};
