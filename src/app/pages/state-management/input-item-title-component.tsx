import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppExampleToDoStoreList} from '../../store/@store';
import {handleStoreValue} from '../../store/utils/store-utils';

export const TodoTitleInput: React.FC = observer(() => {
	const handleChange = useCallback((v) => {
		handleStoreValue(AppExampleToDoStoreList, 'title', v);
	}, []);

	return <input
		type={'text'}
		onChange={handleChange}
		value={AppExampleToDoStoreList.comment}
		maxLength={256}/>;
});
