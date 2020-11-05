/* eslint-disable react/jsx-no-bind */
import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AppBreadcrumbs} from './layout/breadcrumbs/breadcrumbs-component';
import {AppFooter} from './layout/footer/footer-component';
import {AppLayout} from './layout/layout/layout-component';
import {AppMainMenu} from './layout/main-menu/main-menu-component';
import {AppAuthPage} from './layout/page/app-auth-page-component';
import {AppContainer} from './layout/page/app-container-component';
import {AppPage} from './layout/page/app-page-component';
import {AppPageNavigation} from './layout/page/app-page-navigation-component';
import {AppTopPanel} from './layout/top-panel/app-top-panel-component';
import {RouteMapping} from './routing/route-mapping';
import {TRouteMappingItem} from './routing/route-mapping-interface';
import {RouteToStoreComponent} from './routing/route-to-store-component';
import {AppStateStore} from './store/@stores';

const AppRoutes = RouteMapping.map((routeItem: TRouteMappingItem, idx: number) => {
	if (!routeItem.url) {
		return null;
	}
	return <Route
		exact path={routeItem.url}
		key={idx}
		render={(props: { match: { params: Record<string, string> } }) => {
			// set current page & route params
			AppStateStore.setCurrentRoute(routeItem, props.match.params);

			// return corresponding page wrapper
			if (routeItem.onlyWhenLoggedIn) {
				return <AppAuthPage className={routeItem.pageClass}>{routeItem.page}</AppAuthPage>;
			}
			return <AppPage className={routeItem.pageClass}>{routeItem.page}</AppPage>;
		}
		}/>;
});

export const App: React.FC = observer(() => {
	useEffect(() => {
		// subscribe to theme changes and apply current theme to body
		window.document.body.className = 'theme-' + AppStateStore.theme;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AppStateStore.theme]);

	return <Router>
		<RouteToStoreComponent/>

		<AppTopPanel/>

		<AppMainMenu position={AppStateStore.mainMenuPosition}/>

		<AppBreadcrumbs/>

		<AppPageNavigation/>

		<AppContainer>
			<AppLayout footer={<AppFooter/>}>
				<Switch>
					{AppRoutes}
				</Switch>
			</AppLayout>
		</AppContainer>
	</Router>;
});
