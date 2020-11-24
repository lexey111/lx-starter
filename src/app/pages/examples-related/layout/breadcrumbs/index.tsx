/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import {Link} from 'react-router-dom';
import {PageRelated} from '../../../../../engine/layout/page/related/app-page-related-component';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

const TypingsFile = 'src/engine/routing/route-mapping-interface.tsx';

export const BreadcrumbsPage: React.FC = () => {
	return <>

		<Title nav={'Overview'}>Breadcrumbs</Title>
		<Src src={'src/engine/layout/breadcrumbs/breadcrumbs-component.tsx'}/>

		<p>
			Component displays the breadcrumb panel with "navigation pills" &mdash; or <Link to={'/layout/page-submenu'}>page submenu</Link>.
		</p>
		<p>
			In Breadcrumb mode component reacts to page scrolling and displays bottom border after some distance. It uses
			<code>_yScrollPos</code> field of <Src src={'src/app/store/app-state/app-state-store.ts'} inline/>.
		</p>

		<Title level={2} nav={'how_it_works'}>How it works</Title>

		<p>
			Component is subscribed to current route changes. On change event component determines current active item
			from <Src src={'src/config/app-site-map.tsx'} inline/> file and the path to the item.
		</p>

		<p>
			Then the component tries to resolve all the chain (nesting) and displays the parts that were resolved.
			Resolving means "<i>component is able to determine route (1) and title (2) of particular element</i>".
		</p>

		<Title nav={'examples'} level={3}>Examples</Title>
		<ul>
			<li><Link to={'/routing/example-pages/list-of-articles/1'}>Particular article (exists)</Link></li>
			<li><Link to={'/routing/example-pages/list-of-articles/1/Aaa'}>Author of the article (exists)</Link></li>

			<li><Link to={'/routing/example-pages/list-of-articles/xxx'}>Non-existing article (bad Id)</Link></li>
			<li><Link to={'/routing/example-pages/list-of-articles/1/xxx'}>Good article, bad author</Link></li>
			<li><Link to={'/routing/example-pages/list-of-articles/abc/xyz'}>Invalid article, invalid author</Link></li>
		</ul>

		<p>
			Try to open <Link to={'/routing/example-pages/list-of-articles'}>full list</Link> and click to links in
			"Article name" and "Author" columns. Pay attention to breadcrumb items.
		</p>

		<p>
			So, the mandatory conditions to display the breadcrumbs are:
		</p>

		<ol>
			<li>
				<code>breadcrumbs</code> field of base route (current page) does not set or set to 'default':

				<SyntaxHighlight
					lines={4}
					title={TypingsFile}
					content={`export type TRouteMappingItem = {
	url?: string // url to go - unique route id
	title?: string | JSX.Element // Menu item title or function which returns title
	breadcrumbs?: 'default' | 'none' | 'sub-menu'
...};`}/>

			</li>

			<li>
				Particular part of route has <code>title</code> defined. <code>title</code> could be a string or a component.
			</li>
		</ol>

		<Title nav={'custom_pills'} level={3}>Custom pills</Title>
		<p>
			In case <code>title</code> come as a string, Breadcrumb component will display the string as a link to corresponding url.
			This is default mode.
		</p>

		<p>
			If <code>title</code> is a <code>JSX.Element</code> &mdash; Breadcrumb component will display it as is.
		</p>

		<p>
			<Link to={'/routing#routing_params'}>Parameterized parts</Link> of route should use <code>JSX.Element</code> as a title,
			because component is not able to determine the correct route. So it is up to developer to display valid content.
		</p>

		<p>
			E.g., route defined as
		</p>

		<SyntaxHighlight
			title={'src/config/app-site-map.tsx'}
			lines={4}
			content={`{
	url: '/routing/example-pages/list-of-articles/:articleId',
	page: <RoutingArticle/>,
	title: <ArticleTitle/>,
},
`}/>
		<p>
			has the title component:
		</p>

		<SyntaxHighlight
			title={'src/app/pages/examples-related/routes-subroutes/example-pages/article/article-title-component.tsx'}
			content={`export const ArticleTitle: React.FC = () => {
	const location = useLocationParams();
	const [articleName, setArticleName] = useState('');
	const [tagType, setTagType] = useState<'default' | 'danger'>('default');

	useEffect(() => {
		const delayedFakeName = setTimeout(() => {
			// getting the name from server...
			const article = exampleData
				.find(record => record.id.toString() === location.params?.articleId);

			let name = article ? article.title + ', ' + article.date : location.params.articleId;

			if (name?.length > 30) {
				name = name.substring(0, 29) + '...';
			}

			if (!article) {
				setTagType('danger');
			}

			setArticleName(name);
		}, 800);

		return () => {
			setArticleName('');
			clearTimeout(delayedFakeName);
		};
	}, [location.params.articleId]);

	return <span>Article: <WaitTag showSpinner={true} type={tagType}>{articleName}</WaitTag></span>;
};`}/>

		<p>
			The component uses <Link to={'/ui/display#tag-wait'}>WaitTag</Link> component to display its
			content and <code>useLocationParams()</code> hook to request data from server.
		</p>

		<Title nav={'use_location_params'} level={3}>useLocationParams</Title>

		<p>
			The hook is pretty simple:
		</p>

		<SyntaxHighlight
			title={'src/engine/hooks/use-location-params.tsx'}
			content={`type TURLParams = {
	url: string
	params: Record<string, string>
	route: TRouteMappingItem | undefined
};
`}/>
		<p>
			It subscribes to route params change and returns them. So custom Title component is able to determine required parameter:
		</p>

		<SyntaxHighlight content={`...
.find(record => record.id.toString() === location.params?.articleId);
`}/>

		<Title nav={'page_actions'} level={3}>Page actions</Title>
		<p>
			Breadcrumbs component supports one interesting feature: Page actions.
		</p>

		<p>
			The thing means
			<i>"when page scrolls down for more than 32 pixels - display the content of <code>AppStateStore._pageActions</code>, if any"</i>
		</p>

		<p>
			<Link to={'/layout/breadcrumbs/page-actions'}>This page</Link> is very simple example of it.
		</p>

		<p>
			Try to open <Link to={'/routing/example-pages/list-of-articles'}>full list</Link> and click to links in
		</p>

		<PageRelated items={[
			{
				url: '/routing/example-pages/list-of-articles',
				title: 'Example List'
			},
			{
				url: '/layout/breadcrumbs/page-actions',
				title: 'Page actions'
			},
			{
				url: '/layout/page-submenu',
				title: 'Page submenu'
			},
		]}/>

	</>;
};
