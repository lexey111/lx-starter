import React from 'react';
import {Link} from 'react-router-dom';
import {A} from '../../../../../engine/ui-components/examples-related/a-component';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../../engine/ui-components/examples-related/tag-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

export const StateMainStorePage: React.FC = () => {
	return <>
		<Title>Application State store</Title>

		<Title level={2} nav={'purpose'}>The purpose</Title>
		<Src src={'src/app/store/app-state/app-state-store.ts'}/>

		<p>
			This store keeps current application state: current route, url and params, UI theme, last fatal server error etc., and
			a few internal fields like current scroll position &mdash; this one is used by <Tag>Breadcrumbs</Tag>.
		</p>

		<p>
			Also, some auth-related fields are there. Fill free to get rid of them if you don't need authorization at all or
			if you implement full-scale auth store and flow, e.g. with <A href={'https://firebase.google.com/docs/auth'}>Google Firebase</A>.
		</p>

		<Title level={2} nav={'structure'}>Structure</Title>

		<SyntaxHighlight content={`export const AvailableThemes = ['default', 'light', 'dark'] as const;
type TypeOfAvailableThemes = typeof AvailableThemes[number];

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

export default class CAppStateStore implements TAppStateStoreData {...`}/>
		<p>
			Interesting thing here is <code>currentRoute</code> and <code>currentParams</code> are not observable.
			The reason explained in Routing section: in short, to avoid unnecessary renders because they are secondary
			fields where <code>currentLocation</code> is a primary one.
		</p>

		<Title level={2} nav={'extra_params'}>Extra parameters</Title>
		<p>
			Also the Store contains some UI parameters:
		</p>

		<ul>
			<li>
				<code>themeCode</code> - current theme, read about that <Link to={'/ui/themes'}>here</Link>.
			</li>
			<li>
				<code>_mainMenuPosition</code> - where is menu located, <Link to={'/layout/main-menu'}>more details</Link>.
			</li>
			<li>
				<code>_pageActions</code> - page actions in the <Link to={'/layout/breadcrumbs'}>Breadcrumb panel</Link>.
			</li>
			<li>
				<code>_yScrollPos</code> and <code>_topPanelHeight</code> are used by Main menu and Breadcrumbs to calculate
				correct dimensions of layout parts.
			</li>
			<li>
				<code>_topPanel*</code> - internal variables to display <Link to={'/layout/top-panel'}>Top panel</Link>.
			</li>
		</ul>
	</>;
};
