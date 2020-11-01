import React from 'react';

type TTitleProps = {
	level?: 1 | 2 | 3 | 4 | 5 | 6
	className?: string
	children?: any
};

export const Title: React.FC<TTitleProps> = (props: TTitleProps) => {
	const CustomHeader: any = `h${props.level || 1}`;

	return <CustomHeader className={'app-title' + (props.className ? ' ' + props.className : '')}>
		{props.children}
	</CustomHeader>;
};
