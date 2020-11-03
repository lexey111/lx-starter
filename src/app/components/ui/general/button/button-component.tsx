import React from 'react';

type TButtonProps = {
	type?: 'primary' | 'default' | 'danger' | 'success' | 'link'
	disabled?: boolean
	small?: boolean
	onClick?: () => void
	style? : any
	children: any
};

export const Button: React.FC<TButtonProps> = (props: TButtonProps) => {
	const {type, small, disabled, onClick, ...rest} = props;
	let btnClass = 'simplebtn';
	if (type === 'primary') {
		btnClass += ' simplebtn-primary';
	}
	if (type === 'default' || !props.type) {
		btnClass += ' simplebtn-default';
	}
	if (type === 'danger') {
		btnClass += ' simplebtn-danger';
	}
	if (type === 'success') {
		btnClass += ' simplebtn-success';
	}
	if (type === 'link') {
		btnClass += ' simplebtn-link';
	}

	if (small) {
		btnClass += ' simplebtn-sm';
	}
	return <button
		className={btnClass}
		disabled={disabled}
		onClick={onClick}
		{...rest}
	>
		{props.children}
	</button>;
};
