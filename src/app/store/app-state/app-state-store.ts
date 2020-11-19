import {action, computed, makeObservable, observable} from 'mobx';
import {TRouteMappingItem} from '../../../engine/routing/route-mapping-interface';
import {getStoredThemeCode, setStoredThemeCode} from '../../../engine/ui-components/theme-interface';

export type TAppStateStoreData = {
	currentRoute?: TRouteMappingItem | undefined // TRouteMappingItem
	currentParams?: Record<string, string> // http://url/:param1/:param2 -> {param1: 'some', param2: 'text'}
	currentLocation?: string // http://url/page1

	themeCode: string // TAppTheme.code

	_mainMenuPosition: string // 'side' | 'top'

	_pageActions?: JSX.Element | null // optional action(s) that will be displayed in the breadcrumbs on scroll

	_yScrollPos: number // technical one, needed to show breadcrumbs panel after scroll distance reached > 32px

	_topPanelHeight: number // technical one, needed to correct side menu position
	_topPanelClass: string // extra class assigned to top panel to customize appearance
	_topPanelType: 'default' | 'fixed' // behavior of top panel - scrollable with page or fixed position

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
	public _topPanelClass = '';
	public _topPanelType: 'default' | 'fixed' = 'default';

	public themeCode = 'default';

	public _mainMenuPosition: 'top' | 'side' = 'top';

	public isAuthorized = false;
	public isAuthorizationInProgress = false;
	public userId = '';
	public userName = '';
	public userImageUrl = '';

	constructor() {
		// initial theme
		this.themeCode = getStoredThemeCode();

		// menu position
		this._mainMenuPosition = localStorage.getItem('app-menu.position') === 'side' ? 'side' : 'top';

		makeObservable(this, {
			// currentRoute and currentParams must not be observable!
			currentLocation: observable,

			_pageActions: observable,

			_yScrollPos: observable,

			_topPanelHeight: observable,
			_topPanelClass: observable,
			_topPanelType: observable,

			themeCode: observable,

			_mainMenuPosition: observable,

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
		this.themeCode = setStoredThemeCode(value);
	};

	setMenuPosition = (value: string): void => {
		const v = value === 'side' ? 'side' : 'top';
		localStorage.setItem('app-menu.position', v);
		this._mainMenuPosition = v;
	};
}
