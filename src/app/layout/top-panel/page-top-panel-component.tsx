import React from 'react';

type TTopPanelProps = {
	children: any
};

export const PageTopPanel: React.FC<TTopPanelProps> = (props: TTopPanelProps) => {
	return <div className={'app-top-panel-content'}>
		{props.children}
	</div>;
};

