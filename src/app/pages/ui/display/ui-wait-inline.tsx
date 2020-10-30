import React from 'react';
import {WaitInlineComponent} from '../../../components/ui/display/wait/wait-inline-component';
import {SyntaxExampleTabs} from '../../../components/ui/example-related/syntax-example-tabs';

const Markup = `<WaitInlineComponent message={'Please wait...[custom message]...'}/>
<WaitInlineComponent/>
`;

const Syntax = `type TWaitInlineComponentProps = {
	message?: string
	className?: string
};
`;

const JSX = <>
	<p>
		Your data: <WaitInlineComponent message={'Wait...'}/>
	</p>
	<p>
		<WaitInlineComponent/>
	</p>
</>;

export const UiWaitInlineExample: React.FC = () => {
	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		result={<div className={'example-tab'}>
			{JSX}
		</div>}
	/>;
};
