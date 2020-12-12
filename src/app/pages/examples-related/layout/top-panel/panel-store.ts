import {makeAutoObservable} from 'mobx';

class CExampleTopPanelStore {
	public visible = true;
	public type: 'default' | 'fixed' = 'fixed';

	constructor() {
		makeAutoObservable(this);
	}
}

export const ExampleTopPanelStore = new CExampleTopPanelStore();
