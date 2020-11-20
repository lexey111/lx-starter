import React, {useState} from 'react';
import {Checkbox} from '../../../../../engine/ui-components/data-entry/checkbox/checkbox-component';
import {LipsumPara} from '../../../../../engine/ui-components/examples-related/lipsum';
import {SyntaxExampleTabs} from '../../../../../engine/ui-components/examples-related/syntax-example-tabs';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

const Markup = `<Title bottomBorder={border}>Title level 1</Title>
	<Title bottomBorder={border} level={2}>Title level 2</Title>
	<Title bottomBorder={border} level={3}>Title level 3</Title>
	<Title bottomBorder={border} level={4}>Title level 4</Title>
	<Title bottomBorder={border} level={5}>Title level 5</Title>
	<Title bottomBorder={border} level={6}>Title level 6</Title>

	<Title bottomBorder={border} subTitle={'Some subtitle here'}>Title level 1</Title>
	<Title bottomBorder={border} subTitle={'Some subtitle and there'} level={2}>Title level 2</Title>
	<Title bottomBorder={border} subTitle={'Some subtitle for sure needed'} level={3}>Title level 3</Title>
	<Title bottomBorder={border} subTitle={'Some subtitle, just a couple of worlds'} level={4}>Title level 4</Title>
	<Title bottomBorder={border} subTitle={'Some subtitle for the fifths level'} level={5}>Title level 5</Title>
	<Title bottomBorder={border} subTitle={'Some subtitle very petite text'} level={6}>Title level 6</Title>
`;

const Syntax = `type TTitleProps = {
	level?: 1 | 2 | 3 | 4 | 5 | 6
	subTitle?: string | JSX.Element
	navTitle?: string | JSX.Element
	className?: string
	bottomBorder?: boolean
	noTopMargin?: boolean
	nav?: string
	navPadding?: 1 | 2
	children?: any
};

export const Title: React.FC<TTitleProps> = (props: TTitleProps) => {...`;

const Code = `const [border, setBorder] = useState(false);
const [lipsum, setLipsum] = useState(false);
...
	<Checkbox checked={border} inline={true} onChange={setBorder}>Bottom border</Checkbox>
	<Checkbox checked={lipsum} inline={true} onChange={setLipsum}>Text fillers</Checkbox>
`;

export const UiTitleExample: React.FC = () => {
	const [border, setBorder] = useState(false);
	const [lipsum, setLipsum] = useState(false);

	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		code={Code}
		result={<div>
			<Checkbox checked={border} inline={true} onChange={setBorder}>Bottom border</Checkbox>
			<Checkbox checked={lipsum} inline={true} onChange={setLipsum}>Text fillers</Checkbox>
			<hr/>
			<Title bottomBorder={border}>Title level 1</Title>
			{lipsum && <LipsumPara/>}
			<Title bottomBorder={border} level={2}>Title level 2</Title>
			{lipsum && <LipsumPara/>}
			<Title bottomBorder={border} level={3}>Title level 3</Title>
			{lipsum && <LipsumPara/>}
			<Title bottomBorder={border} level={4}>Title level 4</Title>
			{lipsum && <LipsumPara/>}
			<Title bottomBorder={border} level={5}>Title level 5</Title>
			{lipsum && <LipsumPara/>}
			<Title bottomBorder={border} level={6}>Title level 6</Title>
			{lipsum && <LipsumPara/>}

			<Title bottomBorder={border} subTitle={'Some subtitle here'}>Title level 1</Title>
			{lipsum && <LipsumPara/>}
			<Title bottomBorder={border} subTitle={'Some subtitle and there'} level={2}>Title level 2</Title>
			{lipsum && <LipsumPara/>}
			<Title bottomBorder={border} subTitle={'Some subtitle for sure needed'} level={3}>Title level 3</Title>
			{lipsum && <LipsumPara/>}
			<Title bottomBorder={border} subTitle={'Some subtitle, just a couple of worlds'} level={4}>Title level 4</Title>
			{lipsum && <LipsumPara/>}
			<Title bottomBorder={border} subTitle={'Some subtitle for the fifths level'} level={5}>Title level 5</Title>
			{lipsum && <LipsumPara/>}
			<Title bottomBorder={border} subTitle={'Some subtitle very petite text'} level={6}>Title level 6</Title>
			{lipsum && <LipsumPara/>}
		</div>}
	/>;
};
