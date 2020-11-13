import {reaction} from 'mobx';
import React, {useState} from 'react';
import {AppStateStore} from '../store/@stores';

export default function useLoggedIn(): { loggedIn: boolean } {
	const [loggedIn, setLoggedIn] = useState(AppStateStore.isAuthorized);

	React.useEffect(
		() => {
			return reaction(
				() => AppStateStore.isAuthorized,
				(_loggedIn: boolean) => setLoggedIn(_loggedIn)
			);
		},
		[]
	);

	return {loggedIn};
}
