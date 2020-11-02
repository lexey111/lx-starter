import {makeAutoObservable} from 'mobx';
import {TAppExampleStoreItem} from './app-example-store-list';

export default class CAppExampleTodoStoreItem implements TAppExampleStoreItem {
	public _id?: string = '';
	public title = '';
	public completed = false;

	constructor() {
		makeAutoObservable(this);
	}

	get getItem(): TAppExampleStoreItem {
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

	setItem(item: TAppExampleStoreItem): void {
		this._id = item._id;
		this.title = item.title;
		this.completed = item.completed;
	}
}
