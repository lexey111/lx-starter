import React, {useCallback, useState} from 'react';
import {WaitTag} from '../../../../../engine/ui-components/display/wait/wait-tag-component';
import {SyntaxExampleTabs} from '../../../../../engine/ui-components/examples-related/syntax-example-tabs';
import {Button} from '../../../../../engine/ui-components/general/button/button-component';

const Markup = `<p>
	User name: <WaitTag>{userName}</WaitTag>
</p>
<p>
	User name (danger): <WaitTag type={'danger'}>{userName}</WaitTag>
</p>
<p>
	User name (warning): <WaitTag type={'warning'}>{userName}</WaitTag>
</p>
<p>
	User name (success): <WaitTag type={'success'}>{userName}</WaitTag>
</p>
<p>
	User name (wait with spinner): <WaitTag showSpinner={true}>{userName}</WaitTag>
</p>
`;

const Syntax = `type TWaitTagProps = {
	children?: any
	type?: 'default' | 'danger' | 'warning' | 'success'
	showSpinner?: boolean
};
`;

const Code = `const [userName, setUserName] = useState('');

const toggleWaiter = useCallback(() => {
	setUserName('John Doe');
	setTimeout(() => {
		setUserName('');
	}, 3000);
}, []);

return <div className={'example-tab'}>
	<p>
		User name: <WaitTag>{userName}</WaitTag>
	</p>
	<p>
		User name (danger): <WaitTag type={'danger'}>{userName}</WaitTag>
	</p>
	<p>
		User name (warning): <WaitTag type={'warning'}>{userName}</WaitTag>
	</p>
	<p>
		User name (success): <WaitTag type={'success'}>{userName}</WaitTag>
	</p>
	<p>
		User name (wait with spinner): <WaitTag showSpinner={true}>{userName}</WaitTag>
	</p>
	<hr/>
	<Button type={'primary'} onClick={toggleWaiter}>Turn Name on for 3 sec</Button>
</div>;
`;

export const UiWaitTagExample: React.FC = () => {
	const [userName, setUserName] = useState('');

	const toggleWaiter = useCallback(() => {
		setUserName('John Doe');
		setTimeout(() => {
			setUserName('');
		}, 3000);
	}, []);

	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		code={Code}
		result={<div className={'example-tab'}>
			<p>
				User name: <WaitTag>{userName}</WaitTag>
			</p>
			<p>
				User name (danger): <WaitTag type={'danger'}>{userName}</WaitTag>
			</p>
			<p>
				User name (warning): <WaitTag type={'warning'}>{userName}</WaitTag>
			</p>
			<p>
				User name (success): <WaitTag type={'success'}>{userName}</WaitTag>
			</p>
			<p>
				User name (wait with spinner): <WaitTag showSpinner={true}>{userName}</WaitTag>
			</p>
			<hr/>
			<Button type={'primary'} onClick={toggleWaiter}>Turn Name on for 3 sec</Button>
		</div>}
	/>;
};
