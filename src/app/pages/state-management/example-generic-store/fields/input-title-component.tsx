import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppPersonStore} from '../../../../store/@store';
import {getNestedObject} from '../../../../store/utils/object-utils';
import {handleStoreValue} from '../../../../store/utils/store-utils';

const fieldName = 'name.title';

export const PersonNameTitleInput: React.FC = observer(() => {
	const handleChange = useCallback((v) => {
		handleStoreValue(AppPersonStore, fieldName, v);
	}, []);

	return <input
		type={'text'}
		onChange={handleChange}
		style={{width: '8em'}}
		value={getNestedObject(AppPersonStore, fieldName) as string}
		maxLength={8}/>;
});
