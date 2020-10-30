export type TRouteMappingItem = {
	url: string // url to go - unique route id

	title?: string | JSX.Element // Menu item title or function which returns title
	subtitle?: JSX.Element // subtitle to show under the menu title line
	icon?: JSX.Element // icon component
	page: JSX.Element // page (component) to render

	isHomePage?: boolean // is it Home page?
	isLoginPage?: boolean // is it Login page?

	onlyWhenLoggedIn?: boolean
	onlyWhenLoggedOut?: boolean

	spinnerDuringLogin?: boolean

	noBreadcrumbs?: boolean // default: false

	isLateral?: boolean // show it in the right/bottom menu? (default = false)

	pageClass?: string // extra class to add to container

	routes?: Array<TRouteMappingItem> // nested routes

	_hasSubRoutes?: boolean
	_hasVisibleSubRoutes?: boolean
	_parentUrl?: string
};

export type TRouteMappingItems = Array<TRouteMappingItem> | never;
