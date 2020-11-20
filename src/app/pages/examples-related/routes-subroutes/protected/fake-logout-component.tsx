import {observer} from 'mobx-react';
import React from 'react';
import {Button} from '../../../../../engine/ui-components/general/button/button-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

export const FakeLogout: React.FC = observer(() => {
	return <div className={'fake-login-form'}>
		<Title
			level={4}
			subTitle={'This is fake component so just click "Logout" button'}>
			Log out
		</Title>

		<div className={'line-centered'}>
			<Button type={'danger'}>Logout</Button>
			<Button disabled={true}>Cancel</Button>
		</div>
	</div>;
});
