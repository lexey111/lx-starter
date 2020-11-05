import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {Checkbox} from '../../../components/ui/data-entry/checkbox/checkbox-component';
import {SimpleModal} from '../../../components/ui/display/wait/simple-modal-component';
import {SourceFile} from '../../../components/ui/example-related/source-file-component';
import {SyntaxHighlight} from '../../../components/ui/example-related/syntax-highlight';
import {Button} from '../../../components/ui/general/button/button-component';
import {AppExampleToDoStoreItem, AppExampleToDoStoreList} from '../../../store/@stores';

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const saveRecord = useCallback(() => {
		if (!AppExampleToDoStoreItem._id) {
			AppExampleToDoStoreList.add(AppExampleToDoStoreItem.getItem);
		} else {
			AppExampleToDoStoreList.update(AppExampleToDoStoreItem.getItem);
		}
		AppExampleToDoStoreItem.initNewItem();

		props.closeDialog();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		<SourceFile src={'src/app/page/state-management/example-todo-store/todo-list-item-component.tsx'}/>
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
