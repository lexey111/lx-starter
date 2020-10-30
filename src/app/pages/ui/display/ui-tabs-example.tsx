import React from 'react';
import {TabPane, Tabs} from '../../../components/ui/display/tabs/tabs-component';
import {LipsumPara} from '../../../components/ui/example-related/lipsum';
import {SyntaxExampleTabs} from '../../../components/ui/example-related/syntax-example-tabs';
import {IconHome} from '../../../components/ui/general/icons/icon-home-component';

const Markup = `<Tabs activeId={'page2'}>
	<TabPane title={'Page 1'} id={'page1'}>
		<LipsumPara paragraphs={2}/>
	</TabPane>
	<TabPane title={'Page 2 (active by default)'} id={'page2'}>
		<LipsumPara paragraphs={2}/>
	</TabPane>
	<TabPane title={<span><IconHome/> Page 3</span>} id={'page3'}>
		<LipsumPara paragraphs={2}/>
	</TabPane>
</Tabs>
`;

const JSX = <Tabs activeId={'page2'}>
	<TabPane title={'Page 1'} id={'page1'}>
		<LipsumPara paragraphs={2}/>
	</TabPane>
	<TabPane title={'Page 2 (active by default)'} id={'page2'}>
		<LipsumPara paragraphs={2}/>
	</TabPane>
	<TabPane title={<span><IconHome/> Page 3</span>} id={'page3'}>
		<LipsumPara paragraphs={2}/>
	</TabPane>
</Tabs>;

const Syntax = `export type TTabPaneProps = {
	title: string | JSX.Element
	id: string
	noPaddings?: boolean
};

type TTabsProps = {
	activeId?: string
};

const Tabs: React.FC<TTabsProps> = (props: TTabsProps) => {...
`;

export const UiTabsExample: React.FC = () => {
	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		result={<div>
			{JSX}
		</div>}
	/>;
};
