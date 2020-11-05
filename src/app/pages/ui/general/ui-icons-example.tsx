import React from 'react';
import {IconArrowLeft} from '../../../components/ui/general/icons/icon-arrow-left-component';
import {IconArrowRight} from '../../../components/ui/general/icons/icon-arrow-right-component';
import {IconCheck} from '../../../components/ui/general/icons/icon-check-component';
import {IconClose} from '../../../components/ui/general/icons/icon-close-component';
import {IconExpander} from '../../../components/ui/general/icons/icon-expander-component';
import {IconFile} from '../../../components/ui/general/icons/icon-file-component';
import {IconHome} from '../../../components/ui/general/icons/icon-home-component';
import {IconSettings} from '../../../components/ui/general/icons/icon-settings-component';
import {IconSpinner} from '../../../components/ui/general/icons/icon-spinner-component';
import {IconStar} from '../../../components/ui/general/icons/icon-star-component';
import {IconUser} from '../../../components/ui/general/icons/icon-user-component';
import {SyntaxExampleTabs} from '../../../components/ui/example-related/syntax-example-tabs';

const Markup = `<IconUser/>
<IconStar/>
<IconHome/>
<IconSpinner/>
<IconExpander/>
<IconArrowLeft/>
<IconArrowRight/>
<IconFile/>
<IconCheck/>
<IconClose/>
<IconSettings/>`;

const JSX = <>
	<IconUser/>
	<IconStar/>
	<IconHome/>
	<IconSpinner/>
	<IconExpander/>
	<IconArrowLeft/>
	<IconArrowRight/>
	<IconFile/>
	<IconCheck/>
	<IconClose/>
	<IconSettings/>
</>;

const Code = `import {IconHome} from '../../../components/ui/general/icons/icon-home-component';
...
	<div>
		<IconHome/>
	</div>
...
`;

const Syntax = `import React from 'react';

export const IconHome: React.FC = () => {
	// antd: home.svg
	return <svg viewBox="64 64 896 896" focusable="false" className={'app-icon'}>
		<path
			d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 
			46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 
			63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 
			868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 
			40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"/>
	</svg>;
};
`;

export const UiIconsExample: React.FC = () => {
	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		code={Code}
		syntax={Syntax}
		result={<div className={'example-tab big-icons'}>
			{JSX}
		</div>}
	/>;
};
