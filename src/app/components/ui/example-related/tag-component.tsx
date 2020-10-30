import React from 'react';

type TTagProps = {
	children: string
};

export const Tag: React.FC<TTagProps> = (props: TTagProps) => {
	return <code>&lt;{props.children}&gt;</code>;
};
