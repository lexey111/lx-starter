import React, {useCallback} from 'react';
import {TPerson} from '../../../store/examples/example-people-store/app-example-person';
import {PeopleFakeData} from './people-fake-data';

type TPeopleExampleListComponentProps = {
	activeId: string
	disabled: boolean
	onSelect: (id?: string) => void
};

export const PeopleExampleListComponent: React.FC<TPeopleExampleListComponentProps> =
	(props: TPeopleExampleListComponentProps) => {
		const selectRecord = useCallback((e: React.MouseEvent<HTMLTableRowElement>) => {
			props.onSelect(e.currentTarget.dataset['value']);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		return <table className={'no-borders active-records' + (props.disabled ? ' disabled' : '')}>
			<tbody>
			{PeopleFakeData.map((person: TPerson) => {
					return <tr
						key={person.id}
						onClick={selectRecord}
						data-value={person.id}
						className={person.id === props.activeId ? 'selected' : ''}>
						<td>
							{person.name.title} {person.name.last}, {person.name.first}
						</td>
					</tr>;
				}
			)}
			</tbody>
		</table>;
	};
