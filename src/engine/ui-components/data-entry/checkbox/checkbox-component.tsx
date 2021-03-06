import React, {useCallback} from 'react';
import {Icon} from '../../general/icons/icon-component';

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
			{props.checked && <><Icon type={'check'}/><Icon type={'check'}/></>}
		</div>

		{hasTitle && <div className={'checkbox-title'}>
			{titleContent}
		</div>}
	</div>;
};

export {Checkbox};
