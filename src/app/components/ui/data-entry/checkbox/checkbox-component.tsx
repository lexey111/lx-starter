import React, {useCallback} from 'react';
import {IconCheck} from '../../general/icons/icon-check-component';

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
	Pick<T, Exclude<keyof T, Keys>>
	& {
	[K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys];

export type TCheckbox = {
	checked: boolean
	disabled?: boolean
	inline?: boolean
	reversed?: boolean
	onChange?: (checked: boolean) => void
	children?: string | JSX.Element
	title?: string
};

type TCheckboxProps = RequireAtLeastOne<TCheckbox, 'children' | 'title'>;

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
			return false;
		}

		if (props.onChange) {
			props.onChange(!props.checked);
		}

		e.preventDefault();
		e.stopPropagation();
		return false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.checked]);

	return <div
		className={'checkbox-container'
		+ (disabled ? ' disabled' : '')
		+ (props.inline ? ' inline' : '')
		+ (props.reversed ? ' reversed' : '')
		+ (props.checked ? ' checked' : '')}
		onKeyDownCapture={handleKey}
		onClick={handleTitleClick}
		tabIndex={disabled ? -1 : 1}
	>

		<div className={'checkbox-tickmark'}>
			{props.checked && <><IconCheck/><IconCheck/></>}
		</div>

		<div className={'checkbox-title'}>
			{props.title || props.children}
		</div>
	</div>;
};

export {Checkbox};
