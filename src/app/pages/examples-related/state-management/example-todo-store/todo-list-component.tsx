/* eslint-disable react/jsx-no-bind */
import {observer} from 'mobx-react';
import React, {useCallback, useState} from 'react';
import {Checkbox} from '../../../../../engine/ui-components/data-entry/checkbox/checkbox-component';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Button} from '../../../../../engine/ui-components/general/button/button-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';
import {AppExampleToDoStoreItem, AppExampleToDoStoreList} from '../../../../store/@stores';
import {TodoListItemExample} from './todo-list-item-component';

export const TodoListExample: React.FC = observer(() => {
	const [showDialog, setShowDialog] = useState(false);

	const addRecord = useCallback(() => {
		AppExampleToDoStoreItem.initNewItem();
		setShowDialog(true);
	}, []);

	const closeDialog = useCallback(() => {
		setShowDialog(false);
	}, []);

	return <div className={'example-component-container'}>
		<Src src={'src/app/page/state-management/example-todo-store/todo-list-component.tsx'}/>
		<Title level={4}>TODO List</Title>
		<TodoListItemExample show={showDialog} closeDialog={closeDialog}/>

		{!AppExampleToDoStoreList.hasItems && <div>
			<p>
				No items yet.
			</p>

			<p>
				<Button type={'primary'} onClick={addRecord}>Add the first one</Button>
			</p>

		</div>}

		{AppExampleToDoStoreList.hasItems && <div>
			<p>
				<Button type={'success'} onClick={addRecord}>Add item</Button>
			</p>

			<table>
				<thead>
				<tr>
					<th style={{width: '80px'}}>Completed</th>
					<th>Title</th>
					<th style={{textAlign: 'center'}}>Actions</th>
				</tr>
				</thead>

				<tbody>
				{AppExampleToDoStoreList.items.map(record => {
					return <tr key={record._id} className={(record.completed ? 'completed' : 'not-completed')}>
						<td className={'example-todo-status-column'}>
							<Checkbox checked={record.completed} onChange={() => {
								AppExampleToDoStoreList.toggle(record._id as string);
							}}/>
						</td>
						<td width={'100%'}>
							{record.title}
						</td>
						<td style={{whiteSpace: 'nowrap'}}>
							<Button
								type={'success'}
								onClick={() => {
									AppExampleToDoStoreItem.setItem(record);
									setShowDialog(true);
								}}>Edit</Button>

							<Button
								type={'danger'}
								onClick={() => {
									AppExampleToDoStoreList.remove(record._id as string);
								}}>Remove</Button>
						</td>

					</tr>;
				})}
				</tbody>
			</table>

		</div>}

		<SyntaxHighlight title={'Actual data in the List Store'}>
			{AppExampleToDoStoreList.items}
		</SyntaxHighlight>
	</div>;
});
