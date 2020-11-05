export type TRouteMappingItem = {
	url?: string // url to go - unique route id

	title?: string | JSX.Element // Menu item title or function which returns title
	subtitle?: string | JSX.Element // subtitle to show under the menu title line
	icon?: JSX.Element // icon component
	menuItem?: JSX.Element // entire menu item component
	page?: JSX.Element // page (component) to render
	topPanel?: JSX.Element // panel to be displayed above top menu (if layout uses top menu; or at page top otherwise)

	isHomePage?: boolean // is it Home page?
	isLoginPage?: boolean // is it Login page?

	onlyWhenLoggedIn?: boolean
	onlyWhenLoggedOut?: boolean

	breadcrumbs?: 'default' | 'none' | 'sub-menu'

	isLateral?: boolean // show it in the right/bottom menu? (default = false)

	pageClass?: string // extra class to add to container

	routes?: Array<TRouteMappingItem> // nested routes

	// internals
	_hasSubRoutes?: boolean
	_hasVisibleSubRoutes?: boolean
	_parentUrl?: string
};

export type TRouteMappingItems = Array<TRouteMappingItem> | never;
