import React from 'react';
import {SourceFile} from '../../../components/ui/example-related/source-file-component';
import {SyntaxHighlight} from '../../../components/ui/example-related/syntax-highlight';
import {Title} from '../../../components/ui/general/typography/title-component';
import {TodoListExample} from './todo-list-component';

export const ExampleTodoStorePage: React.FC = () => {
	return <>
		<Title>An example store</Title>
		<p>
			Well, this is pretty simple implementation of 'ToDo' application.
		</p>

		<Title level={2} nav>Example</Title>

		<TodoListExample/>

		<Title level={2} nav>Store structure</Title>
		<SourceFile src={'src/app/store/example/example-todo-store/app-example-todo-store.ts'}/>

		<p>
			Here I'm using approach with different stores: one for the 'main' object (list of ToDo items) and second one for
			'operative' access, current item in the store. I display the list
			using List Store (<code>AppExampleToDoStore: CAppExampleToDoStore</code>), and particular item during editing (or
			adding new item) with Item Store (<code>AppExampleToDoStoreItem: CAppExampleTodoStoreItem</code>).
		</p>

		<SyntaxHighlight
			title={'src/app/store/@stores.ts'}
			content={`export const AppExampleToDoStoreList = new CAppExampleToDoStore(); // just an example of ToDo store
export const AppExampleToDoStoreItem = new CAppExampleTodoStoreItem(); // current (active, on-edit) store item
`}/>
		<p>
			Benefits:
		</p>
		<ul>
			<li>
				Currently edited item is detached from the main list's data.
			</li>
			<li>
				Confirm/Cancel mode for free.
			</li>
			<li>
				Separate Stores (separation of concerns): Item Store contains only things required to
				work with single item, List Store keeps all the logic related to the list of items.
			</li>
		</ul>
		<p>
			Pitfalls:
		</p>
		<ul>
			<li>
				Verbosity. You need to support two stores and keep them aligned.
			</li>
			<li>
				Separate Store for current item: more files, more interaction between List Store and Item Store
			</li>
		</ul>

		<p>
			So this store keeps the list of items:
		</p>

		<SyntaxHighlight
			title={'src/app/store/example/example-todo-store/app-example-store-list.ts'}
			content={`export type TAppExampleStoreItem = {
	_id?: string
	title: string
	completed: boolean
};

export interface TAppExampleStoreList {
	items: Array<TAppExampleStoreItem>
	hasItems: boolean

	add: (item: TAppExampleStoreItem) => void
	update: (item: TAppExampleStoreItem) => boolean
	remove: (id: string) => boolean
	toggle: (id: string) => void
}

export default class CAppExampleStore implements TAppExampleStoreList {...}`}/>
		<p>
			And this one has to be filled up with active item field values on start editing, and copied
			back to the List Store on commit. Or cleaned up if user cancelled the editing.
		</p>

		<SyntaxHighlight
			title={'src/app/store/example/example-todo-store/app-example-store-item.ts'}
			content={`import {makeAutoObservable} from 'mobx';
import {TAppExampleStoreItem} from './app-example-store-list';

export default class CAppExampleTodoStoreItem implements TAppExampleStoreItem {
	public _id?: string = '';
	public title = '';
	public completed = false;

	constructor() {
		makeAutoObservable(this);
	}

	get getItem(): TAppExampleStoreItem {
		return {
			_id: this._id,
			title: this.title,
			completed: this.completed,
		};
	}

	initNewItem(): void {
		this._id = void 0;
		this.title = '';
		this.completed = false;
	}

	setItem(item: TAppExampleStoreItem): void {
		this._id = item._id;
		this.title = item.title;
		this.completed = item.completed;
	}
}`}/>

	</>;
};
