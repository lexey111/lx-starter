/* eslint-disable react/jsx-no-bind */
import {observer} from 'mobx-react';
import React, {useCallback, useState} from 'react';
import {WaitFullscreen} from '../../../components/ui/display/wait/wait-fullscreen-component';
import {SyntaxHighlight} from '../../../components/ui/example-related/syntax-highlight';
import {Button} from '../../../components/ui/general/button/button-component';
import {IconCheck} from '../../../components/ui/general/icons/icon-check-component';
import {IconClose} from '../../../components/ui/general/icons/icon-close-component';
import {Title} from '../../../components/ui/general/typography/title-component';
import {AppExampleStore} from '../../../store/@store';
import {TAppExampleStoreRecord} from '../../../store/example-store/app-example-store';

export const TodoListExample: React.FC = observer(() => {
	const [showDialog, setShowDialog] = useState(false);

	const [item, setItem] = useState<TAppExampleStoreRecord>({
		title: '',
		completed: false
	});

	const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setItem({
			...item,
			title: e.target.value
		});
	}, [item]);

	const cancelEdit = useCallback(() => {
		setShowDialog(false);
	}, [setShowDialog]);

	const addRecord = useCallback(() => {
		setItem({
			title: '',
			completed: false
		});

		setShowDialog(true);
	}, []);

	const saveRecord = useCallback(() => {
		if (!item._id) {
			AppExampleStore.add(item);
		} else {
			AppExampleStore.update(item);
		}

		setShowDialog(false);
	}, [setShowDialog, item]);

	return <div className={'example-store-container'}>
		<Title level={4}>TODO List</Title>

		{showDialog && <WaitFullscreen
			hideSpinner={true}
			message={<div style={{width: '50%'}}>
				<Title level={2}>TODO record</Title>
				<input type="text" value={item.title} onChange={handleTitleChange}/>
				<hr/>
				<Button type={'success'} onClick={saveRecord}>Confirm</Button>
				<Button onClick={cancelEdit}>Cancel</Button>
			</div>}/>
		}

		{!AppExampleStore.hasItems && <div>
			<p>
				There are no items yet.
			</p>

			<p>
				<Button type={'primary'} onClick={addRecord}>Add the first one</Button>
			</p>

		</div>}

		{AppExampleStore.hasItems && <div>
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
				{AppExampleStore.items.map(record => {
					return <tr key={record._id} className={(record.completed ? 'completed' : 'not-completed')}>
						<td className={'example-todo-status-column'}>
							{record.completed ? <IconCheck/> : <IconClose/>}
						</td>
						<td width={'100%'}>
							{record.title}
						</td>
						<td style={{whiteSpace: 'nowrap'}}>
							<Button
								type={'primary'}
								onClick={() => {
									AppExampleStore.toggle(record._id as string);
								}}>Toggle</Button>

							<Button
								type={'success'}
								onClick={() => {
									setItem({...record});
									setShowDialog(true);
								}}>Change text</Button>

							<Button
								type={'danger'}
								onClick={() => {
									AppExampleStore.remove(record._id as string);
								}}>Remove</Button>
						</td>

					</tr>;
				})}
				</tbody>
			</table>

		</div>}

		<SyntaxHighlight title={'Actual data in the Store'}>
			{AppExampleStore.items}
		</SyntaxHighlight>

	</div>;
});
