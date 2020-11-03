/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import {IconHome} from '../app/components/ui/general/icons/icon-home-component';
import {IconStar} from '../app/components/ui/general/icons/icon-star-component';
import {AboutPage} from '../app/pages/about';
import {BuilderPage} from '../app/pages/builder';
import {GettingStartedPage} from '../app/pages/getting-started';
import {HomePage} from '../app/pages/home';
import {MenuPage} from '../app/pages/menu';
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
import {ThemingPage} from '../app/pages/theming';
import {UiPage} from '../app/pages/ui';
import {UiDataEntryPage} from '../app/pages/ui/data-entry';
import {UiDisplayPage} from '../app/pages/ui/display';
import {UiExampleComponentsPage} from '../app/pages/ui/examples-related';
import {UiGeneralPage} from '../app/pages/ui/general';
import {TRouteMappingItems} from '../app/routing/route-mapping-interface';

// main app routing
export const AppSiteMap: TRouteMappingItems = [
	{
		title: 'Home',
		url: '/home',
		isHomePage: true,
		noBreadcrumbs: true,
		icon: <IconHome/>,
		page: <HomePage/>,
	},
	{
		title: 'Getting started',
		url: '/getting-started',
		page: <GettingStartedPage/>,
	},
	{
		title: 'Builder',
		url: '/builder',
		page: <BuilderPage/>,
	},
	{
		title: 'Testing',
		url: '/testing',
		page: <TestingPage/>,
	},
	{
		title: 'Main menu',
		url: '/menu',
		page: <MenuPage/>,
	},
	{
		title: 'Theming',
		icon: 'H',
		url: '/theming',
		page: <ThemingPage/>,
	},
	{
		title: 'State management',
		url: '/state-management',
		page: <StatePage/>,
		noBreadcrumbs: true,
		routes: [
			{
				url: '/state-management/app-state',
				page: <StateMainStorePage/>,
				noBreadcrumbs: true,
				title: 'App State store',
			},
			{
				url: '/state-management/todo-example',
				page: <ExampleTodoStorePage/>,
				noBreadcrumbs: true,
				title: 'Example ToDo Store',
			},
			{
				url: '/state-management/generic-example',
				page: <StateGenericStorePage/>,
				noBreadcrumbs: true,
				title: 'Generic Store & Utils',
			},
		]
	},
	{
		title: 'Routing',
		icon: <IconStar/>,
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
		noBreadcrumbs: true,
		routes: [
			{
				title: 'General',
				url: '/ui/general',
				noBreadcrumbs: true,
				page: <UiGeneralPage/>
			},
			{
				title: 'Display',
				url: '/ui/display',
				noBreadcrumbs: true,
				page: <UiDisplayPage/>
			},
			{
				title: 'Data entry',
				url: '/ui/data-entry',
				noBreadcrumbs: true,
				page: <UiDataEntryPage/>
			},
			{
				title: 'Examples-related',
				url: '/ui/examples-related',
				noBreadcrumbs: true,
				page: <UiExampleComponentsPage/>
			},
		]
	},
	{
		title: 'About',
		icon: <IconStar/>,
		url: '/about',
		page: <AboutPage/>
	}
];
