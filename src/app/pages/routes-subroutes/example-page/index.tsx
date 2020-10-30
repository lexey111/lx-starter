import React from 'react';
import {Link} from 'react-router-dom';
import {A} from '../../../components/ui/example-related/a-component';
import {SourceFile} from '../../../components/ui/example-related/source-file-component';
import {SyntaxHighlight} from '../../../components/ui/example-related/syntax-highlight';
import {Tag} from '../../../components/ui/example-related/tag-component';
import {Title} from '../../../components/ui/general/typography/title-component';

export const RoutingMainPage: React.FC = () => {
	return <>
		<Title>Routing: example</Title>
		<p>
			There is a <Link to={'/routing/example-page/list-of-articles'}>List of articles</Link>. The source of the titles
			is <A href={'https://www.americanscientist.org/blog/from-the-staff/2019s-most-popular-articles'}>American Scientist</A>.
		</p>

		<p>
			Example serves routes like <code>/routing/example-page/list-of-articles/:articleId/:authorId</code>.
			This is how they are declared in the config:
		</p>

		<SyntaxHighlight content={`{
	url: '/routing/example-page',
	page: <RoutingMainPage/>,
	title: 'Example page',
	routes: [
		{
			url: '/routing/example-page/list-of-articles',
			page: <RoutingListOfArticles/>,
			title: 'List of articles',
		},
		{
			url: '/routing/example-page/list-of-articles/:articleId',
			page: <RoutingArticle/>,
			title: <ArticleTitle/>,
		},
		{
			url: '/routing/example-page/list-of-articles/:articleId/:authorId',
			page: <RoutingArticleAuthor/>,
			title: <AuthorTitle/>,
		}
	]
},
`}/>

		<ul>
			<li><Link to={'/routing/example-page/list-of-articles/1'}>Particular article (exists)</Link></li>
			<li><Link to={'/routing/example-page/list-of-articles/1/Aaa'}>Author of the article (exists)</Link></li>

			<li><Link to={'/routing/example-page/list-of-articles/xxx'}>Non-existing article (bad Id)</Link></li>
			<li><Link to={'/routing/example-page/list-of-articles/1/xxx'}>Good article, bad author</Link></li>
			<li><Link to={'/routing/example-page/list-of-articles/abc/xyz'}>Invalid article, invalid author</Link></li>

		</ul>

		<p>
			Try to open <Link to={'/routing/example-page/list-of-articles'}>full list</Link> and click to links in
			"Article name" and "Author" columns. Pay attention to breadcrumb items.
		</p>

		<Title level={3}>Breadcrumb items</Title>
		<p>
			To implement active breadcrumb item uou just need to assign React component to the <code>title</code> field in
			<SourceFile src={'src/config/app-routes.tsx'} inline/> file:
		</p>

		<SyntaxHighlight lines={4} content={`{
	url: '/routing/example-page/list-of-articles/:articleId/:authorId',
	page: <RoutingArticleAuthor/>,
	title: <AuthorTitle/>,
}
`}/>
		<p>
			The component has to implement internal logic to get the actual data and return it wrapped in <Tag>span</Tag> tag (31).
		</p>

		<SyntaxHighlight lines={31} content={`export const ArticleTitle: React.FC = () => {
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
			This example component emulates server request with <code>setTimeout</code> and, then, assign the retrieved values
			and style.
		</p>
	</>;
};

