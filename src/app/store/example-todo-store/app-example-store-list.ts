import {makeAutoObservable} from 'mobx';

export type TAppExampleStoreItem = {
	_id?: string
	title: string
	completed: boolean
};

export interface TAppExampleStoreList {
	items: Array<TAppExampleStoreItem>
	hasItems: boolean

	add: (item: TAppExampleStoreItem) => void
	update: (item: TAppExampleStoreItem) => boolean
	remove: (id: string) => boolean
	toggle: (id: string) => void
}

export default class CAppExampleTodoStoreList implements TAppExampleStoreList {
	public items: Array<TAppExampleStoreItem> = [];

	constructor() {
		makeAutoObservable(this);
	}

	get hasItems(): boolean {
		return Boolean(this.items.length > 0);
	}

	add(item: TAppExampleStoreItem): void {
		this.items.push({
			...item,
			_id: '_' + Math.random().toString(36).substr(2, 9)
		});
	}

	remove(id: string): boolean {
		const idx = this.findItemById(id);
		if (idx === -1) {
			return false;
		}

		this.items.splice(idx, 1);
		return true;
	}

	toggle(id: string): void {
		const idx = this.findItemById(id);
		if (idx === -1) {
			return;
		}
		this.items[idx].completed = !this.items[idx].completed;
	}

	update(item: TAppExampleStoreItem): boolean {
		const idx = this.findItemById(item._id);
		if (idx === -1) {
			return false;
		}
		this.items[idx].completed = item.completed;
		this.items[idx].title = item.title;
		return true;
	}

	private findItemById(id?: string): number {
		if (!id) {
			return -1;
		}
		return this.items.findIndex(i => i._id === id);
	}
}
