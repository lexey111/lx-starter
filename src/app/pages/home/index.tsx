import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {AppSiteMap} from '../../../config/app-site-map';
import {ThemeSwitcher} from '../../components/ui/example-related/theme-switcher-component';
import {Button} from '../../components/ui/general/button/button-component';
import {Title} from '../../components/ui/general/typography/title-component';
import {TRouteMappingItem} from '../../routing/route-mapping-interface';
import {AppStateStore} from '../../store/@store';

function getRoutes(routes: Array<TRouteMappingItem>): Array<JSX.Element> {
	let result: Array<JSX.Element> = [];

	routes.forEach(route => {
		if (route.url.indexOf('/:') !== -1) {
			return;
		}
		if (!route.routes || route.routes.length === 0) {
			result.push(<li key={route.url}><Link to={route.url}>{route.title}</Link></li>);
			return;
		}
		const inner = getRoutes(route.routes);

		result.push(<li key={route.url}><Link to={route.url}>{route.title}</Link></li>);
		result = [...result, <ul key={'nested_' + route.url}>{...inner}</ul>];
	});

	return result;
}

export const HomePage: React.FC = observer(() => {
	const handleLogout = useCallback(() => {
		AppStateStore.setCurrentUser(false);
	}, []);

	return <>
		<Title>Starter kit</Title>

		<Title level={2}>Welcome</Title>
		<Title level={3}>UI variants</Title>

		<ThemeSwitcher/>

		<Title level={3}>Site tree</Title>

		<ul>
			{getRoutes(AppSiteMap).map(item => item)}
		</ul>

		{!AppStateStore.isAuthorized && <div>
			<Title level={4}>Login</Title>
			<p>Please log in with:</p>
			<Button type={'primary'} onClick={handleLogout}>Logout</Button>
		</div>}

		{AppStateStore.isAuthorized && <div>
			<Title level={4}>Logout</Title>
			<Button type={'primary'} onClick={handleLogout}>Logout</Button>
		</div>}
	</>;
});

