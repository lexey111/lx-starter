import React from 'react';
import {SyntaxExampleTabs} from '../../../../../engine/ui-components/examples-related/syntax-example-tabs';
import {Button} from '../../../../../engine/ui-components/general/button/button-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

const Markup = `<Title level={5}>Default</Title>
<div>
	<Button type={'primary'}>Primary</Button>
	<Button type={'default'}>Default</Button>
	<Button type={'danger'}>Danger</Button>
	<Button type={'success'}>Success</Button>
	<Button type={'link'}>Link</Button>
</div>

<Title level={5}>Disabled</Title>
<div>
	<Button type={'primary'} disabled={true}>Primary</Button>
	<Button type={'default'} disabled={true}>Default</Button>
	<Button type={'danger'} disabled={true}>Danger</Button>
	<Button type={'success'} disabled={true}>Success</Button>
	<Button type={'link'} disabled={true}>Link</Button>
</div>
<p>&nbsp;</p>
<Title level={5}>Size: small</Title>
<div>
	<Button type={'primary'} small>Primary</Button>
	<Button type={'default'} small>Default</Button>
	<Button type={'danger'} small>Danger</Button>
	<Button type={'success'} small>Success</Button>
	<Button type={'link'} small>Link</Button>
</div>
`;

const JSX = <><Title level={5}>Default</Title>
	<div>
		<Button type={'primary'}>Primary</Button>
		<Button type={'default'}>Default</Button>
		<Button type={'danger'}>Danger</Button>
		<Button type={'success'}>Success</Button>
		<Button type={'link'}>Link</Button>
	</div>

	<Title level={5}>Disabled</Title>
	<div>
		<Button type={'primary'} disabled={true}>Primary</Button>
		<Button type={'default'} disabled={true}>Default</Button>
		<Button type={'danger'} disabled={true}>Danger</Button>
		<Button type={'success'} disabled={true}>Success</Button>
		<Button type={'link'} disabled={true}>Link</Button>
	</div>

	<Title level={5}>Size: small</Title>
	<div>
		<Button type={'primary'} small>Primary</Button>
		<Button type={'default'} small>Default</Button>
		<Button type={'danger'} small>Danger</Button>
		<Button type={'success'} small>Success</Button>
		<Button type={'link'} small>Link</Button>
	</div>
</>;

const Syntax = `type TButtonProps = {
	type?: 'primary' | 'default' | 'danger' | 'success' | 'link'
	disabled?: boolean
	small?: boolean
	onClick?: () => void
	style? : any
};

export const Button: React.FC<TButtonProps> = (props: TButtonProps) => {...`;

export const UiButtonsExample: React.FC = () => {
	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		result={<div className={'example-tab'}>
			{JSX}
		</div>}
	/>;
};
