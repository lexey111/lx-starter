import React from 'react';
import {SourceFile} from '../../../components/ui/example-related/source-file-component';
import {SyntaxHighlight} from '../../../components/ui/example-related/syntax-highlight';
import {Title} from '../../../components/ui/general/typography/title-component';
import {PageSubmenu} from '../../../layout/page-submenu/page-submenu-component';
import {TodoListExample} from './todo-list-component';

export const StateExamplePage: React.FC = () => {
	return <>
		<PageSubmenu/>
		<Title>An example store</Title>
		<p>
			Well, this is pretty simple implementation of 'ToDo' application.
		</p>

		<Title level={2}>Example</Title>
		<SourceFile src={'src/app/pages/state-management/example-store/todo-list-component.tsx'}/>

		<TodoListExample/>

		<hr/>

		<Title level={3}>Store structure</Title>
		<SourceFile src={'src/app/store/example-store/app-example-store.ts'}/>

		<SyntaxHighlight content={`import {makeAutoObservable} from 'mobx';

export type TAppExampleStoreRecord = {
	_id?: string
	title: string
	completed: boolean
};

export interface TAppExampleStoreData {
	items: Array<TAppExampleStoreRecord>
	hasItems: boolean

	add: (item: TAppExampleStoreRecord) => void
	update: (item: TAppExampleStoreRecord) => boolean
	remove: (id: string) => boolean
	toggle: (id: string) => void
}

export default class CAppExampleStore implements TAppExampleStoreData {...`}/>
	</>;
};
