import {makeAutoObservable} from 'mobx';

export type TNavigationItem = {
	title: string
	targetId: string
	isActive: boolean
};

export type TNavigationItems = Array<TNavigationItem>;

export default class CAppPageNavigationStore {
	public items: TNavigationItems = [];
	public activeItemId = '';

	constructor() {
		makeAutoObservable(this);
	}

	get hasItems(): boolean {
		return Boolean(this.items.length > 0);
	}

	register = (anchor: TNavigationItem): void => {
		if (this.items.find(x => x.targetId === anchor.targetId)) {
			return;
		}
		this.items.push({...anchor});
	};

	unregister = (targetId: string): void => {
		const idx = this.items.findIndex(x => x.targetId === targetId);
		if (idx === -1) {
			return;
		}
		this.items.splice(idx, 1);
	};

	reset(): void {
		this.items.length = 0;
		this.activeItemId = '';
	}
}

