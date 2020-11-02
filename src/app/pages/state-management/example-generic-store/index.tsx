import React from 'react';
import {SourceFile} from '../../../components/ui/example-related/source-file-component';
import {Title} from '../../../components/ui/general/typography/title-component';
import {PageSubmenu} from '../../../layout/page-submenu/page-submenu-component';
import {PeopleExampleComponent} from './people-component';

export const StateGenericStorePage: React.FC = () => {
	return <>
		<PageSubmenu/>
		<Title>Generic State store</Title>

		<Title level={2}>Overview</Title>
		<p>
			Usually when developer creates stores for many forms there are a lot of boilerplate
			code appears. To serve 'common needs' I created <SourceFile src={'src/app/store/utils/store-utils.ts'} inline={true}/>.
		</p>

		<p>
			The functions collected in the file helps to process all the store lifecycle methods.
		</p>

		<p>
			Let's start with creating People Store:
		</p>
		<PeopleExampleComponent/>

	</>;
};
