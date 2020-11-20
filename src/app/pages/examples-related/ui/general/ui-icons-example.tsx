import React from 'react';
import {SyntaxExampleTabs} from '../../../../../engine/ui-components/examples-related/syntax-example-tabs';
import {Icon} from '../../../../../engine/ui-components/general/icons/icon-component';
import {IconsMap} from '../../../../../engine/ui-components/general/icons/icons-map';

const generatorFn = Object.keys(IconsMap).map(type => <Icon
	key={type}
	style={{fill: '#' + Math.floor(Math.random() * 16777215).toString(16)}}
	type={type}/>);

const Markup = Object.keys(IconsMap).map(type => `<Icon type={'${type}'}/>`).join('\n');

const JSX = <>
	<Icon type={'unknown'}/>

	{generatorFn}
</>;

const Code = `import {IconHome} from '../../../../engine/ui-components/general/icons/icon-home-component';
...
	<div>
		<Icon type={'home'} style={{fill: 'green'}}/>
	</div>

	<Icon type={'unknown'}/>

	{Object.keys(IconsMap).map(type => <Icon
		key={type}
		style={{fill: '#' + Math.floor(Math.random() * 16777215).toString(16)}}
		type={type}/>)}

...
`;

const Syntax = `export type TIconProps = {
	type: string
	className?: string
	style?: Record<string, string>
};

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
