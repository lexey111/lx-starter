import React from 'react';
import {SourceFile} from '../../../components/ui/example-related/source-file-component';
import {Title} from '../../../components/ui/general/typography/title-component';
import {UiCheckboxExample} from './ui-checkbox-example';
import {UiRadioExample} from './ui-radio-example';

export const UiDataEntryPage: React.FC = () => {
	return <>
		<Title>Data entry</Title>
		<p>
			The components an user can interact with, and enter some data.
		</p>

		<Title level={2}>Radio</Title>
		<SourceFile src={'src/app/components/ui/data-entry/radio-button'}/>

		<p>
			Basic radio-group implementation. Supports keyboard navigation and disabled items, as well as vertical and horizontal layouts.
		</p>

		<UiRadioExample/>

		<Title level={2}>Checkbox</Title>
		<SourceFile src={'src/app/components/ui/data-entry/checkbox/checkbox-component.tsx'}/>

		<p>
			Basic checkbox implementation. Supports keyboard navigation and disabled items, as well as inline and reversed layouts.
		</p>

		<UiCheckboxExample/>
	</>;
};
