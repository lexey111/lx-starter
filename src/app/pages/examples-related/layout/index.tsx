import React from 'react';
import {Link} from 'react-router-dom';
import {PageRelated} from '../../../../engine/layout/page/related/app-page-related-component';
import {MenuPositionSwitcher} from '../../../../engine/ui-components/examples-related/menu-switcher-component';
import {Title} from '../../../../engine/ui-components/general/typography/title-component';
import {BasicLayout} from './basic-layout-component';

export const LayoutPage: React.FC = () => {
	return <>

		<Title>Layout elements</Title>

		<Title level={2} nav={'overview'}>Overview</Title>
		<p>
			Basic application UI is simple. Here is the picture:
		</p>

		<BasicLayout/>

		<p>
			However, Layout elements are dynamic. It means some of items could be displayed only on particular pages:
			<Link to={'/layout/top-panel'}>Top panel</Link>, <Link to={'/layout/breadcrumbs'}>Breadcrumbs</Link>/<Link to={'/layout/page-submenu'}>Page
			menu</Link>, <Link to={'/layout/page-navigation'}>In-page navigation</Link>.
		</p>

		<Title level={3} nav={'side_menu'}>Layout variants</Title>
		<p>
			Also <Link to={'/layout/main-menu'}>main menu</Link> could be placed at top of page or at left side:
		</p>

		<BasicLayout sideMenu={true}/>

		<div className={'example-component-container'}>
			<Title level={6} bottomBorder noTopMargin>
				Set menu position:
			</Title>
			<MenuPositionSwitcher/>
		</div>

		<p>
			So the main content area - the page - is pretty customizable.
		</p>

		<PageRelated items={[
			{
				url: '/layout/top-panel',
				title: 'Top panel'
			},
			{
				url: '/layout/main-menu',
				title: 'Main menu'
			},
			{
				url: '/layout/breadcrumbs',
				title: 'Breadcrumbs'
			},
			{
				url: '/layout/page-submenu',
				title: 'Page sub-menu'
			},
			{
				url: '/layout/page',
				title: 'Page & Auth'
			},
			{
				url: '/layout/page-navigation',
				title: 'In-page navigation'
			},
			{
				url: '/layout/page-related',
				title: 'Related menu'
			},
			{
				url: '/layout/footer',
				title: 'Footer'
			},
		]}/>
	</>;
};
