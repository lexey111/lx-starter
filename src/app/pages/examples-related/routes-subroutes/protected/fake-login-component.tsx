import {observer} from 'mobx-react';
import React from 'react';
import {Button} from '../../../../../engine/ui-components/general/button/button-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

export const FakeLogin: React.FC = observer(() => {
	return <div className={'fake-login-form'}>
		<Title
			level={4}
			subTitle={'This is fake component so just click "Login" button'}>
			Please login using your credentials
		</Title>

		<div className={'line'}>
			<input type={'text'} placeholder={'Login'}/>
		</div>
		<div className={'line'}>
			<input type={'password'} placeholder={'Password'}/>
		</div>
		<div className={'line'}>
			<Button type={'primary'}>Login</Button>
			<Button disabled={true}>Register</Button>
		</div>
	</div>;
});
