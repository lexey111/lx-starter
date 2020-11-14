import {autorun} from 'mobx';
import React, {useState} from 'react';
import {TRouteMappingItem} from '../routing/route-mapping-interface';
import {getRouteByUrl} from '../routing/route-mapping-utils';
import {AppStateStore} from '../../store/@stores';

type TURLParams = {
	url: string
	params: Record<string, string>
	route: TRouteMappingItem | undefined
};

export default function useLocationParams(): TURLParams {
	const [location, setLocation] = useState<TURLParams>({
		url: '',
		params: {},
		route: void 0
	});

	React.useEffect(
		() => {
			return autorun(
				() => {
					setLocation({
						url: AppStateStore.currentLocation,
						params: AppStateStore.currentParams,
						route: getRouteByUrl(AppStateStore.currentLocation)
					});
				}
			);
		},
		[]
	);

	return location;
}
