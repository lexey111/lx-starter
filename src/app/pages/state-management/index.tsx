import React from 'react';
import {A} from '../../components/ui/example-related/a-component';
import {SourceFile} from '../../components/ui/example-related/source-file-component';
import {SyntaxHighlight} from '../../components/ui/example-related/syntax-highlight';
import {IconFile} from '../../components/ui/general/icons/icon-file-component';
import {IconFolder} from '../../components/ui/general/icons/icon-folder-component';
import {Title} from '../../components/ui/general/typography/title-component';
import {PageSubmenu} from '../../layout/page-submenu/page-submenu-component';

export const StatePage: React.FC = () => {
	return <>
		<PageSubmenu/>
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
		</p>

		<p>
			The only exception will be described below.
		</p>

		<Title level={2}>Attachment of a store</Title>

		<SourceFile src={'src/app/store/@store.ts'}/>

		<p>
			This is the place where stores are living. This is 'include' file which contains stores initialization:
		</p>

		<pre className={'example-filestructure'}>
<IconFolder/>{` store
	`}<IconFolder/> {`app-state
		`}<IconFile/>{`app-state-store.ts
	`}<IconFolder/> {`example-store
		`}<IconFile/>{`app-example-store.ts
	`}<IconFolder/> {`utils
		`}<IconFile/>{`store-utils.ts
		`}<IconFile/>{`store-utils-test.ts
	`}<IconFile/><b>@store.ts</b>
</pre>

		<SyntaxHighlight content={`import CAppStateStore from './app-state/app-state-store';
import CAppExampleStore from './example-store/app-example-store';

export const AppStateStore = new CAppStateStore(); // current view state + auth state

export const AppExampleStore = new CAppExampleStore(); // just an example
`}/>
		<p>
			If you need a store I'd recommend to follow the structure.
		</p>

		<p>
			Also this file is a good place to start autoruns and attach reactions.
		</p>

		<p>
			Ah, yes, about the exception mentioned. The application state store keeps not only fields that are reflecting
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
	</>;
};
