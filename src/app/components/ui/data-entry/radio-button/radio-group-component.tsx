import React, {useCallback} from 'react';
import {Radio, TRadioProps} from './radio-component';

export type TRadioGroupProps = {
	value?: unknown // current value
	inline?: boolean // row layout, default false
	reversed?: boolean // reverse selector position
	onChange?: (value) => void
	children?: Array<{ props?: TRadioProps }>
};

export function getRadioValue(e: React.MouseEvent | React.KeyboardEvent): unknown | undefined {
	if (e && e.target && e.target['dataset'] && typeof (e.target as HTMLElement)['dataset']['value'] !== 'undefined') {
		return (e.target as HTMLElement).dataset.value;
	}

	if (e && e.currentTarget && e.currentTarget['dataset']
		&& typeof (e.currentTarget as HTMLElement)['dataset']['value'] !== 'undefined') {
		return (e.currentTarget as HTMLElement).dataset.value;
	}
	return void 0;
}

const RadioGroup: React.FC<TRadioGroupProps> = (props: TRadioGroupProps) => {
	const handleTitleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const value = getRadioValue(e);

		if (typeof value !== 'undefined' && props.onChange) {
			props.onChange(value);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleKey = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.persist) {
			e.persist();
		}
		const code = e.key;

		if (code !== 'Enter' && code !== ' ') {
			return false;
		}

		const value = getRadioValue(e);

		if (typeof value !== 'undefined' && props.onChange) {
			props.onChange(value);
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!props || !props.children) {
		return null;
	}

	const actualChildren = props.children
		.filter(item => {
			return item && item.props && typeof item.props.value !== 'undefined';
		}) as Array<{ props: TRadioProps }>;

	if (!actualChildren || actualChildren.length === 0) {
		return null;
	}

	return <div className={'radiogroup-container' + (props.inline ? ' inline' : '') + (props.reversed ? ' reversed' : '')}>
		<div className={'radiogroup-content'}>
			{actualChildren.map((item, idx) => {
				const checked = item.props.value === props.value;
				const disabled = item.props.disabled === true;

				return <div
					className={'radiogroup-item' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '')}
					tabIndex={disabled ? -1 : 1}
					data-value={item.props.value}
					onKeyDownCapture={handleKey}
					onClick={handleTitleClick}
					key={idx}>
					<div className={'radiogroup-item-selector'}>
						<span></span>
					</div>
					<div className={'radiogroup-item-title'}>{item.props.children}</div>
				</div>;
			})}
		</div>
	</div>;
};

export {RadioGroup, Radio};
