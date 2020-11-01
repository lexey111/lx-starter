import React from 'react';
import {SyntaxExampleTabs} from '../../../components/ui/example-related/syntax-example-tabs';
import {Title} from '../../../components/ui/general/typography/title-component';

const Markup = `<Title>Title level 1</Title>
<Title level={2}>Title level 2</Title>
<Title level={3}>Title level 3</Title>
<Title level={4}>Title level 4</Title>
<Title level={5}>Title level 5</Title>
<Title level={6}>Title level 6</Title>
`;

const JSX = <>
	<Title>Title level 1</Title>
	<Title level={2}>Title level 2</Title>
	<Title level={3}>Title level 3</Title>
	<Title level={4}>Title level 4</Title>
	<Title level={5}>Title level 5</Title>
	<Title level={6}>Title level 6</Title>
</>;

const Syntax = `type TTitleProps = {
	className?: string
	level?: 1 | 2 | 3 | 4 | 5 | 6
};

export const Title: React.FC<TTitleProps> = (props: TTitleProps) => {...`;

export const UiTitleExample: React.FC = () => {
	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		result={<div>
			{JSX}
		</div>}
	/>;
};
