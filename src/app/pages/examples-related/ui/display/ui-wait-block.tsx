import React, {useCallback, useState} from 'react';
import {WaitBlock} from '../../../../../engine/ui-components/display/wait/wait-block-component';
import {SyntaxExampleTabs} from '../../../../../engine/ui-components/examples-related/syntax-example-tabs';
import {Button} from '../../../../../engine/ui-components/general/button/button-component';

const Markup = '<WaitBlock/>';

const Syntax = `type TWaitBlockComponentProps = {
	message?: string
};
`;

const Code = `const [useWait, setUseWait] = useState(false);

const toggleWaiter = useCallback(() => {
	setUseWait(true);
	setTimeout(() => {
		setUseWait(false);
	}, 5000);
}, [useWait]);

return <div className={'example-tab'}>
	<Button type={'primary'} onClick={toggleWaiter}>Turn on for 5 sec</Button>
	{useWait && <WaitBlock/>}
</div>;
`;

export const UiWaitBlockExample: React.FC = () => {
	const [useWait, setUseWait] = useState(false);

	const toggleWaiter = useCallback(() => {
		setUseWait(true);
		setTimeout(() => {
			setUseWait(false);
		}, 5000);
	}, []);

	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		code={Code}
		result={<div className={'example-tab'}>
			<Button type={'primary'} onClick={toggleWaiter}>Turn on for 5 sec</Button>
			{useWait && <WaitBlock/>}
		</div>}
	/>;
};
