import {observer} from 'mobx-react';
import React from 'react';
import {Link} from 'react-router-dom';
import {Src} from '../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../engine/ui-components/examples-related/syntax-highlight';
import {Title} from '../../../../engine/ui-components/general/typography/title-component';
import {AppStateStore} from '../../../store/@stores';
import {FakeLogout} from '../routes-subroutes/protected/fake-logout-component';

export const ProfilePage: React.FC = observer(() => {
	return <>
		<Title level={1} subTitle={'current user data'}>Profile page</Title>

		<Src src={'src/app/pages/examples-related/profile/index.tsx'}/>

		<p>
			Fake component to mimic real Profile page.
		</p>

		<table className={'example-table-form'}>
			<tbody>
			<tr>
				<td>
					Id
				</td>
				<td>
					{AppStateStore.userId}
				</td>
			</tr>
			<tr>
				<td>
					Name
				</td>
				<td>
					{AppStateStore.userName}
				</td>
			</tr>
			<tr>
				<td>
					Avatar
				</td>
				<td>
					<img src={AppStateStore.userImageUrl} alt={'user'}/>
				</td>
			</tr>
			</tbody>
		</table>

		<div className={'example-component-container'}>
			<FakeLogout/>
		</div>

		<p>
			The page uses <Src src={'src/app/pages/examples-related/routes-subroutes/protected/fake-logout-component.tsx'} inline/> component
			to imitate the logout process. Component, in its turn, just reset values in <Link to={'/state-management/app-state'}>AppStateStore</Link>:
		</p>

		<SyntaxHighlight
			title={'fake-logout-component.tsx'}
			content={`AppStateStore.isAuthorizationInProgress = true;

const delay = setTimeout(() => {
	AppStateStore.isAuthorizationInProgress = false;
	AppStateStore.isAuthorized = false;
	AppStateStore.userName = '';
	AppStateStore.userId = '';
	AppStateStore.userImageUrl = '';
}, 2500);`}/>
	</>;
});

