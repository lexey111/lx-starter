import React, {useCallback} from 'react';
import {IconCheck} from '../../general/icons/icon-check-component';

export type TCheckboxProps = {
	checked: boolean
	disabled?: boolean
	inline?: boolean
	reversed?: boolean
	onChange?: (checked: boolean) => void
	children?: string | JSX.Element
	title?: string
};

const Checkbox: React.FC<TCheckboxProps> = (props: TCheckboxProps) => {
	const disabled = props.disabled === true || !props.onChange;

	const handleTitleClick = useCallback(() => {
		if (props.onChange) {
			props.onChange(!props.checked);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.checked]);

	const handleKey = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.persist) {
			e.persist();
		}

		const code = e.key;
		if (code !== 'Enter' && code !== ' ') {
			return true;
		}

		if (props.onChange) {
			props.onChange(!props.checked);
		}

		e.preventDefault();
		e.stopPropagation();
		return false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.checked]);

	const titleContent = props.title || props.children;
	const hasTitle = Boolean(titleContent);

	return <div
		className={'checkbox-container focusable'
		+ (disabled ? ' disabled' : '')
		+ (hasTitle ? '' : ' no-title')
		+ (props.inline ? ' inline' : '')
		+ (props.reversed ? ' reversed' : '')
		+ (props.checked ? ' checked' : '')}
		onKeyDownCapture={handleKey}
		onClick={handleTitleClick}
		tabIndex={disabled ? -1 : 0}
	>

		<div className={'checkbox-tickmark'}>
			{props.checked && <><IconCheck/><IconCheck/></>}
		</div>

		{hasTitle && <div className={'checkbox-title'}>
			{titleContent}
		</div>}
	</div>;
};

export {Checkbox};
