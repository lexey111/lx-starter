import React from 'react';

type TAProps = {
	href: string
	children: any
};

export const A: React.FC<TAProps> = (props: TAProps) => {
	return <a href={props.href} target={'_blank'} rel={'noreferrer noopener'}>{props.children}</a>;
};
