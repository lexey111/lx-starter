/* eslint-disable react/jsx-no-bind */
import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AppBreadcrumbs} from './layout/breadcrumbs/breadcrumbs-component';
import {AppFooter} from './layout/footer/footer-component';
import {AppLayout} from './layout/layout/layout-component';
import {AppMainMenu} from './layout/main-menu/main-menu-component';
import {AppAuthPage} from './layout/pages/app-auth-page-component';
import {AppContainer} from './layout/pages/app-container-component';
import {AppPage} from './layout/pages/app-page-component';
import {RouteMapping} from './routing/route-mapping';
import {TRouteMappingItem} from './routing/route-mapping-interface';
import {RouteToStoreComponent} from './routing/route-to-store-component';
import {AppStateStore} from './store/@store';

const AppRoutes = RouteMapping.map((routeItem: TRouteMappingItem, idx: number) => {
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
		// subscribe to theme changes
		window.document.body.className = 'theme-' + AppStateStore.theme;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AppStateStore.theme]);

	return <Router>
		<RouteToStoreComponent/>

		<AppMainMenu/>

		<AppBreadcrumbs/>

		<AppContainer>
			<AppLayout footer={<AppFooter/>}>
				<Switch>
					{AppRoutes}
				</Switch>
			</AppLayout>
		</AppContainer>
	</Router>;
});
