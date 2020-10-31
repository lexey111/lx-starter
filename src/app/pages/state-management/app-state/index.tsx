import React from 'react';
import {A} from '../../../components/ui/example-related/a-component';
import {SourceFile} from '../../../components/ui/example-related/source-file-component';
import {SyntaxHighlight} from '../../../components/ui/example-related/syntax-highlight';
import {Tag} from '../../../components/ui/example-related/tag-component';
import {Title} from '../../../components/ui/general/typography/title-component';
import {PageSubmenu} from '../../../layout/page-submenu/page-submenu-component';

export const StateMainStorePage: React.FC = () => {
	return <>
		<PageSubmenu/>
		<Title>Application State store</Title>

		<Title level={2}>The purpose</Title>
		<SourceFile src={'src/app/store/app-state/app-state-store.ts'}/>

		<p>
			This store keeps current application state: current route, url and params, UI theme, last fatal server error etc., and
			a few internal fields like current scroll position &mdash; this one is used by <Tag>Breadcrumbs</Tag>.
		</p>

		<p>
			Also, some auth-related fields are there. Fill free to get rid of them if you don't need authorization at all or
			if you implement full-scale auth store and flow, e.g. with <A href={'https://firebase.google.com/docs/auth'}>Google Firebase</A>.
		</p>

		<Title level={2}>Structure</Title>

		<SyntaxHighlight content={`
export type TAppStateStoreData = {
	currentRoute?: TRouteMappingItem | undefined // TRouteMappingItem
	currentParams?: Record<string, string> // http://url/:param1/:param2 -> {param1: 'some', param2: 'text'}
	currentLocation?: string // http://url/page1

	_pageActions?: JSX.Element | null // optional action(s) that will be displayed in the breadcrumbs on scroll
	_yScrollPos?: number // technical one, needed to show breadcrumbs panel after scroll distance reached > 32px

	isAuthorized: boolean
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
	</>;
};
