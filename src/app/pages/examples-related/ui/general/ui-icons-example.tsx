import React from 'react';
import {IconArrowLeft} from '../../../../../engine/ui-components/general/icons/icon-arrow-left-component';
import {IconArrowRight} from '../../../../../engine/ui-components/general/icons/icon-arrow-right-component';
import {IconCheck} from '../../../../../engine/ui-components/general/icons/icon-check-component';
import {IconClose} from '../../../../../engine/ui-components/general/icons/icon-close-component';
import {IconExpander} from '../../../../../engine/ui-components/general/icons/icon-expander-component';
import {IconFile} from '../../../../../engine/ui-components/general/icons/icon-file-component';
import {IconFolder} from '../../../../../engine/ui-components/general/icons/icon-folder-component';
import {IconHome} from '../../../../../engine/ui-components/general/icons/icon-home-component';
import {IconMenu} from '../../../../../engine/ui-components/general/icons/icon-menu-component';
import {IconSettings} from '../../../../../engine/ui-components/general/icons/icon-settings-component';
import {IconSpinner} from '../../../../../engine/ui-components/general/icons/icon-spinner-component';
import {IconStar} from '../../../../../engine/ui-components/general/icons/icon-star-component';
import {IconUser} from '../../../../../engine/ui-components/general/icons/icon-user-component';
import {SyntaxExampleTabs} from '../../../../../engine/ui-components/examples-related/syntax-example-tabs';

const Markup = `<IconUser/>
<IconUser style={{fill: 'red'}}/>
<IconStar/>
<IconHome style={{fill: 'green'}}/>
<IconSpinner/>
<IconExpander/>
<IconArrowLeft/>
<IconArrowRight/>
<IconFile/>
<IconFolder/>
<IconCheck/>
<IconClose/>
<IconSettings/>
<IconMenu/>`;

const JSX = <>
	<IconUser style={{fill: 'red'}}/>
	<IconStar/>
	<IconHome style={{fill: 'green'}}/>
	<IconSpinner/>
	<IconExpander/>
	<IconArrowLeft/>
	<IconArrowRight/>
	<IconFile/>
	<IconFolder/>
	<IconCheck/>
	<IconClose/>
	<IconSettings/>
	<IconMenu/>
</>;

const Code = `import {IconHome} from '../../../../engine/ui-components/general/icons/icon-home-component';
...
	<div>
		<IconHome style={{fill: 'green'}}/>
	</div>
...
`;

const Syntax = `import React from 'react';
import {TIconProps} from './icons-interface';

export const IconHome: React.FC<TIconProps> = (props: TIconProps) => {
	const {
		className,
		style
	} = props;
	// antd: home.svg
	return <svg viewBox="64 64 896 896" focusable="false" className={'app-icon' + (className ? ' ' + className : '')} style={{...style}}>
		<path
			d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 
			..."/>
	</svg>;
};`;

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
