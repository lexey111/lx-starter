import React from 'react';
import {Src} from '../../../../engine/ui-components/example-related/src-component';
import {Title} from '../../../../engine/ui-components/general/typography/title-component';
import {UiCheckboxExample} from './ui-checkbox-example';
import {UiRadioExample} from './ui-radio-example';

export const UiDataEntryPage: React.FC = () => {
	return <>
		<Title>Data entry</Title>
		<p>
			The components an user can interact with, and enter some data.
		</p>

		<Title level={2} nav={'radio'}>Radio</Title>
		<Src src={'src/app/ui-components/ui/data-entry/radio-button'}/>

		<p>
			Basic radio-group implementation. Supports keyboard navigation and disabled items, as well as vertical and horizontal layouts.
		</p>

		<UiRadioExample/>

		<Title level={2} nav={'checkbox'}>Checkbox</Title>
		<Src src={'src/app/ui-components/ui/data-entry/checkbox/checkbox-component.tsx'}/>

		<p>
			Basic checkbox implementation. Supports keyboard navigation and disabled items, as well as inline and reversed layouts.
		</p>

		<UiCheckboxExample/>
	</>;
};
