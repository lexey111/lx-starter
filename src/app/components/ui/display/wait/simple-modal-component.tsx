import React, {useCallback} from 'react';
import {WaitFullscreen} from './wait-fullscreen-component';

type TSimpleModalComponentProps = {
	show: boolean
	children: JSX.Element | Array<JSX.Element>
	onCancel?: () => void
	allowClose?: boolean // default: true
	closeOnCancel?: boolean // default: true
	closeOnClickOutside?: boolean // default: true
};

export const SimpleModal: React.FC<TSimpleModalComponentProps> = (props: TSimpleModalComponentProps) => {
	const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.persist) {
			e.persist();
		}
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		e.preventDefault();

		return false;
	}, []);

	if (!props.show) {
		return null;
	}

	const allowClose = (typeof props.allowClose !== 'undefined' ? props.allowClose : true) && Boolean(props.onCancel);

	return <WaitFullscreen
		className={'modal-like'}
		hideSpinner={true}

		_allowClose={allowClose}
		_onClose={props.onCancel}
		_closeOnESC={props.closeOnCancel}
		_closeOnClickOutside={props.closeOnClickOutside}

		message={<div className={'modal-like-content'} onClick={handleClick}>
			{allowClose && <div className={'modal-close-button'} onClick={props.onCancel}>&times;</div>}
			{props.children}
		</div>}/>;
};
