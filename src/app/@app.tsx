/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {AppTopFrame} from '../engine/layout/app-top-frame-component';
import {AppBreadcrumbs} from '../engine/layout/breadcrumbs/breadcrumbs-component';
import {AppFooterPanel} from '../engine/layout/footer/app-footer-panel';
import {AppMainMenu} from '../engine/layout/main-menu/main-menu-component';
import {AppContainer} from '../engine/layout/page/app-container-component';
import {AppPageNavigation} from '../engine/layout/page/navigation/app-page-navigation-component';
import {AppPageRelatedPanel} from '../engine/layout/page/related/app-page-related-panel';
import {AppTopPanel} from '../engine/layout/top-panel/app-top-panel-component';
import {RouteToStoreComponent} from '../engine/routing/route-to-store-component';
import {ThemeToMarkupComponent} from '../engine/themes/theme-to-markup-component';
import AppRoutes from './app-utils';

export const AppTitle = 'lxStarter';

export const App: React.FC = () => {
	return <Router>
		<ThemeToMarkupComponent/>
		<RouteToStoreComponent/>

		<AppTopPanel/>

		<AppTopFrame>
			<AppMainMenu/>
			<AppBreadcrumbs/>
			<AppPageNavigation/>
		</AppTopFrame>

		<AppContainer>
			<Switch>
				{AppRoutes}
			</Switch>
		</AppContainer>

		<AppPageRelatedPanel/>

		<AppFooterPanel/>
	</Router>;
};
