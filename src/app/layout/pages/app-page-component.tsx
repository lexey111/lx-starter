import React, {useEffect, useRef, useState} from 'react';

type TAppPageProps = {
	children?: any
	className?: string
};

export const AppPage: React.FC<TAppPageProps> = (props: TAppPageProps) => {
	const destroying = useRef(false);
	const [readyToRender, setReadyToRender] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);

		const delayedRender = setTimeout(() => {
			setReadyToRender(true);
		}, 100);
		//
		return () => {
			destroying.current = true;
			clearTimeout(delayedRender);
		};
	}, []);

	if (destroying.current) {
		return null;
	}

	return <div className={'app-page' + (props.className ? ' ' + props.className : '')}>
		{readyToRender && props.children}
	</div>;
};
