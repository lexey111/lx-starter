import React, {useEffect, useState} from 'react';
import {WaitTag} from '../../../../../engine/ui-components/display/wait/wait-tag-component';
import useLocationParams from '../../../../../engine/hooks/use-location-params';
import {exampleData} from '../example-data';

export const AuthorTitle: React.FC = () => {
	const location = useLocationParams();
	const [authorName, setAuthorName] = useState('');
	const [tagType, setTagType] = useState<'success' | 'danger'>('success');

	useEffect(() => {
		const delayedFakeName = setTimeout(() => {
			// getting the name from server...
			const article = exampleData
				.find(record => record.id.toString() === location.params?.articleId);

			let author = article
				? article.authors.find(record => record.authorId === location.params?.authorId)?.author || 'unknown author'
				: location.params.authorId;

			if (author?.length > 30) {
				author = author.substring(0, 29) + '...';
			}

			if (!article) {
				setTagType('danger');
			}

			setAuthorName(author);
		}, 1000);

		return () => {
			setAuthorName('');
			clearTimeout(delayedFakeName);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.params.articleId]);

	return <span>by <WaitTag showSpinner={true} type={tagType}>{authorName}</WaitTag></span>;
};

