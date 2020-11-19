import React, {useState} from 'react';
import {Checkbox} from '../../../../../engine/ui-components/data-entry/checkbox/checkbox-component';
import {TabPane, Tabs} from '../../../../../engine/ui-components/display/tabs/tabs-component';
import {LipsumPara} from '../../../../../engine/ui-components/examples-related/lipsum';
import {SyntaxExampleTabs} from '../../../../../engine/ui-components/examples-related/syntax-example-tabs';
import {IconHome} from '../../../../../engine/ui-components/general/icons/icon-home-component';

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
	const [showPage4, setShowPage4] = useState(false);

	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		result={<div>
			<Tabs activeId={'page2'}>
				<TabPane title={'Page 1'} id={'page1'}>
					<LipsumPara paragraphs={2}/>
				</TabPane>
				<TabPane title={'Page 2 (active by default)'} id={'page2'}>
					<LipsumPara paragraphs={2}/>
				</TabPane>
				<TabPane title={<span><IconHome/> Page 3</span>} id={'page3'}>
					<Checkbox checked={showPage4} onChange={setShowPage4}>Show Page 4</Checkbox>
					<LipsumPara paragraphs={2}/>
				</TabPane>
				{showPage4 && <TabPane title={'Page 4'} id={'page4'}>
					<LipsumPara paragraphs={2}/>
				</TabPane>}
			</Tabs>
		</div>}
	/>;
};
