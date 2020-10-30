import React from 'react';
import {PageSubmenu} from '../../../layout/page-submenu/page-submenu-component';
import {SourceFile} from '../../../components/ui/example-related/source-file-component';
import {Title} from '../../../components/ui/general/typography/title-component';
import {UiRadioExample} from './ui-radio-example';

export const UiDataEntryPage: React.FC = () => {
	return <>
		<PageSubmenu/>
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
	</>;
};
