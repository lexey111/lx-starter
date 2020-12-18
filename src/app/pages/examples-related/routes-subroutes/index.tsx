/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import {Link} from 'react-router-dom';
import {PageRelated} from '../../../../engine/layout/page/related/app-page-related-component';
import {Src} from '../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../engine/ui-components/examples-related/tag-component';
import {Title} from '../../../../engine/ui-components/general/typography/title-component';

const routeConfigFilename = 'src/config/app-site-map.tsx';

const AppLink = (): JSX.Element => <Src src={'src/app/@app.tsx'} inline/>;

// eslint-disable-next-line react/no-multi-comp
export const RoutingPage: React.FC = () => {
	return <>
		<Title>Routing</Title>

		<Title level={2} nav={'principles'}>Basic principles</Title>
		<p>
			Routes in the application have to be defined in the <Src src={routeConfigFilename} inline/> file.
			It is array of <code>TRouteMappingItems</code> objects:
		</p>

		<SyntaxHighlight content={`export type TRouteMappingItem = {
	url?: string // url to go - unique route id

	title?: string | JSX.Element // Menu item title or function which returns title
	subtitle?: string | JSX.Element // subtitle to show under the menu title line

	icon?: JSX.Element // icon component
	showIconInTopMenu?: boolean // default: true (if icon assigned)
	showTitleInTopMenu?: boolean // default: true, icon + title

	menuItem?: JSX.Element // entire menu item component
	menuItemExpandable?: boolean // if custom menu item is expandable
	page?: JSX.Element // page (component) to render
	topPanel?: JSX.Element // panel to be displayed above top menu (if layout uses top menu; or at page top otherwise)

	isHomePage?: boolean // is it Home page?
	isLoginPage?: boolean // is it Login page?

	onlyWhenAuthorized?: boolean
	onlyWhenNotAuthorized?: boolean

	breadcrumbs?: 'default' | 'none' | 'sub-menu'

	isLateral?: boolean // show it in the right/bottom menu? (default = false)

	pageClass?: string // extra class to add to container

	routes?: Array<TRouteMappingItem> // nested routes
};

export type TRouteMappingItems = Array<TRouteMappingItem> | never;`}/>

		<p>
			All the menu structures (<Link to={'/layout/main-menu'}>main menu</Link>, <Link to={'/layout/page-submenu'}>page submenu</Link>, <Link
			to={'/layout/breadcrumbs'}>breadcrumbs</Link>) and available routes are described
			by this structure. This is the core of application.
		</p>

		<Title level={3} nav={'nesting'}>Nesting</Title>
		<p>
			Routes could be nested into other routes:
		</p>

		<SyntaxHighlight content={`...{
	title: 'UI Components',
	url: '/ui',
	page: <UiPage/>,
	breadcrumbs: 'sub-menu',
	routes: [
		{
			title: 'General',
			url: '/ui/general',
			page: <UiGeneralPage/>
		},
		{
			title: 'Display',
			url: '/ui/display',
			page: <UiDisplayPage/>
		},
	]}, ...
`}/>
		<p>
			(Read more about <Link to={'/layout/page-submenu'}>breadcrumbs: 'sub-menu'</Link>)
		</p>

		<p>
			Application during bootstrapping phase makes own copy of routes:
		</p>

		<SyntaxHighlight
			title={'src/engine/routing/route-mapping.tsx'}
			content={'export const RouteMapping: TRouteMappingItems = flattenRoutes(AppSiteMap)'}/>

		<p>
			These routes are used across the application, e.g., <AppLink/> uses
			this flattened (1-level) structure to set up React <code>Router</code>:
		</p>

		<SyntaxHighlight content={`<Switch>
	{RouteMapping.map((routeItem: TRouteMappingItem, idx: number) => {
		return <Route
			exact path={routeItem.url}
			.../>
...}
</Switch>
`}/>

		<Title level={3} nav={'how_it_works'}>How it works</Title>
		<Title level={4}>Rendering</Title>

		<p>
			Aforementioned <AppLink/> provides routing structure. It gets
			the flattened array of routes and creates <Tag>Route</Tag> entries (see above).
		</p>

		<p>
			The most important part of each entry is <code>render</code> function:
		</p>

		<SyntaxHighlight
			title={'src/app/app-utils.tsx'}
			content={`<Route
	exact path={routeItem.url}
	key={idx}
	render={(props: { match: { params: Record<string, string> } }) => {
			// actualize current page & route params in AppState Store
			AppStateStore.setCurrentRoute(routeItem, props.match.params);
			// set document title
			if (typeof routeItem.title === 'string') {
				document.title = AppTitle + ' | ' + routeItem.title;
			} else {
				document.title = AppTitle;
			}

			// return page wrapper
			return <AppPage className={routeItem.pageClass}>{routeItem.page}</AppPage>;
	}
}/>`}/>

		<p>
			When some route is going to render corresponding <code>page</code>, it
		</p>
		<ol>
			<li>Sets up current route in App State store;</li>
			<li>Returns target page wrapped up with <Tag>AppPage</Tag>.</li>
		</ol>

		<p>
			First step is required for navigation-related things, like breadcrumbs or menus. Please pay attention:
			changed params (<code>item: TRouteMappingItem</code> and <code>props.match.params</code>) are
			not <b>observable</b>, so no re-rendering or events will be fired. It just setting up the data: activated
			item of <Src src={routeConfigFilename} inline/> and url params.
		</p>

		<p>
			Wrapper <Tag>AppPage</Tag> provides asynchronous rendering of the target page. Render is delayed a bit to
			finalize updates of navigation-related items (redrawing the menu, actualizing breadcrumbs etc.)
		</p>

		<p>
			<Tag>AppPage</Tag> uses
		</p>
		<SyntaxHighlight content={`public isAuthorized = false;
public isAuthorizationInProgress = false;
`}/>
		<p>
			fields of <code>AppStateStore</code>. It redirects to login route (if any) if current user
			isn't logged in, or displays the spinner if authorization in process, or target page if user authorized successfully.
		</p>

		<p>
			Read more about that on <Link to={'/routing/protected-routes'}>this page</Link>.
		</p>

		<Title level={4} nav={'routing_params'}>Routing params</Title>
		<p>
			There are some data related to currently displayed page:
		</p>

		<ul>
			<li><code>url</code>, current path, like '/routing/example-page',</li>
			<li><code>item: TRouteMappingItem</code>, current item,</li>
			<li><code>urlParams</code>, optional data encoded in the url.</li>
		</ul>

		<p>
			The last one is the most interesting.
		</p>

		<p>
			Route params should be declared in the configuration file, <code>url</code> field:
		</p>

		<SyntaxHighlight content={`{
	url: '/routing/example-pages/secondary-page/:id/:code',
	page: <RoutingSecondaryPage2/>,
	title: 'Secondary page (P)',
}
`} lines={2}/>

		<p>
			<Link to={'/routing/example-pages'}>Example pages and description of route params</Link>.
		</p>

		<p>
			But what if params changed? E.g., with pattern <code>page/:userId</code> actual URL could be
			<code>page/user1</code> and, then, navigation occurs and it goes to be <code>page/user2</code>.
		</p>

		<p>
			Route will not be changed because URL (pattern) is the same. So page data will not be updated as well.
		</p>

		<p>
			To solve the problem there is <Tag>RouteToStoreComponent</Tag> in the root markup of application.
			The component watches to url <i>pathname</i> change and updates the <code>currentLocation</code>
			field in <code>AppStateStore</code>.
		</p>

		<p>
			It means, if you want to react on params changes you may subscribe to
		</p>

		<SyntaxHighlight content={'public currentLocation = \'\';'}/>

		<p>
			field (it is observable), or, better, use <code>useLocationParams</code> hook:
		</p>

		<SyntaxHighlight content={`const location = useLocationParams();

useEffect(() => {

	// do something: request server,
	// get data somehow, invalidate etc. when articleId changes

}, [location.params.articleId]);
`}/>

		<PageRelated items={[
			{
				url: '/routing/protected-routes',
				title: 'Protected routes'
			},
			{
				url: '/login',
				title: 'Login form'
			},
			{
				url: '/layout/page',
				title: 'Page & Auth'
			},
			{
				url: '/layout/main-menu',
				title: 'Main menu'
			},
			{
				url: '/layout/page-submenu',
				title: 'Page sub-menu'
			},
			{
				url: '/layout/breadcrumbs',
				title: 'Breadcrumbs'
			},
			{
				url: '/state-management/app-state',
				title: 'AppState Store'
			},
			{
				url: '/routing/example-pages',
				title: 'Example pages'
			},
			{
				url: '/routing/example-pages/list-of-articles',
				title: 'List of Articles'
			},
		]}/>

	</>;
};

