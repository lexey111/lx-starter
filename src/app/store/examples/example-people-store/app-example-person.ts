import {makeAutoObservable} from 'mobx';
import {_resetData, _setData} from '../../utils/store-utils';

export type TPerson = {
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
};

export default class CPeopleStore implements TPerson {
	public gender = 'male';
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
}
