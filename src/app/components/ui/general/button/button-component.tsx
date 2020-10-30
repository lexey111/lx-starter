import React from 'react';

type TButtonProps = {
	type?: 'primary' | 'default' | 'danger' | 'success' | 'link'
	disabled?: boolean
	small?: boolean
	onClick?: () => void
	children: any
};

export const Button: React.FC<TButtonProps> = (props: TButtonProps) => {
	let btnClass = 'simplebtn';
	if (props.type === 'primary') {
		btnClass += ' simplebtn-primary';
	}
	if (props.type === 'default' || !props.type) {
		btnClass += ' simplebtn-default';
	}
	if (props.type === 'danger') {
		btnClass += ' simplebtn-danger';
	}
	if (props.type === 'success') {
		btnClass += ' simplebtn-success';
	}
	if (props.type === 'link') {
		btnClass += ' simplebtn-link';
	}

	if (props.small) {
		btnClass += ' simplebtn-sm';
	}
	return <button className={btnClass} disabled={props.disabled} onClick={props.onClick}>{props.children}</button>;
};
