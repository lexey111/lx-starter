import React from 'react';
import {LipsumPara} from '../../../../../engine/ui-components/examples-related/lipsum';
import {SyntaxExampleTabs} from '../../../../../engine/ui-components/examples-related/syntax-example-tabs';

const Markup = '<LipsumPara paragraphs={2} words={45}/>';

const JSX = <LipsumPara paragraphs={2} words={45}/>;

const Syntax = `export type TLipsumParaProps = {
	paragraphs?: number
	words?: number
};

export const LipsumPara: React.FC<TLipsumParaProps> = (props: TLipsumParaProps) => {...`;

export const ExampleLipsum: React.FC = () => {
	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		result={<div>
			{JSX}
		</div>}
	/>;
};
