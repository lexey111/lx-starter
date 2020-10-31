import React from 'react';
import {Link} from 'react-router-dom';
import {LipsumPara} from '../../../../components/ui/example-related/lipsum';
import {IconArrowLeft} from '../../../../components/ui/general/icons/icon-arrow-left-component';
import {IconUser} from '../../../../components/ui/general/icons/icon-user-component';
import {Title} from '../../../../components/ui/general/typography/title-component';
import useLocationParams from '../../../../hooks/use-location-params';
import {exampleData} from '../example-data';
import {SecondaryPageContent} from '../secondary-page-content';

const listOfArticlesUrl = '/routing/example-page/list-of-articles';

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
				<Link to={listOfArticlesUrl}><IconArrowLeft/>&nbsp; Return to list</Link>
			</p>
		</>;
	}

	if (!author) {
		return <>
			<Title>Author not found</Title>
			<p>
				<Link to={listOfArticlesUrl}><IconArrowLeft/>&nbsp; Return to list</Link>
			</p>
			<p>
				<Link to={listOfArticlesUrl + '/' + article.id.toString()}><IconArrowLeft/>&nbsp; Return to article</Link>
			</p>
		</>;
	}

	return <>
		<div className={'example-avatar'}>
			<IconUser/>
			<div>{author}</div>
		</div>

		<Title level={5}>Author of &nbsp; <i>{article.title}</i></Title>

		<LipsumPara/>

		<p>
			<Link to={listOfArticlesUrl}><IconArrowLeft/>&nbsp; Return to list</Link>
		</p>
		<p>
			<Link to={listOfArticlesUrl + '/' + article.id.toString()}><IconArrowLeft/>&nbsp; Return to article</Link>
		</p>

		<hr/>
		<SecondaryPageContent/>
	</>;

};

