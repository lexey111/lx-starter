import React from 'react';

export type TLayoutProps = {
	footer?: JSX.Element
	children?: any
};

export const AppLayout: React.FC<TLayoutProps> = (props: TLayoutProps) => {
	return <div className={'app-layout'}>
		<div className={'app-layout-content'}>
			{props.children}
		</div>
		{props.footer}
	</div>;
};
