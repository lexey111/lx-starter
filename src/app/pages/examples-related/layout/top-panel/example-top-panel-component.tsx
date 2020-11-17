import {observer} from 'mobx-react';
import React, {useLayoutEffect} from 'react';
import {PageTopPanel} from '../../../../engine/layout/top-panel/page-top-panel-component';
import {LipsumPara} from '../../../../engine/ui-components/examples-related/lipsum';
import {Title} from '../../../../engine/ui-components/general/typography/title-component';
import {ExampleTopPanelStore} from './panel-store';

export const ExampleTopPanel: React.FC = observer(() => {
	useLayoutEffect(() => {
		if (ExampleTopPanelStore.visible) {
			// scroll page to top to show the panel
			window.scrollTo(0, 0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ExampleTopPanelStore.visible]);

	return <PageTopPanel
		type={ExampleTopPanelStore.type}
		className={'example-top-green-panel'}>
		{ExampleTopPanelStore.visible && <table>
			<tbody>
			<tr>
				<td width={'30%'}>
					<Title level={3} subTitle={'as easy as ABC'}>
						Example Top Panel
					</Title>
				</td>
				<td>
					<LipsumPara paragraphs={1} words={20}/>
				</td>
				<td>
					<LipsumPara paragraphs={1} words={20}/>
				</td>
			</tr>
			</tbody>
		</table>}
	</PageTopPanel>;
});

