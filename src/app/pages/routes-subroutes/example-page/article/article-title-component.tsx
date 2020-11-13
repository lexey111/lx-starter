import React, {useEffect, useState} from 'react';
import {WaitTag} from '../../../../engine/components/ui/display/wait/wait-tag-component';
import useLocationParams from '../../../../engine/hooks/use-location-params';
import {exampleData} from '../example-data';

export const ArticleTitle: React.FC = () => {
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
};

