import React from 'react';

type TSourceFileProps = {
	src: string
	inline?: boolean
};

export const Src: React.FC<TSourceFileProps> = (props: TSourceFileProps) => {
	const parts = props.src.split('/');
	const filename = parts.pop();

	return <span className={'app-example-source-file' + (props.inline ? ' inline' : '')}>
		<span>
			{parts.length > 0 ? parts.join(' / ') + ' / ' : ''} <b>&nbsp;{filename}</b>
		</span>
	</span>;
};
