import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppExampleStore} from '../../../store/@store';
import {handleStoreValue} from '../../../store/utils/store-utils';

export const TodoTitleInput: React.FC = observer(() => {
	const handleChange = useCallback((v) => {
		handleStoreValue(AppExampleStore, 'title', v);
	}, []);

	return <input
		type={'text'}
		onChange={handleChange}
		value={AppExampleStore.comment}
		maxLength={256}/>;
});
