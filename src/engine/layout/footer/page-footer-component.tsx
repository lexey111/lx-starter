import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

type TPageFooterProps = {
	className?: string
	children: any
};

export const PageFooter: React.FC<TPageFooterProps> = (props: TPageFooterProps) => {
	const container = useRef<any>(null);
	const [contentAssigned, setContentAssigned] = useState(false);

	useEffect(() => {
		return () => {
			// cleanup
			if (container.current && props.className) {
				(container.current as HTMLDivElement).classList.remove('app-footer-with-content');
				if (props.className) {
					(container.current as HTMLDivElement).classList.remove(props.className);
				}
			}
		};
	}, []);

	useEffect(() => {
		if (container.current) {
			return;
		}
		container.current = document.getElementById('app-footer-portal');

		if (!container.current) {
			return;
		}

		setContentAssigned(true);

		(container.current as HTMLDivElement).classList.add('app-footer-with-content');
		if (props.className) {
			(container.current as HTMLDivElement).classList.add(props.className);
		}
	}); // no deps - watch for external div

	if (!contentAssigned || !props.children) {
		return null;
	}

	return ReactDOM.createPortal(
		<div className={'app-footer-content'}>
			{props.children}
		</div>,
		container.current as HTMLDivElement
	);
};
