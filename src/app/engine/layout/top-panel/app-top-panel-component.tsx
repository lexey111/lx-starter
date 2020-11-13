import React, {useEffect} from 'react';
import useLocationParams from '../../hooks/use-location-params';

export const AppTopPanel: React.FC = (): JSX.Element | null => {
	const location = useLocationParams();

	useEffect(() => {
		if (location.route?.topPanel) {
			document.body.classList.add('with-top-panel');
		}
		return () => {
			document.body.classList.remove('with-top-panel');
		};
	}, [location.route?.topPanel]);

	if (!location.route?.topPanel) {
		return null;
	}

	return <div className={'app-top-panel'}>
		{location.route?.topPanel}
	</div>;
};

