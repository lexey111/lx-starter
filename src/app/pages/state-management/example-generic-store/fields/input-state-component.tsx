import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppPersonStore} from '../../../../store/@store';
import {handleStoreValue} from '../../../../store/utils/store-utils';

const fieldName = 'location.state';

export const PersonLocationStateInput: React.FC = observer(() => {
	const handleChange = useCallback((v) => {
		handleStoreValue(AppPersonStore, fieldName, v);
	}, []);

	return <input
		type={'text'}
		onChange={handleChange}
		style={{width: '16em'}}
		value={AppPersonStore.location.state}
		maxLength={16}/>;
});
