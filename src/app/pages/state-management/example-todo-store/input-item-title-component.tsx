import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppExampleToDoStore} from '../../../store/@store';
import {handleStoreValue} from '../../../store/utils/store-utils';

export const TodoTitleInput: React.FC = observer(() => {
	const handleChange = useCallback((v) => {
		handleStoreValue(AppExampleToDoStore, 'title', v);
	}, []);

	return <input
		type={'text'}
		onChange={handleChange}
		value={AppExampleToDoStore.comment}
		maxLength={256}/>;
});
