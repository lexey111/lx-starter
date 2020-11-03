import React from 'react';
import {A} from '../../../components/ui/example-related/a-component';
import {SourceFile} from '../../../components/ui/example-related/source-file-component';
import {SyntaxHighlight} from '../../../components/ui/example-related/syntax-highlight';
import {Title} from '../../../components/ui/general/typography/title-component';
import {PageSubmenu} from '../../../layout/page-submenu/page-submenu-component';
import {PeopleExampleComponent} from './people-component';

export const StateGenericStorePage: React.FC = () => {
	return <>
		<PageSubmenu/>
		<Title>Generic State store</Title>

		<Title level={2}>Overview</Title>
		<p>
			Usually when developer creates stores for many forms there are a lot of boilerplate
			code appears. To serve 'common needs' I created <SourceFile src={'src/app/store/utils/store-utils.ts'} inline={true}/>.
		</p>

		<p>
			The functions collected in the file help to process all the store lifecycle methods: initialization
			with empty state, updating particular fields. setting up the <code>changed</code> state
			and <code>version</code> etc.
		</p>

		<Title level={3}>Example</Title>
		<PeopleExampleComponent/>

		<Title level={2}>How it works</Title>
		<Title level={3}>Store</Title>
		<p>
			Let's start with creating Person Store. First, I declared data types:
		</p>
		<SyntaxHighlight
			title={'src/app/store/examples/example-people-store/app-example-person.ts'}
			content={`export type TPerson = {
	name: {
		title: string
		first: string
		last: string
	}
	location: {
		city: string
		state: string
		country: string
	}
	email: string
	phone: string
	cell: string
	id: string
};

export type TPeople = Array<TPerson>;

export const PERSON_INITIAL: TPerson = {
	name: {
		title: '',
		first: '',
		last: '',
	},
	location: {
		city: '',
		state: '',
		country: '',
	},
	email: '',
	phone: '',
	cell: '',
	id: ''
};`}/>

		<p>
			Pay attention: I also provide initial, or empty state, of data as a <code>PERSON_INITIAL</code> constant.
		</p>
		<p>
			Well, there is the Person Store declaration:
		</p>

		<SyntaxHighlight
			lines={[20, 21]}
			title={'src/app/store/examples/example-people-store/app-example-person.ts'}
			content={`import {makeAutoObservable} from 'mobx';
import {_resetData, _setData} from '../../utils/store-utils';

export default class CPeopleStore implements TPerson {
	public name = {
		title: '',
		first: '',
		last: ''
	};
	public location = {
		city: '',
		state: '',
		country: ''
	};
	public email = '';
	public phone = '';
	public cell = '';
	public id = '';

	public changed = false;
	public version = 0;

	constructor() {
		this.resetPerson();
		makeAutoObservable(this);
	}

	resetPerson(): void {
		_resetData(this, PERSON_INITIAL);
		this.changed = false;
		this.version = 0;
	}

	setPerson(person: TPerson): void {
		_setData(this, PERSON_INITIAL, person);
		this.changed = false;
		this.version = 0;
	}
}`}/>

		<p>
			Notice extra <code>changed</code> and <code>version</code> service fields (19, 20). I will
			explain it below.
		</p>
		<p>
			Here you can see the usage of <code>PERSON_INITIAL</code> and couple of utility functions:
			<code>_resetData</code> and <code>_setData</code>.
		</p>

		<p>
			These functions get the store as first parameter:
		</p>
		<SyntaxHighlight
			title={'src/app/store/utils/store-utils.ts'}
			content={`export function _setData<T, U, V>(target: T, template: U, data: V): void {...}

export function _resetData<T, U>(target: T, initialData: U): void {...}`}/>

		<p>
			Reset function is just a shortcut for <code>_setData(store, initialData, initialData)</code>, so all the magic is
			inside <code>_setData</code>. The function gets target store, template object and the data and, then,
			updates <code>store</code>'s fields with <code>data</code> values &mdash; but
			only fields present in the <code>template</code>.
		</p>

		<Title level={3}>List of persons</Title>
		<p>
			Here is a fake dataset, <SourceFile inline src={'src/app/pages/state-management/example-generic-store/people-fake-data.ts'}></SourceFile>.
		</p>

		<p>
			Let's assume we have got the data from an backend API.
		</p>

		<p>
			As I've already mentioned, here I use multi-store approach. It means data list component has own store which
			keeps the list data, but only if it has sense, i.e. for this example I don't use Store but do work directly
			with data. In a real application it could be some data service if you don't need reactivity or reach it
			some another way.
		</p>
		<p>
			The list store, or list component, has to set up the current item in the item store
			(here: The Person Store, <code>AppPersonStore</code>) when user selects a record.
		</p>

		<SyntaxHighlight
			title={'src/app/pages/state-management/example-generic-store/people-component.tsx'}
			content={`function findPersonById(id?: string): TPerson | undefined {
	return id
		? PeopleFakeData.find(person => person.id === id)
		: void 0;
}
...			
const [currentPersonId, setCurrentPersonId] = useState('160680-9203');

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
	}
}, [setCurrentPersonId]);
...
// src/app/pages/state-management/example-generic-store/people-list-component.tsx
// simplified
...
<tr
	key={person.id}
	onClick={() => setCurrentPerson(person.id))}
	className={person.id === currentPersonId ? 'selected' : ''}>
	<td>
		{person.name.title} {person.name.last}, {person.name.first}
	</td>
</tr>`}/>

		<p>
			So, List Component displays the, err, list of persons, and allows to select one. When current person is selected,
			its data loaded into Person Store fields by <code>AppPersonStore.setPerson(person)</code>.
		</p>

		<Title level={3}>Person's card</Title>
		<p>
			Here is the card of person component comes into.
		</p>

		<p>
			The component looks pretty straightforward (simplified a bit):
		</p>

		<SyntaxHighlight
			lines={[4, 5, 6, 7, 8, 9, 10, 11, 12, 28, 34, 35]}
			title={'src/app/pages/state-management/example-generic-store/person-card-component.tsx'}
			content={`import {observer} from 'mobx-react';
import React from 'react';
import {AppPersonStore} from '../../../store/@store';
	import {PersonCellInput} from './fields/input-cell-component';
	import {PersonLocationCityInput} from './fields/input-city-component';
	import {PersonLocationCountryInput} from './fields/input-country-component';
	import {PersonEmailInput} from './fields/input-email-component';
	import {PersonNameFirstInput} from './fields/input-first-component';
	import {PersonNameLastInput} from './fields/input-last-component';
	import {PersonPhoneInput} from './fields/input-phone-component';
	import {PersonLocationStateInput} from './fields/input-state-component';
	import {PersonNameTitleInput} from './fields/input-title-component';

export const PersonCardComponent: React.FC<TPersonCardComponentProps> =
	observer((props) => {
		return <div>
			<PersonNameTitleInput/>
			<PersonNameFirstInput/>
			<PersonNameLastInput/>
			<PersonEmailInput/>
			<PersonCellInput/>
			<PersonLocationCountryInput/>
			<PersonLocationStateInput/>
			<PersonLocationCityInput/>

				<Button
					onClick={props.onSave}
					disabled={!AppPersonStore.changed}>
					Save
				</Button>

				<Button
					onClick={props.onReset}
					disabled={!AppPersonStore.changed}>
					Reset ({AppPersonStore.version})
				</Button>
			</div>
		</div>;
	});
`}/>

		<p>
			Lines 28 and 34 explain why I've added <code>changed</code> field to store. Line 35 displays the change
			counter, <code>version</code> field. The field is very internal one and usually used by Validation Engine,
			if any, to track actual asynchronous validation.
		</p>

		<p>
			For example, if data validation runs on each data change with some debouncing, and if it is asynchronous process,
			there could be a race when validation results of state 'version 101' come after 'version 110'. The field
			allows to correctly decide which is actual or not.
		</p>

		<Title level={3}>Input components</Title>
		<p>
			Well, but who changes the data in the Store?
		</p>

		<p>
			Input components. Lines 4-12.
		</p>

		<p>
			Based on <A href={'https://mobx.js.org/react-optimizations.html#use-many-small-components'}>MobX recommendations</A>, I
			moved data changes tracking down to the most outer level: to the Inputs bound to particular Store's fields.
		</p>

		<SyntaxHighlight
			lines={[10, 17]}
			title={'src/app/pages/state-management/example-generic-store/fields/input-first-component.tsx'}
			content={`import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppPersonStore} from '../../../../store/@store';
import {handleStoreValue} from '../../../../store/utils/store-utils';

const fieldName = 'name.first';

export const PersonNameFirstInput: React.FC = observer(() => {
	const handleChange = useCallback((v) => {
		handleStoreValue(AppPersonStore, fieldName, v);
	}, []);

	return <input
		type={'text'}
		onChange={handleChange}
		value={AppPersonStore.name.first}
		/* or value={getNestedObject(AppPersonStore, fieldName) as string} */
		maxLength={256}/>;
});`}/>

		<p>
			Line 10 demonstrates usage of <code>handleStoreValue</code> function from the utils. Th function
			gets store, field name (even nested, like <code>name.first</code>) and the value &mdash; and
			updates the corresponding field in the store, voilà!
		</p>

		<p>
			Also function is responsible of updating <code>change</code> field and
			increasing <code>version</code> field.
		</p>

		<p>
			Line 17: data access could be a bit more abstract, via <code>getNestedObject</code> function which is
			able to react nested object's field by string path, like 'name.title'. Of course, with such functions
			you're able to create abstract factories for Inputs.
		</p>

	</>;
};
