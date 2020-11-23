import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {Checkbox} from '../../../../../engine/ui-components/data-entry/checkbox/checkbox-component';
import {SimpleModal} from '../../../../../engine/ui-components/display/wait/simple-modal-component';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Button} from '../../../../../engine/ui-components/general/button/button-component';
import {AppExampleToDoStoreItem, AppExampleToDoStoreList} from '../../../../store/@stores';

type TTodoListItemExampleProps = {
	show: boolean
	closeDialog: () => void
};

export const TodoListItemExample: React.FC<TTodoListItemExampleProps> = observer((props: TTodoListItemExampleProps) => {

	const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		AppExampleToDoStoreItem.title = e.target.value;
	}, []);

	const handleCompletedChange = useCallback((value: boolean) => {
		AppExampleToDoStoreItem.completed = value;
	}, []);

	const cancelEdit = useCallback(() => {
		props.closeDialog();
	}, []);

	const saveRecord = useCallback(() => {
		if (!AppExampleToDoStoreItem._id) {
			AppExampleToDoStoreList.add(AppExampleToDoStoreItem.getItem);
		} else {
			AppExampleToDoStoreList.update(AppExampleToDoStoreItem.getItem);
		}
		AppExampleToDoStoreItem.initNewItem();

		props.closeDialog();
	}, []);

	return <SimpleModal
		show={props.show}
		allowClose={true}
		closeOnClickOutside={true}
		closeOnEsc={true}
		onCancel={cancelEdit}>
		<div className={'modal-header'}>
			TODO item
		</div>
		<Src src={'src/app/page/state-management/example-todo-store/todo-list-item-component.tsx'}/>
		<p>
			Please enter the title:
		</p>

		<input type="text" value={AppExampleToDoStoreItem.title} onChange={handleTitleChange}/>
		<Checkbox checked={AppExampleToDoStoreItem.completed} onChange={handleCompletedChange}>Completed</Checkbox>

		<hr/>
		<SyntaxHighlight title={'Actual data in the Item Store'}>
			{AppExampleToDoStoreItem.getItem}
		</SyntaxHighlight>


		<div className={'modal-footer'}>
			<Button type={'success'} onClick={saveRecord}>Confirm</Button>
			<Button onClick={cancelEdit}>Cancel</Button>
		</div>
	</SimpleModal>;
});
