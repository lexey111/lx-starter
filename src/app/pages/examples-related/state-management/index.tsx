import React from 'react';
import {Link} from 'react-router-dom';
import {PageRelated} from '../../../../engine/layout/page/related/app-page-related-component';
import {A} from '../../../../engine/ui-components/examples-related/a-component';
import {FileList} from '../../../../engine/ui-components/examples-related/filelist-component';
import {Src} from '../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../engine/ui-components/examples-related/syntax-highlight';
import {Title} from '../../../../engine/ui-components/general/typography/title-component';

export const StatePage: React.FC = () => {
	return <>
		<Title>State management</Title>
		<Title level={2}>Basic principles</Title>

		<p>
			Here, in the application, I'm using <A href={'https://mobx.js.org/README.html'}>MobX</A> as state management engine.
		</p>

		<p>
			There are a lot of other options, like <A href={'https://redux.js.org/'}>Redux</A> or
			React <A href={'https://reactjs.org/docs/hooks-reference.html'}>hooks</A>, but I personally prefer this one.
		</p>

		<p>
			Also this application designed as multi-store one. It means, for different purposes there are separated stores
			to follow the <A href={'https://en.wikipedia.org/wiki/Single-responsibility_principle'}>single responsibility principle</A>.
			You can find more details <Link to={'/state-management/general-example'}>here (general example)</Link> or&nbsp;
			<Link to={'/state-management/todo-example'}>here (ToDo example)</Link>.
		</p>

		<Title level={2}>Attachment of a store</Title>

		<Src src={'src/app/store/@stores.ts'}/>

		<p>
			This is the place where stores are living. This is 'include' file which contains stores initialization:
		</p>

		<FileList data={`[src]
	[app]
		[store]
			[app-state]
				app-state-page-navigation-store.ts - in-page navigation
				app-state-store.ts - main store
			[examples]
				[example-people-store]
					app-example-person.ts - example store
				[example-todo-store]
					app-example-store-list.ts - other example store (list part)
					app-example-store-item.ts - item part of example store
			[utils]
				object-utils.ts - object fields access, e.g., setValue(obj, 'x.y.z', 42) => obj.x.y.z = 42
				store-utils.ts - assign data, reset, update
			@stores.ts - !this is the entry point
`}/>

		<SyntaxHighlight content={`import CAppPageNavigationStore from './app-state/app-state-page-navigation-store';
import CAppStateStore from './app-state/app-state-store';
import CPeopleStore from './examples/example-people-store/app-example-person';
import CAppExampleTodoStoreItem from './examples/example-todo-store/app-example-store-item';
import CAppExampleToDoStore from './examples/example-todo-store/app-example-store-list';

// current view state + auth state
export const AppStateStore = new CAppStateStore();

// page sub-navigation (local waypoints)
export const AppPageNavigationStore = new CAppPageNavigationStore();

// ToDo Store example
export const AppExampleToDoStoreList = new CAppExampleToDoStore(); // example ToDo store
export const AppExampleToDoStoreItem = new CAppExampleTodoStoreItem(); // current (active, on-edit) store item

// Person Store example
export const AppPersonStore = new CPeopleStore();
`}/>
		<p>
			If you need a store I'd recommend to follow the structure.
		</p>

		<p>
			Also this file is a good place to start <i>autoruns</i> and attach reactions if you have big enough stores
			and separate <i>reactions</i> and <i>stores</i> itself.
		</p>

		<p>
			Ah, yes, one exception. The application state store keeps not only fields that are reflecting
			the state, but a few of very technical fields and application authorization state. The reasons are:
		</p>

		<ul>
			<li>
				It has a very little sense to create separate Store for technical things at list while their number still small.
			</li>
			<li>
				It is The Starter application, so implementing separate Auth store is up to developer. Anyway,
				reflecting only a piece of full auth data in the main store is not a big deal and could be convenient.
			</li>
		</ul>
		<PageRelated items={[
			{
				url: '/state-management/general-example',
				title: 'General example Store'
			},
			{
				url: '/state-management/todo-example',
				title: 'ToDo Store'
			},
			{
				url: '/state-management/app-state',
				title: 'AppState Store'
			},
		]}/>
	</>;
};
