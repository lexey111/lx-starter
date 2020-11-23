import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Icon} from '../../general/icons/icon-component';

type TWaitFullscreenComponentModalProps = {
	_allowClose?: boolean
	_onClose?: () => void
	_closeOnESC?: boolean
	_closeOnClickOutside?: boolean
};

type TWaitFullscreenComponentProps = {
	message?: string | JSX.Element
	className?: string
	hideSpinner?: boolean
} & TWaitFullscreenComponentModalProps;

const waitDiv = document.querySelector('#app-full-screen-message') as HTMLDivElement;

function prepareSuperModal(
	onClose?: () => void,
	closeOnEsc?: boolean,
	closeOnClick?: boolean): ((e: KeyboardEvent) => void) | null {

	if (!waitDiv) {
		return null;
	}

	const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [focusable]';
	const modal = waitDiv;

	const firstFocusableElement = modal.querySelectorAll(focusableElements)[0] as HTMLElement;
	const focusableContent = modal.querySelectorAll(focusableElements);
	const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

	if (onClose && closeOnClick) {
		waitDiv.onclick = () => {
			setTimeout(() => {
				if (waitDiv.onclick) { // could be detached already by close handler
					onClose();
				}
			}, 100);
		};
	}

	const trapFocus = (e: KeyboardEvent): void => {
		const isTabPressed = e.key === 'Tab';
		const isEscPressed = e.key === 'Escape';

		if (isEscPressed && onClose && closeOnEsc) {
			onClose();
		}

		if (!isTabPressed) {
			return;
		}

		if (!firstFocusableElement || !lastFocusableElement) {
			return;
		}

		if (e.shiftKey) {
			// if shift key pressed for shift + tab combination
			if (document.activeElement === firstFocusableElement) {
				lastFocusableElement.focus(); // add focus for the last focusable element
				e.preventDefault();
			}
		} else if (document.activeElement === lastFocusableElement) {
			// if focused has reached to last focusable element then focus first focusable element after pressing tab
			firstFocusableElement.focus(); // add focus for the first focusable element
			e.preventDefault();
		}
	};

	document.addEventListener('keydown', trapFocus);

	setTimeout(() => {
		if (firstFocusableElement) {
			firstFocusableElement.focus();
		}
	}, 200);

	return trapFocus;
}

export const WaitFullscreen: React.FC<TWaitFullscreenComponentProps> = (props: TWaitFullscreenComponentProps) => {
	useEffect(() => {
		if (!waitDiv) {
			return;
		}

		waitDiv.className = 'active' + (props.className ? ' ' + props.className : '');
		document.body.classList.add('no-scroll');

		// remove focus from main page and put it to the trap or first focusable item
		const handler = prepareSuperModal(
			props._allowClose && props._onClose
				? props._onClose
				: void 0,
			props._closeOnESC,
			props._closeOnClickOutside
		);

		return () => {
			waitDiv.onclick = null;
			waitDiv.className = '';
			document.body.classList.remove('no-scroll');

			if (handler) {
				document.removeEventListener('keydown', handler);
			}
		};
	}, []);

	if (!waitDiv) {
		throw new Error('div#app-full-screen-message not found in the DOM!');
	}

	return ReactDOM.createPortal(<>
		{!props.hideSpinner && <Icon type={'spinner'}/>}
		{(!props.message || typeof props.message === 'string') && <span>{props.message || 'Processing...'}</span>}
		{typeof props.message !== 'string' && props.message}
		<input type={'text'} id={'app-blur-control'}/>
	</>, waitDiv);
};
