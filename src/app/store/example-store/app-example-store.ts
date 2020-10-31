import {makeAutoObservable} from 'mobx';

export type TAppExampleStoreRecord = {
	_id?: string
	title: string
	completed: boolean
};

export interface TAppExampleStoreData {
	items: Array<TAppExampleStoreRecord>
	hasItems: boolean

	add: (item: TAppExampleStoreRecord) => void
	update: (item: TAppExampleStoreRecord) => boolean
	remove: (id: string) => boolean
	toggle: (id: string) => void
}

export default class CAppExampleStore implements TAppExampleStoreData {
	public items: Array<TAppExampleStoreRecord> = [];

	constructor() {
		makeAutoObservable(this);
	}

	get hasItems(): boolean {
		return Boolean(this.items.length > 0);
	}

	add(item: TAppExampleStoreRecord): void {
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

	update(item: TAppExampleStoreRecord): boolean {
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
