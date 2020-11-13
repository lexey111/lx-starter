import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppPersonStore} from '../../../../engine/store/@stores';
import {getNestedObject} from '../../../../engine/store/utils/object-utils';
import {handleStoreValue} from '../../../../engine/store/utils/store-utils';

const fieldName = 'location.city';

export const PersonLocationCityInput: React.FC = observer(() => {
	const handleChange = useCallback((v) => {
		handleStoreValue(AppPersonStore, fieldName, v);
	}, []);

	return <input
		type={'text'}
		onChange={handleChange}
		value={getNestedObject(AppPersonStore, fieldName) as string}
		maxLength={256}/>;
});
