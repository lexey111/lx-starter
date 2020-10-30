import {action, computed, makeObservable, observable} from 'mobx';
import {TRouteMappingItem} from '../../routing/route-mapping-interface';

export type TAppStateStoreData = {
	currentRoute?: TRouteMappingItem | undefined // TRouteMappingItem
	currentParams?: Record<string, string> // http://url/:param1/:param2 -> {param1: 'some', param2: 'text'}
	currentLocation?: string // http://url/page1

	serverError?: string // just to pass to global error page

	pageActions?: JSX.Element | null // optional action(s) that will be displayed in the breadcrumbs on scroll
	yScrollPos?: number // technical one, needed to show breadcrumbs panel after scroll distance reached > 32px

	isAuthorized: boolean
	isAuthorizationInProgress: boolean
	userId: string
	userName: string
	userImageUrl: string
};

export const AvailableThemes = ['dark', 'light'];

export default class CAppStateStore implements TAppStateStoreData {
	public currentRoute: TRouteMappingItem | undefined;
	public currentParams: Record<any, any> = {};
	public currentLocation = '';

	public serverError = '';
	public pageActions: JSX.Element | null = null;
	public yScrollPos = 0;

	public theme = 'light';

	public isAuthorized = false;
	public isAuthorizationInProgress = false;
	public userId = '';
	public userName = '';
	public userImageUrl = '';

	constructor() {
		// initial theme
		const value: string = localStorage.getItem('app-theme') || 'light';
		this.theme = AvailableThemes.includes(value) ? value : 'light';

		makeObservable(this, {
			// currentRoute: observable, // must not be observable!
			// currentParams: observable,
			currentLocation: observable,

			serverError: observable,
			pageActions: observable,
			yScrollPos: observable,

			theme: observable,

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
		return Boolean(this.pageActions);
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
		this.pageActions = content;
	};

	setCurrentRoute = (
		route: TRouteMappingItem | undefined,
		params: Record<any, any>
	): void => {
		this.currentRoute = route;
		this.currentParams = params;
	};

	setYScrollPos = (pos: number): void => {
		this.yScrollPos = pos;
	};

	setLocation = (location: string): void => {
		this.currentLocation = location;
	};

	resetPageAction = (): void => {
		this.pageActions = null;
	};

	setTheme = (value: string): void => {
		const themeName = AvailableThemes.includes(value) ? value : 'light';
		localStorage.setItem('app-theme', themeName);
		this.theme = themeName;
	};
}
