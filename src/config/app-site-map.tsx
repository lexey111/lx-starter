/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import {IconHome} from '../app/engine/components/ui/general/icons/icon-home-component';
import {IconStar} from '../app/engine/components/ui/general/icons/icon-star-component';
import {AboutPage} from '../app/pages/about';
import {CustomPage} from '../app/pages/custom';
import {CustomMenuDropdown} from '../app/pages/custom/custom-menu-dropdown-component';
import {CustomMenuItem} from '../app/pages/custom/custom-menu-item-component';
import {HomePage} from '../app/pages/home';
import {HomePageTopPanel} from '../app/pages/home/home-page-top-panel-component';
import {RoutingPage} from '../app/pages/routes-subroutes';
import {RoutingMainPage} from '../app/pages/routes-subroutes/example-page';
import {RoutingArticle} from '../app/pages/routes-subroutes/example-page/article';
import {RoutingArticleAuthor} from '../app/pages/routes-subroutes/example-page/article-author';
import {ArticleTitle} from '../app/pages/routes-subroutes/example-page/article/article-title-component';
import {RoutingListOfArticles} from '../app/pages/routes-subroutes/example-page/list-of-articles';
import {AuthorTitle} from '../app/pages/routes-subroutes/example-page/list-of-articles/author-title-component';
import {StatePage} from '../app/pages/state-management';
import {StateMainStorePage} from '../app/pages/state-management/app-state';
import {StateGenericStorePage} from '../app/pages/state-management/example-generic-store';
import {ExampleTodoStorePage} from '../app/pages/state-management/example-todo-store';
import {TestingPage} from '../app/pages/testing';
import {UiPage} from '../app/pages/ui';
import {UiDataEntryPage} from '../app/pages/ui/data-entry';
import {UiDisplayPage} from '../app/pages/ui/display';
import {UiExampleComponentsPage} from '../app/pages/ui/examples-related';
import {UiGeneralPage} from '../app/pages/ui/general';
import {TRouteMappingItems} from '../app/engine/routing/route-mapping-interface';

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
	// {
	// 	title: 'Getting started',
	// 	url: '/getting-started',
	// 	page: <GettingStartedPage/>,
	// },
	// {
	// 	title: 'Builder',
	// 	url: '/builder',
	// 	page: <BuilderPage/>,
	// },
	{
		title: 'Testing',
		url: '/testing',
		page: <TestingPage/>,
	},
	// {
	// 	title: 'Main menu',
	// 	url: '/menu',
	// 	page: <MenuPage/>,
	// },
	// {
	// 	title: 'Theming',
	// 	url: '/theming',
	// 	page: <ThemingPage/>,
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
		title: 'UI Components',
		url: '/ui',
		page: <UiPage/>,
		breadcrumbs: 'sub-menu',
		routes: [
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
		page: <CustomPage/>
	},
	{
		isLateral: true,
		menuItem: <CustomMenuDropdown/>,
	},
];
