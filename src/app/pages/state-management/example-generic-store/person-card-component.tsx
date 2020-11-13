import {observer} from 'mobx-react';
import React from 'react';
import {Button} from '../../../engine/components/ui/general/button/button-component';
import {Title} from '../../../engine/components/ui/general/typography/title-component';
import {AppPersonStore} from '../../../engine/store/@stores';
import {PersonCellInput} from './fields/input-cell-component';
import {PersonLocationCityInput} from './fields/input-city-component';
import {PersonLocationCountryInput} from './fields/input-country-component';
import {PersonEmailInput} from './fields/input-email-component';
import {PersonNameFirstInput} from './fields/input-first-component';
import {PersonNameLastInput} from './fields/input-last-component';
import {PersonPhoneInput} from './fields/input-phone-component';
import {PersonLocationStateInput} from './fields/input-state-component';
import {PersonNameTitleInput} from './fields/input-title-component';

type TPersonCardComponentProps = {
	onReset: () => void
	onSave: () => void
};

export const PersonCardComponent: React.FC<TPersonCardComponentProps> =
	observer((props) => {

		return <div className={'example-simple-form'}>
			<Title level={3} noTopMargin>
				{AppPersonStore.name.title} {AppPersonStore.name.first} {AppPersonStore.name.last}
			</Title>

			<Title level={6} bottomBorder>Name</Title>

			<div className={'form-row'}>
				<label>Title</label>
				<PersonNameTitleInput/>
			</div>

			<div className={'form-row'}>
				<label>First name</label>
				<PersonNameFirstInput/>
			</div>

			<div className={'form-row'}>
				<label>Last name</label>
				<PersonNameLastInput/>
			</div>

			<Title level={6} bottomBorder>Contacts</Title>

			<div className={'form-row'}>
				<label>E-mail</label>
				<PersonEmailInput/>
			</div>

			<div className={'form-row'}>
				<label>Phone</label>
				<PersonPhoneInput/>
				&nbsp;Cell&nbsp;
				<PersonCellInput/>
			</div>

			<Title level={6} bottomBorder>Location</Title>

			<div className={'form-row'}>
				<label>Country</label>
				<PersonLocationCountryInput/>
			</div>

			<div className={'form-row'}>
				<label>State</label>
				<PersonLocationStateInput/>
			</div>

			<div className={'form-row'}>
				<label>City</label>
				<PersonLocationCityInput/>
			</div>

			<div className={'form-actions'}>
				<Button
					onClick={props.onSave}
					style={{width: '8em'}}
					type={'primary'} disabled={!AppPersonStore.changed}>
					Save
				</Button>

				<Button
					onClick={props.onReset}
					style={{width: '8em'}}
					type={'danger'} disabled={!AppPersonStore.changed}>
					Reset ({AppPersonStore.version})
				</Button>
			</div>

		</div>;
	});
