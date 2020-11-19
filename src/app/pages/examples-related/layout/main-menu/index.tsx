import React from 'react';
import {Link} from 'react-router-dom';
import {MenuPositionSwitcher} from '../../../../../engine/ui-components/examples-related/menu-switcher-component';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../../engine/ui-components/examples-related/tag-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

const TypingsFile = 'src/engine/routing/route-mapping-interface.tsx';

export const MainMenuPage: React.FC = () => {
	return <>

		<Title>Main menu</Title>

		<Src src={'src/engine/layout/main-menu/main-menu-component.tsx'}/>

		<Title level={2} nav={'overview'}>Overview</Title>
		<p>
			Main menu is pretty flexible. It supports two positions (side and top). Both positions are
			sticky and responsive. E.g., if page width is less than some limit, top menu hides out to
			'burger' button whereas side menu shrinks to collapsible panel.
		</p>

		<p>
			These waypoint are defined in:
		</p>

		<SyntaxHighlight
			title={'src/styles/@media.less'}
			content={`@app-media-top-menu-collapse-to-burger: 1000px; // make burger menu at this point if position === 'top'
@app-media-side-menu-collapse: 1650px; // collapse side menu at this point
@app-media-side-menu-min-page: 1090px; // add --menu-width as left padding to page if width < this point
`}
			language={'less'}/>

		<Title level={2} nav={'position'}>Position</Title>
		<div className={'example-component-container'}>
			<Title level={6} bottomBorder noTopMargin>
				Set menu position:
			</Title>
			<MenuPositionSwitcher/>
		</div>

		<p>
			Current menu position is reflected in <Link to={'/state-management/app-state'}>AppState Store</Link>:
		</p>

		<SyntaxHighlight
			title={'src/app/store/app-state/app-state-store.ts'}
			content={`...
public _mainMenuPosition: 'top' | 'side' = 'top';
...`}/>
		<p>
			When the position changes store saves the value to local storage (and restores it on initialization).
		</p>

		<p>
			<Tag>AppMainMenu</Tag> component observes this value and adds the corresponding classes to <Tag>body</Tag>.
		</p>

		<p>
			Initial state of menu restores the <code>index.html</code> code:
		</p>

		<SyntaxHighlight
			title={'src/static/index.html'}
			content={`const storedMenuPosition = localStorage.getItem('app-menu.position') === 'side' ? 'side' : 'top';
document.body.classList.add('with-' + storedMenuPosition + '-menu');
`}/>

		<Title level={2} nav={'data'}>Data</Title>
		<p>
			Main menu component uses array of <code>TRouteMappingItem</code> from <code>AppSiteMap</code> (<Src src={'src/config/app-site-map.tsx'} inline/>) file.
		</p>

		<p>
			It &mdash;
		</p>

		<ol>
			<li>
				Filters routes by auth state. It means if user logged in (<code>AppStateStore.isAuthorized</code>) he or she
				see all the menu items associated with non-specified routes plus items for 'authorized-only'
				routes. If user not logged in &mdash; only non-specified and 'not authorized only' items displayed.
				<SyntaxHighlight
					lines={[10, 11]}
					title={TypingsFile}
					content={`export type TRouteMappingItem = {
	url?: string // url to go - unique route id
	title?: string | JSX.Element // Menu item title or function which returns title
	subtitle?: string | JSX.Element // subtitle to show under the menu title line
	icon?: JSX.Element // icon component
	showIconInTopMenu?: boolean // default: true if icon assigned
	menuItem?: JSX.Element // entire menu item component
	menuItemExpandable?: boolean // if custom menu item is expandable
	...
	onlyWhenAuthorized?: boolean
	onlyWhenNotAuthorized?: boolean
`}/>
			</li>
			<li>Extracts only first level routes</li>
			<li>
				Splits them to primary (left or top) and lateral (right/bottom) menu parts based on &mdash;
				<SyntaxHighlight
					title={TypingsFile}
					content={`...
isLateral?: boolean // show it in the right/bottom menu? (default = false)
...`}/>
			</li>
			<li>
				Observes current menu position (top or side) and assigns the corresponding class
				to <Tag>body</Tag>: <code>with-top-menu</code> or <code>with-side-menu</code>.
			</li>
		</ol>

		<p>
			Main menu processes only two first levels of route nesting: menu and sub-menu (sub-routes).
		</p>

		<Title level={2} nav={'special_pages'}>Special pages</Title>

		<p>
			Type which describes menu-related fields in route mapping (<Src src={'src/engine/routing/route-mapping-interface.tsx'} inline/>) also includes couple
			of specific values:
		</p>

		<SyntaxHighlight
			title={TypingsFile}
			content={`...
isHomePage?: boolean // is it Home page?
isLoginPage?: boolean // is it Login page?
...
`}/>
		<p>
			The first one, Home page, must be present in the routing because this is the page to redirect on error or when
			user tries to reach unavailable page.
		</p>

		<p>
			Second one, Login page, is optional. It will be used when user tries to open some page which route is marked as <code>onlyWhenAuthorized</code> and
			user didn't log in.
		</p>

		<Title level={2} nav={'icons'}>Icons</Title>

		<p>
			The <code>icon</code> field allows to assign one of <Link to={'/ui/general#svg-icons'}>SVG icons</Link>, or
			any other component. Just please be reasonable and assign icons for side menu because in collapsed mode
			without icons it could be confusing. Thi is why in side mode menu uses default 'star' icon if developer
			didn't specify own.
		</p>

		<p>
			To show icon only when menu pinned to left side there is some special field:
		</p>

		<SyntaxHighlight
			title={TypingsFile}
			content={`...
showIconInTopMenu?: boolean // default: true if icon assigned
...
`}/>

		<Title level={2} nav={'custom_items'}>Custom items</Title>
		<p>
			Menu supports two species of custom items: independent, without
			navigation, and managed &mdash; these must declare <code>url</code>.
		</p>

		<SyntaxHighlight
			title={'src/config/app-site-map.tsx'}
			content={`...
{
	url: '/custom',
	isLateral: true,
	title: 'Custom menu item',
	menuItem: <CustomMenuItem/>,
	topPanel: <CustomPageTopPanel/>,
	page: <CustomPage/>
},
{
	isLateral: true,
	menuItem: <CustomMenuDropdown/>,
	menuItemExpandable: true
},
...`}/>

		<p>
			First item is a regular menu item with custom content of, err, menu item container: <Tag>CustomMenuItem</Tag>.
			Menu will display this custom content instead usual title and icon and when user click on it &mdash; will perform
			normal action, redirect to '/custom'.
		</p>

		<p>
			Second one, <Tag>CustomMenuDropdown</Tag>, does not include <code>url</code> field. It means not only content but
			all the logic of processing user input is up to developer. This particular example returns some content
			wrapped in dropdown menu container. Pay attention to <code>menuItemExpandable</code> field: it is responsible
			for rendering the dropdown, otherwise custom item will be just in-placed to menu bar.
		</p>
	</>;
};
