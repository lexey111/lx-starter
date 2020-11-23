import {observer} from 'mobx-react';
import React, {useCallback, useEffect, useState} from 'react';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';
import {AppPersonStore} from '../../../../store/@stores';
import {PERSON_INITIAL, TPerson} from '../../../../store/examples/example-people-store/app-example-person';
import {_setData} from '../../../../store/utils/store-utils';
import {PeopleFakeData} from './people-fake-data';
import {PeopleExampleListComponent} from './people-list-component';
import {PersonCardComponent} from './person-card-component';

function findPersonById(id?: string): TPerson | undefined {
	return id
		? PeopleFakeData.find(person => person.id === id)
		: void 0;
}

export const PeopleExampleComponent: React.FC = observer(() => {
	const [currentPersonId, setCurrentPersonId] = useState('160680-9203');
	const [version, setVersion] = useState(0);

	useEffect(() => {
		// set initial person
		const person = findPersonById(currentPersonId);
		if (person) {
			AppPersonStore.setPerson(person);
		}
		return () => {
			// reset on exit
			AppPersonStore.resetPerson();
		};
	}, []);

	const setCurrentPerson = useCallback((id?: string): void => {
		// load data from the PeopleFakeData record to Person store
		setCurrentPersonId(id || '');
		const person = findPersonById(id);
		if (person) {
			AppPersonStore.setPerson(person);
		} else {
			AppPersonStore.resetPerson();
		}
	}, [setCurrentPersonId]);

	const doReset = useCallback(() => {
		// just load back data from PeopleFakeData record to Person store to
		// reset Card changes
		setCurrentPerson(currentPersonId);
	}, [currentPersonId]);

	const doSave = useCallback(() => {
		const person = findPersonById(currentPersonId);
		if (!person) {
			setCurrentPerson('');
			return;
		}
		if (person) {
			_setData(person, PERSON_INITIAL, AppPersonStore); // copy data to fake dataset
			setVersion(version + 1); // to force list update after save because PeopleFakeData is not observable
		}
		setCurrentPerson(currentPersonId);
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
					<PersonCardComponent onReset={doReset} onSave={doSave}/>
				</td>
			</tr>
			</tbody>
		</table>
	</div>;
});
