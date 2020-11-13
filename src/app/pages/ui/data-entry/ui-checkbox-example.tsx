import React, {useState} from 'react';
import {Checkbox} from '../../../engine/ui-components/data-entry/checkbox/checkbox-component';
import {SyntaxExampleTabs} from '../../../engine/ui-components/example-related/syntax-example-tabs';
import {IconStar} from '../../../engine/ui-components/general/icons/icon-star-component';
import {Title} from '../../../engine/ui-components/general/typography/title-component';

const Markup = `<Title level={4}>Default</Title>

<Checkbox checked={value1} title={'Allow something normal'} onChange={setValue1}/>
<Checkbox checked={value2} onChange={setValue2}>Allow something else</Checkbox>
<Checkbox checked={value3} onChange={setValue3}>
	<>I have read and understood the &nbsp;<IconStar/>&nbsp; documentation</>
</Checkbox>
<Checkbox checked={true} disabled={true}>No way to change</Checkbox>
<Checkbox checked={false} disabled={true}>And to change this one as well</Checkbox>

<Title level={5}>Reversed</Title>

<div style={{width: '400px'}}>
	<Checkbox checked={value1} reversed={true} title={'Allow something reversed'} onChange={setValue1}/>
	<Checkbox checked={value2} reversed={true} onChange={setValue2}>Allow something else</Checkbox>
	<Checkbox checked={value3} reversed={true} onChange={setValue3}>
		<>I have read and understood the &nbsp;<IconStar/>&nbsp; documentation</>
	</Checkbox>
	<Checkbox checked={true} reversed={true} disabled={true}>No way to change</Checkbox>
	<Checkbox checked={false} reversed={true} disabled={true}>And to change this one as well</Checkbox>
</div>

<Title level={4}>Inline</Title>
<Checkbox checked={value1} inline={true} title={'Allow something inline'} onChange={setValue1}/>
<Checkbox checked={value2} inline={true} onChange={setValue2}>Allow something else</Checkbox>
<Checkbox checked={value3} inline={true} onChange={setValue3}>
	<>I have read and understood the &nbsp;<IconStar/>&nbsp; documentation</>
</Checkbox>
<Checkbox checked={true} inline={true} disabled={true}>No way to change</Checkbox>
<Checkbox checked={false} inline={true} disabled={true}>And to change this one as well</Checkbox>

<Title level={5}>Reversed inline</Title>

<Checkbox checked={value1} inline={true} reversed={true} title={'Allow something inline reversed'} onChange={setValue1}/>
<Checkbox checked={value2} inline={true} reversed={true} onChange={setValue2}>Allow something else</Checkbox>
<Checkbox checked={value3} inline={true} reversed={true} onChange={setValue3}>
	<>I have read and understood the &nbsp;<IconStar/>&nbsp; documentation</>
</Checkbox>
<Checkbox checked={true} inline={true} reversed={true} disabled={true}>No way to change</Checkbox>
<Checkbox checked={false} inline={true} reversed={true} disabled={true}>And to change this one as well</Checkbox>
`;


const Syntax = `export type TCheckboxProps = {
	checked: boolean
	disabled?: boolean
	inline?: boolean
	reversed?: boolean
	onChange?: (checked: boolean) => void
	children?: string | JSX.Element
	title?: string
};

const Checkbox: React.FC<TCheckboxProps> = (props: TCheckboxProps) => {...`;

export const UiCheckboxExample: React.FC = () => {
	const [value1, setValue1] = useState(true);
	const [value2, setValue2] = useState(false);
	const [value3, setValue3] = useState(false);

	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		code={`const [value1, setValue1] = useState(true);
const [value2, setValue2] = useState(false);
const [value3, setValue3] = useState(false);

<Checkbox checked={value1} title={'Allow something normal'} onChange={setValue1}/>
<Checkbox checked={value2} onChange={setValue2}>Allow something else</Checkbox>
<Checkbox checked={value3} onChange={setValue3}>
	<>I have read and understood the &nbsp;<IconStar/>&nbsp; documentation</>
</Checkbox>
		`}
		syntax={Syntax}
		result={<div>
			<Title level={4}>Default</Title>

			<Checkbox checked={value1} title={'Allow something normal'} onChange={setValue1}/>
			<Checkbox checked={value2} onChange={setValue2}>Allow something else</Checkbox>
			<Checkbox checked={value3} onChange={setValue3}>
				<>I have read and understood the &nbsp;<IconStar/>&nbsp; documentation</>
			</Checkbox>
			<Checkbox checked={true} disabled={true}>No way to change</Checkbox>
			<Checkbox checked={false} disabled={true}>And to change this one as well</Checkbox>

			<Title level={5}>Reversed</Title>

			<div style={{width: '400px'}}>
				<Checkbox checked={value1} reversed={true} title={'Allow something reversed'} onChange={setValue1}/>
				<Checkbox checked={value2} reversed={true} onChange={setValue2}>Allow something else</Checkbox>
				<Checkbox checked={value3} reversed={true} onChange={setValue3}>
					<>I have read and understood the &nbsp;<IconStar/>&nbsp; documentation</>
				</Checkbox>
				<Checkbox checked={true} reversed={true} disabled={true}>No way to change</Checkbox>
				<Checkbox checked={false} reversed={true} disabled={true}>And to change this one as well</Checkbox>
			</div>

			<p>&nbsp;</p>

			<Title level={4}>Inline</Title>
			<Checkbox checked={value1} inline={true} title={'Allow something inline'} onChange={setValue1}/>
			<Checkbox checked={value2} inline={true} onChange={setValue2}>Allow something else</Checkbox>
			<Checkbox checked={value3} inline={true} onChange={setValue3}>
				<>I have read and understood the &nbsp;<IconStar/>&nbsp; documentation</>
			</Checkbox>
			<Checkbox checked={true} inline={true} disabled={true}>No way to change</Checkbox>
			<Checkbox checked={false} inline={true} disabled={true}>And to change this one as well</Checkbox>

			<Title level={5}>Reversed inline</Title>

			<Checkbox checked={value1} inline={true} reversed={true} title={'Allow something inline reversed'} onChange={setValue1}/>
			<Checkbox checked={value2} inline={true} reversed={true} onChange={setValue2}>Allow something else</Checkbox>
			<Checkbox checked={value3} inline={true} reversed={true} onChange={setValue3}>
				<>I have read and understood the &nbsp;<IconStar/>&nbsp; documentation</>
			</Checkbox>
			<Checkbox checked={true} inline={true} reversed={true} disabled={true}>No way to change</Checkbox>
			<Checkbox checked={false} inline={true} reversed={true} disabled={true}>And to change this one as well</Checkbox>
		</div>}
	/>;
};
