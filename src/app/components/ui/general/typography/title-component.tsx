import React from 'react';

type TTitleProps = {
	level?: 1 | 2 | 3 | 4 | 5 | 6
	subTitle?: string | JSX.Element
	className?: string
	bottomBorder?: boolean
	noTopMargin?: boolean
	children?: any
};

export const Title: React.FC<TTitleProps> = (props: TTitleProps) => {
	const CustomHeader: any = `h${props.level || 1}`;

	return <CustomHeader
		className={'app-title'
		+ (props.bottomBorder ? ' bottom-border' : '')
		+ (props.noTopMargin ? ' no-top-margin' : '')
		+ (props.className ? ' ' + props.className : '')}>
		{props.children}
		{props.subTitle && <div className={'app-subtitle'}>
			{props.subTitle}
		</div>}
	</CustomHeader>;
};
