import React from 'react';
import {Link} from 'react-router-dom';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';
import {exampleData} from '../example-data';

export const RoutingListOfArticles: React.FC = () => {
	return <>
		<Title>List of articles</Title>
		<table>
			<thead>
			<tr>
				<th>Article name</th>
				<th>Date</th>
				<th>Author</th>
			</tr>
			</thead>
			<tbody>
			{exampleData.map(record => {
				return <tr key={record.id}>
					<td>
						<b>
							<Link to={'/routing/example-pages/list-of-articles/' + record.id.toString()}>{record.title}</Link>
						</b>
					</td>

					<td>
						<ul>
							{record.authors.map(authorRecord => {
								return <li key={authorRecord.authorId}><Link
									to={'/routing/example-pages/list-of-articles/' + record.id.toString() + '/' + authorRecord.authorId}>
									{authorRecord.author}
								</Link></li>;
							})}
						</ul>
					</td>

					<td>{record.date}</td>
				</tr>;
			})}
			</tbody>
		</table>
	</>;
};
