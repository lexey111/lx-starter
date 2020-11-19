/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import {AboutPage} from '../app/pages/about';
import {CustomPage} from '../app/pages/examples-related/custom';
import {CustomMenuDropdown} from '../app/pages/examples-related/custom/custom-menu-dropdown-component';
import {CustomMenuItem} from '../app/pages/examples-related/custom/custom-menu-item-component';
import {CustomPageTopPanel} from '../app/pages/examples-related/custom/custom-page-top-panel-component';
import {GettingStartedPage} from '../app/pages/examples-related/getting-started';
import {InternalsPage} from '../app/pages/examples-related/internals';
import {BuilderPage} from '../app/pages/examples-related/internals/builder';
import {TestingPage} from '../app/pages/examples-related/internals/testing';
import {LayoutPage} from '../app/pages/examples-related/layout';
import {BreadcrumbsPage} from '../app/pages/examples-related/layout/breadcrumbs';
import {PageActionsPage} from '../app/pages/examples-related/layout/breadcrumbs/page-actions';
import {MainMenuPage} from '../app/pages/examples-related/layout/main-menu';
import {PageSubMenuPage} from '../app/pages/examples-related/layout/page-menu';
import {PageNavigationPage} from '../app/pages/examples-related/layout/page-navigation';
import {TopPanelPage} from '../app/pages/examples-related/layout/top-panel';
import {ExampleTopPanel} from '../app/pages/examples-related/layout/top-panel/example-top-panel-component';
import {RoutingPage} from '../app/pages/examples-related/routes-subroutes';
import {RoutingMainPage} from '../app/pages/examples-related/routes-subroutes/example-pages';
import {RoutingArticle} from '../app/pages/examples-related/routes-subroutes/example-pages/article';
import {RoutingArticleAuthor} from '../app/pages/examples-related/routes-subroutes/example-pages/article-author';
import {ArticleTitle} from '../app/pages/examples-related/routes-subroutes/example-pages/article/article-title-component';
import {RoutingListOfArticles} from '../app/pages/examples-related/routes-subroutes/example-pages/list-of-articles';
import {AuthorTitle} from '../app/pages/examples-related/routes-subroutes/example-pages/list-of-articles/author-title-component';
import {StatePage} from '../app/pages/examples-related/state-management';
import {StateMainStorePage} from '../app/pages/examples-related/state-management/app-state';
import {StateGenericStorePage} from '../app/pages/examples-related/state-management/example-generic-store';
import {ExampleTodoStorePage} from '../app/pages/examples-related/state-management/example-todo-store';
import {UiPage} from '../app/pages/examples-related/ui';
import {UiDataEntryPage} from '../app/pages/examples-related/ui/data-entry';
import {UiDisplayPage} from '../app/pages/examples-related/ui/display';
import {UiExampleComponentsPage} from '../app/pages/examples-related/ui/examples-related';
import {UiGeneralPage} from '../app/pages/examples-related/ui/general';
import {ThemingPage} from '../app/pages/examples-related/ui/theming';
import {HomePage} from '../app/pages/home';
import {HomePageTopPanel} from '../app/pages/home/home-page-top-panel-component';
import {TRouteMappingItems} from '../engine/routing/route-mapping-interface';
import {IconHome} from '../engine/ui-components/general/icons/icon-home-component';
import {IconStar} from '../engine/ui-components/general/icons/icon-star-component';

// main app routing
export const AppSiteMap: TRouteMappingItems = [
	{
		title: 'Home',
		url: '/home',
		isHomePage: true,
		breadcrumbs: 'none',
		topPanel: <HomePageTopPanel/>,
		icon: <IconHome/>,
		page: <HomePage/>,
	},
	{
		title: 'Getting started',
		url: '/getting-started',
		page: <GettingStartedPage/>,
		showIconInTopMenu: false,
	},
	{
		title: 'Internals',
		url: '/internals',
		breadcrumbs: 'sub-menu',
		page: <InternalsPage/>,
		showIconInTopMenu: false,
		routes: [
			{
				title: 'Builder',
				url: '/internals/builder',
				page: <BuilderPage/>,
			},
			{
				title: 'Testing',
				url: '/internals/testing',
				page: <TestingPage/>,
			},
		]
	},
	{
		title: 'State',
		url: '/state-management',
		page: <StatePage/>,
		breadcrumbs: 'sub-menu',
		showIconInTopMenu: false,
		routes: [
			{
				url: '/state-management/app-state',
				page: <StateMainStorePage/>,
				title: 'App State store',
			},
			{
				url: '/state-management/generic-example',
				page: <StateGenericStorePage/>,
				title: 'Generic usage',
			},
			{
				url: '/state-management/todo-example',
				page: <ExampleTodoStorePage/>,
				title: 'Example ToDo Store',
			},
		]
	},
	{
		title: 'Routing',
		url: '/routing',
		page: <RoutingPage/>,
		showIconInTopMenu: false,
		routes: [
			{
				url: '/routing/example-pages',
				page: <RoutingMainPage/>,
				title: 'Example pages',
				routes: [
					{
						url: '/routing/example-pages/list-of-articles',
						page: <RoutingListOfArticles/>,
						title: 'List of articles',
					},
					{
						url: '/routing/example-pages/list-of-articles/:articleId',
						page: <RoutingArticle/>,
						title: <ArticleTitle/>,
					},
					{
						url: '/routing/example-pages/list-of-articles/:articleId/:authorId',
						page: <RoutingArticleAuthor/>,
						title: <AuthorTitle/>,
					}
				]
			},
		]
	},
	{
		title: 'Layout',
		url: '/layout',
		page: <LayoutPage/>,
		breadcrumbs: 'sub-menu',
		showIconInTopMenu: false,
		routes: [
			{
				title: 'Top panel',
				url: '/layout/top-panel',
				topPanel: <ExampleTopPanel/>,
				page: <TopPanelPage/>,
			},
			{
				title: 'Main menu',
				url: '/layout/main-menu',
				page: <MainMenuPage/>,
			},
			{
				title: 'Breadcrumbs',
				url: '/layout/breadcrumbs',
				page: <BreadcrumbsPage/>,
				routes: [
					{
						title: 'Page actions example',
						url: '/layout/breadcrumbs/page-actions',
						page: <PageActionsPage/>,
					}
				]
			},
			{
				title: 'Page submenu',
				url: '/layout/page-submenu',
				page: <PageSubMenuPage/>,
			},
			{
				title: 'In-page navigation',
				url: '/layout/page-navigation',
				page: <PageNavigationPage/>,
			},
		]
	},
	{
		title: 'UI & Components',
		url: '/ui',
		page: <UiPage/>,
		breadcrumbs: 'sub-menu',
		showIconInTopMenu: false,
		routes: [
			{
				title: 'Theming',
				url: '/ui/theming',
				page: <ThemingPage/>,
			},
			{
				title: 'General',
				url: '/ui/general',
				page: <UiGeneralPage/>
			},
			{
				title: 'Display',
				url: '/ui/display',
				page: <UiDisplayPage/>
			},
			{
				title: 'Data entry',
				url: '/ui/data-entry',
				page: <UiDataEntryPage/>
			},
			{
				title: 'Examples-related',
				url: '/ui/examples-related',
				page: <UiExampleComponentsPage/>
			},
		]
	},
	{
		title: 'About',
		icon: <IconStar/>,
		url: '/about',
		page: <AboutPage/>,
		isLateral: true
	},
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
];
