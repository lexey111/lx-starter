import {observer} from 'mobx-react';
import React, {useCallback} from 'react';
import {AppPersonStore} from '../../../../../store/@stores';
import {getNestedObject} from '../../../../../store/utils/object-utils';
import {handleStoreValue} from '../../../../../store/utils/store-utils';

const fieldName = 'phone';

export const PersonPhoneInput: React.FC = observer(() => {
	const handleChange = useCallback((v) => {
		handleStoreValue(AppPersonStore, fieldName, v);
	}, []);

	return <input
		type={'text'}
		onChange={handleChange}
		value={getNestedObject(AppPersonStore, fieldName) as string}
	/>;
});
