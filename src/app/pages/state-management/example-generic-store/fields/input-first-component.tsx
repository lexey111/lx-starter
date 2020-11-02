import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppPersonStore} from '../../../../store/@store';
import {handleStoreValue} from '../../../../store/utils/store-utils';

const fieldName = 'name.first';

export const PersonNameFirstInput: React.FC = observer(() => {
	const handleChange = useCallback((v) => {
		handleStoreValue(AppPersonStore, fieldName, v);
	}, []);

	return <input
		type={'text'}
		onChange={handleChange}
		value={AppPersonStore.name.first}
		maxLength={256}/>;
});
