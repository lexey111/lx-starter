import {autorun} from 'mobx';
import React, {useState} from 'react';
import {AppStateStore} from '../store/@store';

type TURLParams = {
	url: string
	params: Record<string, string>
};

export default function useLocationParams(): TURLParams {
	const [location, setLocation] = useState<TURLParams>({
		url: '',
		params: {}
	});

	React.useEffect(
		() => {
			return autorun(
				() => {
					setLocation({url: AppStateStore.currentLocation, params: AppStateStore.currentParams});
				}
			);
		},
		[]
	);

	return location;
}
