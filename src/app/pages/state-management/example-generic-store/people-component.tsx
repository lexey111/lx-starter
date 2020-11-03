import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useState} from 'react';
import {Title} from '../../../components/ui/general/typography/title-component';
import {AppPersonStore} from '../../../store/@store';
import {PERSON_INITIAL} from '../../../store/examples/example-people-store/app-example-person';
import {_setData} from '../../../store/utils/store-utils';
import {PeopleFakeData} from './people-fake-data';
import {PeopleExampleListComponent} from './people-list-component';
import {PersonCardComponent} from './person-card-component';

export const PeopleExampleComponent: React.FC = observer(() => {
	const [currentPersonId, setCurrentPersonId] = useState('');
	const [version, setVersion] = useState(0);

	useEffect(() => {
		return () => {
			// reset on exit
			AppPersonStore.initNewPerson();
		};
	}, []);

	const setCurrentPerson = useCallback((id?: string): void => {
		setCurrentPersonId(id || '');
		const person = PeopleFakeData.find(p => p.id === id);
		if (person) {
			AppPersonStore.setPerson(person);
		}
	}, [setCurrentPersonId]);

	const doReset = useCallback(() => {
		setCurrentPerson(currentPersonId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPersonId]);

	const doSave = useCallback(() => {
		const person = PeopleFakeData.find(p => p.id === currentPersonId);
		if (!person) {
			setCurrentPerson(currentPersonId);
			return;
		}
		if (person) {
			_setData(person, PERSON_INITIAL, AppPersonStore);
			setVersion(version + 1); // to force update
		}
		setCurrentPerson(currentPersonId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPersonId, version]);

	return <div className={'example-component-container'}>
		<Title level={2} subTitle={'Select record and start editing'}>Personal info</Title>

		<table className={'no-borders'}>
			<tbody>
			<tr>
				<td style={{
					width: '200px',
					verticalAlign: 'top'
				}} className={AppPersonStore.changed ? 'disabled-cell' : ''}>
					<PeopleExampleListComponent
						disabled={AppPersonStore.changed}
						onSelect={setCurrentPerson} activeId={currentPersonId}/>
				</td>
				<td>
					{!currentPersonId && <div className={'example-centered-full'}>
						Please select the person
					</div>}
					{currentPersonId && <PersonCardComponent onReset={doReset} onSave={doSave}/>}
				</td>
			</tr>
			</tbody>
		</table>
	</div>;
});
