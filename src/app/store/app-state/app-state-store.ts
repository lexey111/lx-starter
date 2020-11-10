import {action, computed, makeObservable, observable} from 'mobx';
import {TRouteMappingItem} from '../../routing/route-mapping-interface';

export const AvailableThemes = ['default', 'dark'] as const;
type TypeOfAvailableThemes = typeof AvailableThemes[number];

export type TAppStateStoreData = {
	currentRoute?: TRouteMappingItem | undefined // TRouteMappingItem
	currentParams?: Record<string, string> // http://url/:param1/:param2 -> {param1: 'some', param2: 'text'}
	currentLocation?: string // http://url/page1

	theme: TypeOfAvailableThemes
	mainMenuPosition: string // 'side' | 'top'

	_pageActions?: JSX.Element | null // optional action(s) that will be displayed in the breadcrumbs on scroll
	_yScrollPos: number // technical one, needed to show breadcrumbs panel after scroll distance reached > 32px
	_topPanelHeight: number // technical one, needed to correct side menu position

	isAuthorized: boolean // is current user logged in
	isAuthorizationInProgress: boolean
	userId: string
	userName: string
	userImageUrl: string
};

export default class CAppStateStore implements TAppStateStoreData {
	public currentRoute: TRouteMappingItem | undefined;
	public currentParams: Record<any, any> = {};
	public currentLocation = '';

	public _pageActions: JSX.Element | null = null;
	public _yScrollPos = 0;
	public _topPanelHeight = 0;

	public theme: TypeOfAvailableThemes = 'default';
	public mainMenuPosition = 'top';

	public isAuthorized = false;
	public isAuthorizationInProgress = false;
	public userId = '';
	public userName = '';
	public userImageUrl = '';

	constructor() {
		// initial theme
		const value = localStorage.getItem('app-theme') || 'default';
		if (AvailableThemes.includes(value as TypeOfAvailableThemes)) {
			this.theme = value as TypeOfAvailableThemes;
		}

		this.mainMenuPosition = localStorage.getItem('app-menu.position') === 'side' ? 'side' : 'top';

		makeObservable(this, {
			// currentRoute and currentParams must not be observable!
			currentLocation: observable,

			_pageActions: observable,
			_yScrollPos: observable,
			_topPanelHeight: observable,

			theme: observable,
			mainMenuPosition: observable,

			isAuthorized: observable,
			isAuthorizationInProgress: observable,
			userId: observable,
			userName: observable,
			userImageUrl: observable,

			hasActions: computed,

			setYScrollPos: action,
			setPageAction: action,
			resetPageAction: action,

			setCurrentRoute: action,
			setLocation: action,

			setAuthInProgress: action,
			setCurrentUser: action,
			setTheme: action
		});
	}

	get hasActions(): boolean {
		return Boolean(this._pageActions);
	}

	setAuthInProgress = (state: boolean): void => {
		this.isAuthorizationInProgress = state;
	};

	setCurrentUser = (
		isAuthorized: boolean,
		userId = '',
		userName = '',
		userImageUrl = ''): void => {

		if (!isAuthorized || !userId) {
			this.isAuthorized = false;
			this.userId = '';
			this.userName = '';
			this.userImageUrl = '';
			return;
		}

		this.isAuthorized = true;
		this.userId = userId;
		this.userName = userName;
		this.userImageUrl = userImageUrl;
	};

	setPageAction = (content: JSX.Element): void => {
		this._pageActions = content;
	};

	setCurrentRoute = (
		route: TRouteMappingItem | undefined,
		params: Record<any, any>
	): void => {
		this.currentRoute = route;
		this.currentParams = params;
	};

	setYScrollPos = (pos: number): void => {
		this._yScrollPos = pos;
	};

	setLocation = (location: string): void => {
		this.currentLocation = location;
	};

	resetPageAction = (): void => {
		this._pageActions = null;
	};

	setTheme = (value: string): void => {
		let themeName = 'default';
		if (AvailableThemes.includes(value as TypeOfAvailableThemes)) {
			themeName = value;
		}
		localStorage.setItem('app-theme', themeName);
		this.theme = themeName as TypeOfAvailableThemes;
	};

	setMenuPosition = (value: string): void => {
		if (value !== 'top') {
			value = 'side';
		}
		localStorage.setItem('app-menu.position', value);
		this.mainMenuPosition = value;
	};
}
