/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import {TRouteMappingItems} from '../app/engine/routing/route-mapping-interface';
import {IconHome} from '../app/engine/ui-components/general/icons/icon-home-component';
import {IconStar} from '../app/engine/ui-components/general/icons/icon-star-component';
import {AboutPage} from '../app/pages/about';
import {CustomPage} from '../app/pages/example-related/custom';
import {CustomMenuDropdown} from '../app/pages/example-related/custom/custom-menu-dropdown-component';
import {CustomMenuItem} from '../app/pages/example-related/custom/custom-menu-item-component';
import {CustomPageTopPanel} from '../app/pages/example-related/custom/custom-page-top-panel-component';
import {GettingStartedPage} from '../app/pages/example-related/getting-started';
import {InternalsPage} from '../app/pages/example-related/internals';
import {BuilderPage} from '../app/pages/example-related/internals/builder';
import {TestingPage} from '../app/pages/example-related/internals/testing';
import {RoutingPage} from '../app/pages/example-related/routes-subroutes';
import {RoutingMainPage} from '../app/pages/example-related/routes-subroutes/example-page';
import {RoutingArticle} from '../app/pages/example-related/routes-subroutes/example-page/article';
import {RoutingArticleAuthor} from '../app/pages/example-related/routes-subroutes/example-page/article-author';
import {ArticleTitle} from '../app/pages/example-related/routes-subroutes/example-page/article/article-title-component';
import {RoutingListOfArticles} from '../app/pages/example-related/routes-subroutes/example-page/list-of-articles';
import {AuthorTitle} from '../app/pages/example-related/routes-subroutes/example-page/list-of-articles/author-title-component';
import {StatePage} from '../app/pages/example-related/state-management';
import {StateMainStorePage} from '../app/pages/example-related/state-management/app-state';
import {StateGenericStorePage} from '../app/pages/example-related/state-management/example-generic-store';
import {ExampleTodoStorePage} from '../app/pages/example-related/state-management/example-todo-store';
import {ThemingPage} from '../app/pages/example-related/theming';
import {UiPage} from '../app/pages/example-related/ui';
import {UiDataEntryPage} from '../app/pages/example-related/ui/data-entry';
import {UiDisplayPage} from '../app/pages/example-related/ui/display';
import {UiExampleComponentsPage} from '../app/pages/example-related/ui/examples-related';
import {UiGeneralPage} from '../app/pages/example-related/ui/general';
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
	// {
	// 	title: 'Main menu',
	// 	url: '/menu',
	// 	page: <MenuPage/>,
	// },
	{
		title: 'State management',
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
				title: 'Stores and Utils',
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
				url: '/routing/example-page',
				page: <RoutingMainPage/>,
				title: 'Example page',
				routes: [
					{
						url: '/routing/example-page/list-of-articles',
						page: <RoutingListOfArticles/>,
						title: 'List of articles',
					},
					{
						url: '/routing/example-page/list-of-articles/:articleId',
						page: <RoutingArticle/>,
						title: <ArticleTitle/>,
					},
					{
						url: '/routing/example-page/list-of-articles/:articleId/:authorId',
						page: <RoutingArticleAuthor/>,
						title: <AuthorTitle/>,
					}
				]
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
	},
];
