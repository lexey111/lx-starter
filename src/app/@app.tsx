/* eslint-disable react/jsx-no-bind */
import {observer} from 'mobx-react';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AppBreadcrumbs} from './engine/layout/breadcrumbs/breadcrumbs-component';
import {AppFooter} from './engine/layout/footer/footer-component';
import {AppMainMenu} from './engine/layout/main-menu/main-menu-component';
import {AppAuthPage} from './engine/layout/page/app-auth-page-component';
import {AppContainer} from './engine/layout/page/app-container-component';
import {AppPage} from './engine/layout/page/app-page-component';
import {AppPageNavigation} from './engine/layout/page/navigation/app-page-navigation-component';
import {AppTopPanel} from './engine/layout/top-panel/app-top-panel-component';
import {RouteMapping} from './engine/routing/route-mapping';
import {TRouteMappingItem} from './engine/routing/route-mapping-interface';
import {RouteToStoreComponent} from './engine/routing/route-to-store-component';
import {AppStateStore} from './store/@stores';
import {AvailableThemes} from './store/app-state/app-state-store';

const AppRoutes = RouteMapping.map((routeItem: TRouteMappingItem, idx: number) => {
	if (!routeItem.url) {
		return null;
	}
	return <Route
		exact path={routeItem.url}
		key={idx}
		render={(props: { match: { params: Record<string, string> } }) => {
			// actualize current page & route params in AppState Store
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
		AvailableThemes.forEach(t => {
			window.document.body.classList.remove('theme-' + t);
		});
		window.document.body.classList.add('theme-' + AppStateStore.theme);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AppStateStore.theme]);

	return <Router>
		<RouteToStoreComponent/>

		<AppTopPanel/>

		<AppMainMenu position={AppStateStore.mainMenuPosition}/>

		<AppBreadcrumbs/>

		<AppPageNavigation/>

		<AppContainer>
			<Switch>
				{AppRoutes}
			</Switch>
		</AppContainer>

		<AppFooter/>
	</Router>;
});
