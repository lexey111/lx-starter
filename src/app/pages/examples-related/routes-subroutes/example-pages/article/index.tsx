import React from 'react';
import {Link} from 'react-router-dom';
import {LipsumPara} from '../../../../../../engine/ui-components/examples-related/lipsum';
import {IconArrowLeft} from '../../../../../../engine/ui-components/general/icons/icon-arrow-left-component';
import {IconFile} from '../../../../../../engine/ui-components/general/icons/icon-file-component';
import {Title} from '../../../../../../engine/ui-components/general/typography/title-component';
import useLocationParams from '../../../../../../engine/hooks/use-location-params';
import {exampleData} from '../example-data';
import {SecondaryPageContent} from '../secondary-page-content';

export const RoutingArticle: React.FC = () => {
	const location = useLocationParams();

	const article = exampleData
		.find(record => record.id.toString() === location.params?.articleId);

	if (!article) {
		return <>
			<Title>Article not found</Title>
			<p>
				<Link to={'/routing/example-pages/list-of-articles'}><IconArrowLeft/>&nbsp; Return to list</Link>
			</p>
		</>;
	}

	return <>
		<Title>
			<IconFile/>&nbsp; {article.title || location.params.articleId}
		</Title>

		<Title level={5}>Author{article && article.authors.length > 1 ? 's' : ''}</Title>
		<div>
			<ul>
				{article.authors.map(authorRecord => {
					return <li key={authorRecord.authorId}><Link
						to={'/routing/example-pages/list-of-articles/' + article.id.toString() + '/' + authorRecord.authorId}>
						{authorRecord.author}
					</Link></li>;
				})}
			</ul>
		</div>

		<Title level={6}>{article?.date || 'unknown date'}</Title>

		<LipsumPara/>

		<p>
			<Link to={'/routing/example-pages/list-of-articles'}><IconArrowLeft/>&nbsp; Return to list</Link>
		</p>

		<hr/>

		<SecondaryPageContent/>
	</>;
};

