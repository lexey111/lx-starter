/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import {SyntaxExampleTabs} from '../../../engine/ui-components/example-related/syntax-example-tabs';
import {Radio, RadioGroup} from '../../../engine/ui-components/data-entry/radio-button/radio-group-component';
import {Title} from '../../../engine/ui-components/general/typography/title-component';

const Markup = `<Title level={4}>Vertical</Title>
<RadioGroup value={g1} onChange={(v) => setG1(v)}>
	<Radio value={'A'}>String A</Radio>
	<Radio value={'B'}>String B</Radio>
	<Radio value={'C'} disabled={true}>String C (disabled)</Radio>
	<Radio value={'D'}>Long string description</Radio>
</RadioGroup>

<Title level={5}>Reversed</Title>

<RadioGroup value={g1} reversed onChange={(v) => setG1(v)}>
	<Radio value={'A'}>String A</Radio>
	<Radio value={'B'}>String B</Radio>
	<Radio value={'C'} disabled={true}>String C (disabled)</Radio>
	<Radio value={'D'}>Long string description</Radio>
</RadioGroup>

<Title level={4}>Horizontal</Title>
<RadioGroup value={g2} inline onChange={(v) => setG2(v)}>
	<Radio value={'C'}>Some value</Radio>
	<Radio value={'D'}>Another value</Radio>
	<Radio value={'E'}>May be value</Radio>
</RadioGroup>

<Title level={5}>Reversed</Title>

<RadioGroup value={g2} inline reversed onChange={(v) => setG2(v)}>
	<Radio value={'C'}>Some value</Radio>
	<Radio value={'D'}>Another value</Radio>
	<Radio value={'E'}>May be value</Radio>
</RadioGroup>
`;


const Syntax = `export type TRadioProps = {
	value: unknown
	disabled?: boolean
};

export type TRadioGroupProps = {
	value?: unknown // current value
	inline?: boolean // row layout, default false
	reversed?: boolean // reverse selector position
	onChange?: (value) => void
};

const RadioGroup: React.FC<TRadioGroupProps> = (props: TRadioGroupProps) => {...
`;

export const UiRadioExample: React.FC = () => {
	const [g1, setG1] = useState('B');
	const [g2, setG2] = useState('D');

	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		code={`const [g1, setG1] = useState('B');
const [g2, setG2] = useState('D');

<RadioGroup value={g1} onChange={(v) => setG1(v)}>
	<Radio value={'A'}>String A</Radio>
	<Radio value={'B'}>String B</Radio>
	<Radio value={'C'} disabled={true}>String C (disabled)</Radio>
	<Radio value={'D'}>Long string description</Radio>
</RadioGroup>

`}
		syntax={Syntax}
		result={<div>
			<Title level={4}>Default</Title>
			<RadioGroup value={g1} onChange={(v) => setG1(v)}>
				<Radio value={'A'}>String A</Radio>
				<Radio value={'B'}>String B</Radio>
				<Radio value={'C'} disabled={true}>String C (disabled)</Radio>
				<Radio value={'D'}>Long string description</Radio>
			</RadioGroup>

			<Title level={5}>Reversed</Title>

			<RadioGroup value={g1} reversed onChange={(v) => setG1(v)}>
				<Radio value={'A'}>String A</Radio>
				<Radio value={'B'}>String B</Radio>
				<Radio value={'C'} disabled={true}>String C (disabled)</Radio>
				<Radio value={'D'}>Long string description</Radio>
			</RadioGroup>

			<p>&nbsp;</p>

			<Title level={4}>Inline</Title>
			<RadioGroup value={g2} inline onChange={(v) => setG2(v)}>
				<Radio value={'C'}>Some value</Radio>
				<Radio value={'D'}>Another value</Radio>
				<Radio value={'E'}>May be value</Radio>
			</RadioGroup>

			<Title level={5}>Reversed inline</Title>

			<RadioGroup value={g2} inline reversed onChange={(v) => setG2(v)}>
				<Radio value={'C'}>Some value</Radio>
				<Radio value={'D'}>Another value</Radio>
				<Radio value={'E'}>May be value</Radio>
			</RadioGroup>
		</div>}
	/>;
};
