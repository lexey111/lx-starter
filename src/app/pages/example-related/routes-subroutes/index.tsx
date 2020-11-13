import React from 'react';
import {Link} from 'react-router-dom';
import {SourceFile} from '../../../engine/ui-components/example-related/source-file-component';
import {SyntaxHighlight} from '../../../engine/ui-components/example-related/syntax-highlight';
import {Tag} from '../../../engine/ui-components/example-related/tag-component';
import {Title} from '../../../engine/ui-components/general/typography/title-component';

const routeConfigFilename = 'src/config/app-site-map.tsx';

export const RoutingPage: React.FC = () => {
	return <>
		<Title>Routing</Title>

		<Title level={2} nav={'principles'}>Basic principles</Title>
		<p>
			Routes in the application have to be defined in the <SourceFile src={routeConfigFilename} inline/> file.
			It is array of <code>TRouteMappingItems</code> objects:
		</p>

		<SyntaxHighlight content={`export type TRouteMappingItem = {
	url: string // url to go - unique route id

	title?: string | JSX.Element // Menu item title or function which returns title
	subtitle?: JSX.Element // subtitle to show under the menu title line
	icon?: JSX.Element // icon component
	page: JSX.Element // page (component) to render

	isHomePage?: boolean // is it Home page?
	isLoginPage?: boolean // is it Login page?

	onlyWhenLoggedIn?: boolean
	onlyWhenLoggedOut?: boolean

	spinnerDuringLogin?: boolean

	breadcrumbs?: 'default' | 'none' | 'sub-menu'

	isLateral?: boolean // show it in the right/bottom menu? (default = false)

	pageClass?: string // extra class to add to container

	routes?: Array<TRouteMappingItem> // nested routes
};

export type TRouteMappingItems = Array<TRouteMappingItem> | never;`}/>

		<p>
			As you can see, only <code>url</code> and <code>page</code> are mandatory. It's obvious, first one is the route
			id and second one is corresponding page.
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
			breadcrumbs: 'sub-menu',
			page: <UiGeneralPage/>
		},
		{
			title: 'Display',
			url: '/ui/display',
			breadcrumbs: 'sub-menu',
			page: <UiDisplayPage/>
		},
	]}, ...
`}/>

		<p>
			Application during bootstrapping phase makes own copy of routes:
		</p>

		<SyntaxHighlight
			title={'src/config/app-site-map.tsx'}
			content={'export const RouteMapping: TRouteMappingItems = flattenRoutes(AppSiteMap)'}/>

		<p>
			These routes are used across the application, e.g., <SourceFile src={'src/app/@app.tsx'} inline/> uses
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

		<Title level={3} nav={'how-it-works'}>How it works</Title>
		<Title level={4}>Rendering</Title>

		<p>
			Aforementioned <SourceFile src={'src/app/@app.tsx'} inline/> provides routing structure. It gets
			the flattened array of routes and creates <code>&lt;Route&gt;</code> entries (see above).
		</p>

		<p>
			Very important part of the entry is <code>render</code> function:
		</p>

		<SyntaxHighlight content={`<Route
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
}/>`}/>

		<p>
			When some route is going to render corresponding <code>page</code>, it
		</p>
		<ol>
			<li>Sets up current route in App State store;</li>
			<li>Returns target page wrapped up with <Tag>AppPage</Tag> or <Tag>AppAuthPage</Tag>.</li>
		</ol>

		<p>
			First step is required for navigation-related things, like breadcrumbs or menus. Please pay attention:
			changed params (<code>item: TRouteMappingItem</code> and <code>props.match.params</code>) are
			not <b>observable</b>, so no re-rendering or events will be fired. It just setting up the data: activated
			item of <SourceFile src={routeConfigFilename} inline/> and url params.
		</p>

		<p>
			Wrapper <Tag>AppPage</Tag> provides asynchronous rendering of the target page. Render is delayed a bit to
			finalize updates of navigation-related items (redrawing the menu, actualizing breadcrumbs etc.)
		</p>

		<p>
			Component <Tag>AppAuthPage</Tag> uses
		</p>
		<SyntaxHighlight content={`public isAuthorized = false;
public isAuthorizationInProgress = false;
`}/>
		<p>
			fields of <code>AppStateStore</code>. It redirects to login route (if any) if current user
			isn't logged in, or displays the spinner if authorization in process, or target page if user authorized successfully.
		</p>

		<Title level={4} nav={'routing-params'}>Routing params</Title>
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
	url: '/routing/example-page/secondary-page/:id/:code',
	page: <RoutingSecondaryPage2/>,
	title: 'Secondary page (P)',
}
`} lines={2}/>

		<p>
			<Link to={'/routing/example-page'}>Example page and description of route params</Link>.
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

	</>;
};

