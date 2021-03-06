export type TRouteMappingItem = {
	url?: string // url to go - unique route id

	title?: string | JSX.Element // Menu item title or function which returns title
	subtitle?: string | JSX.Element // subtitle to show under the menu title line

	icon?: JSX.Element // icon component
	showIconInTopMenu?: boolean // default: true (if icon assigned)
	showTitleInTopMenu?: boolean // default: true, icon + title

	menuItem?: JSX.Element // entire menu item component
	menuItemExpandable?: boolean // if custom menu item is expandable
	page?: JSX.Element // page (component) to render
	topPanel?: JSX.Element // panel to be displayed above top menu (if layout uses top menu; or at page top otherwise)

	isHomePage?: boolean // is it Home page?
	isLoginPage?: boolean // is it Login page?

	onlyWhenAuthorized?: boolean
	onlyWhenNotAuthorized?: boolean

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
