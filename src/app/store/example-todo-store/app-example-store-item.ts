import {makeAutoObservable} from 'mobx';
import {TAppExampleStoreRecord} from './app-example-store';

export default class CAppExampleTodoStoreItem implements TAppExampleStoreRecord {
	public _id?: string = '';
	public title = '';
	public completed = false;

	constructor() {
		makeAutoObservable(this);
	}

	get getItem(): TAppExampleStoreRecord {
		return {
			_id: this._id,
			title: this.title,
			completed: this.completed,
		};
	}

	initNewItem(): void {
		this._id = void 0;
		this.title = '';
		this.completed = false;
	}

	setItem(item: TAppExampleStoreRecord): void {
		this._id = item._id;
		this.title = item.title;
		this.completed = item.completed;
	}
}
