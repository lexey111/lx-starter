/* eslint-disable react/jsx-no-bind */
import {observer} from 'mobx-react';
import React, {useCallback, useState} from 'react';
import {Checkbox} from '../../../components/ui/data-entry/checkbox/checkbox-component';
import {SimpleModal} from '../../../components/ui/display/wait/simple-modal-component';
import {SyntaxHighlight} from '../../../components/ui/example-related/syntax-highlight';
import {Button} from '../../../components/ui/general/button/button-component';
import {Title} from '../../../components/ui/general/typography/title-component';
import {AppExampleToDoStore, AppExampleToDoStoreItem} from '../../../store/@store';

export const TodoListExample: React.FC = observer(() => {
	const [showDialog, setShowDialog] = useState(false);

	const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		AppExampleToDoStoreItem.title = e.target.value;
	}, []);

	const handleCompletedChange = useCallback((value: boolean) => {
		AppExampleToDoStoreItem.completed = value;
	}, []);

	const cancelEdit = useCallback(() => {
		setShowDialog(false);
	}, [setShowDialog]);

	const addRecord = useCallback(() => {
		AppExampleToDoStoreItem.initNewItem();

		setShowDialog(true);
	}, []);

	const saveRecord = useCallback(() => {
		if (!AppExampleToDoStoreItem._id) {
			AppExampleToDoStore.add(AppExampleToDoStoreItem.getItem);
		} else {
			AppExampleToDoStore.update(AppExampleToDoStoreItem.getItem);
		}

		setShowDialog(false);
	}, [setShowDialog]);

	return <div className={'example-todo-store-container'}>
		<Title level={4}>TODO List</Title>

		<SimpleModal
			show={showDialog}
			allowClose={true}
			closeOnClickOutside={true}
			closeOnEsc={true}
			onCancel={cancelEdit}>
			<div className={'modal-header'}>
				TODO record
			</div>

			<p>
				Please enter the title:
			</p>

			<input type="text" value={AppExampleToDoStoreItem.title} onChange={handleTitleChange}/>
			<Checkbox checked={AppExampleToDoStoreItem.completed} onChange={handleCompletedChange}>Completed</Checkbox>

			<div className={'modal-footer'}>
				<Button type={'success'} onClick={saveRecord}>Confirm</Button>
				<Button onClick={cancelEdit}>Cancel</Button>
			</div>
		</SimpleModal>

		{!AppExampleToDoStore.hasItems && <div>
			<p>
				There are no items yet.
			</p>

			<p>
				<Button type={'primary'} onClick={addRecord}>Add the first one</Button>
			</p>

		</div>}

		{AppExampleToDoStore.hasItems && <div>
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
				{AppExampleToDoStore.items.map(record => {
					return <tr key={record._id} className={(record.completed ? 'completed' : 'not-completed')}>
						<td className={'example-todo-status-column'}>
							<Checkbox checked={record.completed} onChange={() => {
								AppExampleToDoStore.toggle(record._id as string);
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
									AppExampleToDoStore.remove(record._id as string);
								}}>Remove</Button>
						</td>

					</tr>;
				})}
				</tbody>
			</table>

		</div>}

		<SyntaxHighlight title={'Actual data in the Store'}>
			{AppExampleToDoStore.items}
		</SyntaxHighlight>

	</div>;
});
