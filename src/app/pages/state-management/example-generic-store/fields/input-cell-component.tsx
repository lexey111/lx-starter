import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppPersonStore} from '../../../../store/@store';
import {handleStoreValue} from '../../../../store/utils/store-utils';

const fieldName = 'cell';

export const PersonCellInput: React.FC = observer(() => {
	const handleChange = useCallback((v) => {
		handleStoreValue(AppPersonStore, fieldName, v);
	}, []);

	return <input
		type={'text'}
		onChange={handleChange}
		value={AppPersonStore.cell}/>;
});
