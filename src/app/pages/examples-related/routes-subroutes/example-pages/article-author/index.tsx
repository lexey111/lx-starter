/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import {Link} from 'react-router-dom';
import useLocationParams from '../../../../../../engine/hooks/use-location-params';
import {LipsumPara} from '../../../../../../engine/ui-components/examples-related/lipsum';
import {Icon} from '../../../../../../engine/ui-components/general/icons/icon-component';
import {Title} from '../../../../../../engine/ui-components/general/typography/title-component';
import {exampleData} from '../example-data';
import {SecondaryPageContent} from '../secondary-page-content';

const listOfArticlesUrl = '/routing/example-pages/list-of-articles';

export const RoutingArticleAuthor: React.FC = () => {
	const location = useLocationParams();

	const article = exampleData.find(record => record.id.toString() === location.params?.articleId);

	const author = article
		? article.authors.find(record => record.authorId === location.params?.authorId)?.author
		: location.params.authorId;

	if (!article) {
		return <>
			<Title>Article not found</Title>
			<p>
				<Link to={listOfArticlesUrl}><Icon type={'arrow-left'}/>&nbsp; Return to list</Link>
			</p>
		</>;
	}

	if (!author) {
		return <>
			<Title>Author not found</Title>
			<p>
				<Link to={listOfArticlesUrl}><Icon type={'arrow-left'}/>&nbsp; Return to list</Link>
			</p>
			<p>
				<Link to={listOfArticlesUrl + '/' + article.id.toString()}><Icon type={'arrow-left'}/>&nbsp; Return to article</Link>
			</p>
		</>;
	}

	return <>
		<div className={'example-avatar'}>
			<Icon type={'user'}/>
			<div>{author}</div>
		</div>

		<Title level={5}>
			Author of &nbsp; <i>{article.title}</i>
		</Title>

		<LipsumPara/>

		<p>
			<Link to={listOfArticlesUrl}><Icon type={'arrow-left'}/>&nbsp; Return to list</Link>
		</p>
		<p>
			<Link to={listOfArticlesUrl + '/' + article.id.toString()}><Icon type={'arrow-left'}/>&nbsp; Return to article</Link>
		</p>

		<hr/>
		<SecondaryPageContent/>
	</>;

};

