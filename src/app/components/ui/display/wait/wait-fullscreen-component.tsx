import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {IconSpinner} from '../../general/icons/icon-spinner-component';

type TWaitFullscreenComponentProps = {
	message?: string | JSX.Element
	className?: string
	hideSpinner?: boolean
};

const waitDiv = document.querySelector('#app-full-screen-message');

function prepareSuperModal(): ((e: KeyboardEvent) => void) | null {
	if (!waitDiv) {
		return null;
	}
	const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
	const modal = waitDiv;

	const firstFocusableElement = modal.querySelectorAll(focusableElements)[0] as HTMLElement;
	const focusableContent = modal.querySelectorAll(focusableElements);
	const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

	if (!firstFocusableElement || !lastFocusableElement) {
		return null;
	}

	const trapFocus = (e: KeyboardEvent): void => {
		const isTabPressed = e.key === 'Tab';

		if (!isTabPressed) {
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
	firstFocusableElement.focus();

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
		const handler = prepareSuperModal();

		return () => {
			waitDiv.className = '';
			document.body.classList.remove('no-scroll');

			if (handler) {
				document.removeEventListener('keydown', handler);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!waitDiv) {
		throw new Error('div#app-full-screen-message not found in the DOM!');
	}

	return ReactDOM.createPortal(<>
		{!props.hideSpinner && <IconSpinner/>}
		{(!props.message || typeof props.message === 'string') && <span>{props.message || 'Processing...'}</span>}
		{typeof props.message !== 'string' && props.message}
		<input type={'text'} id={'app-blur-control'}/>
	</>, waitDiv);
};
