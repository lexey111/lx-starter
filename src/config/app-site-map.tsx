/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import {TRouteMappingItems} from '../app/engine/routing/route-mapping-interface';
import {IconHome} from '../app/engine/ui-components/general/icons/icon-home-component';
import {IconStar} from '../app/engine/ui-components/general/icons/icon-star-component';
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
import {MainMenuPage} from '../app/pages/examples-related/layout/main-menu';
import {PageMenuPage} from '../app/pages/examples-related/layout/page-menu';
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
	},
	{
		title: 'Internals',
		url: '/internals',
		breadcrumbs: 'sub-menu',
		page: <InternalsPage/>,
		routes: [
			{
				title: 'Builder',
				url: '/internals/builder',
				breadcrumbs: 'sub-menu',
				page: <BuilderPage/>,
			},
			{
				title: 'Testing',
				url: '/internals/testing',
				breadcrumbs: 'sub-menu',
				page: <TestingPage/>,
			},
		]
	},
	{
		title: 'State',
		url: '/state-management',
		page: <StatePage/>,
		breadcrumbs: 'sub-menu',
		routes: [
			{
				url: '/state-management/app-state',
				page: <StateMainStorePage/>,
				breadcrumbs: 'sub-menu',
				title: 'App State store',
			},
			{
				url: '/state-management/generic-example',
				page: <StateGenericStorePage/>,
				breadcrumbs: 'sub-menu',
				title: 'Generic usage',
			},
			{
				url: '/state-management/todo-example',
				page: <ExampleTodoStorePage/>,
				breadcrumbs: 'sub-menu',
				title: 'Example ToDo Store',
			},
		]
	},
	{
		title: 'Routing',
		url: '/routing',
		page: <RoutingPage/>,
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
		routes: [
			{
				title: 'Top panel',
				breadcrumbs: 'sub-menu',
				url: '/layout/top-panel',
				topPanel: <ExampleTopPanel/>,
				page: <TopPanelPage/>,
			},
			{
				title: 'Main menu',
				breadcrumbs: 'sub-menu',
				url: '/layout/main-menu',
				page: <MainMenuPage/>,
			},
			{
				title: 'Breadcrumbs',
				breadcrumbs: 'sub-menu',
				url: '/layout/breadcrumbs',
				page: <BreadcrumbsPage/>,
			},
			{
				title: 'Page menu',
				breadcrumbs: 'sub-menu',
				url: '/layout/page-menu',
				page: <PageMenuPage/>,
			},
			{
				title: 'In-page navigation',
				breadcrumbs: 'sub-menu',
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
		routes: [
			{
				title: 'Theming',
				breadcrumbs: 'sub-menu',
				url: '/ui/theming',
				page: <ThemingPage/>,
			},
			{
				title: 'General',
				url: '/ui/general',
				breadcrumbs: 'sub-menu',
				page: <UiGeneralPage/>
			},
			{
				title: 'Display',
				url: '/ui/display',
				breadcrumbs: 'sub-menu',
				page: <UiDisplayPage/>
			},
			{
				title: 'Data entry',
				url: '/ui/data-entry',
				breadcrumbs: 'sub-menu',
				page: <UiDataEntryPage/>
			},
			{
				title: 'Examples-related',
				url: '/ui/examples-related',
				breadcrumbs: 'sub-menu',
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
