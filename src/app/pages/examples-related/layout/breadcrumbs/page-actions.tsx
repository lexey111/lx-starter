import React, {useCallback, useEffect} from 'react';
import {LipsumPara} from '../../../../../engine/ui-components/examples-related/lipsum';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Button} from '../../../../../engine/ui-components/general/button/button-component';
import {IconFile} from '../../../../../engine/ui-components/general/icons/icon-file-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';
import {AppStateStore} from '../../../../store/@stores';

export const PageActionsPage: React.FC = () => {
	const onClick = useCallback(() => {
		// eslint-disable-next-line no-alert
		alert('Clicked!');
	}, []);

	useEffect(() => {
		AppStateStore._pageActions = <>
			<IconFile style={{
				width: '24px',
				height: '24px',
				paddingRight: '6px',
				fill: '#bbc'
			}}/>
			<Button type={'danger'} onClick={onClick}>Do something</Button>
			<Button onClick={onClick}>Do something else</Button>
		</>; // register

		return () => {
			AppStateStore._pageActions = null; // unregister
		};
	}, [onClick]);

	return <>

		<Title subTitle={'Scroll page to see how it works'} nav={'description'}>Page actions</Title>
		<Src src={'src/app/pages/examples-related/layout/breadcrumbs/page-actions.tsx'}/>

		<p>
			To use Page Actions developer needs manually register them on page creation and unregister on destroy:
		</p>

		<SyntaxHighlight
			content={`useEffect(() => {
	AppStateStore._pageActions = <>
		<Button type={'danger'}>Do something</Button>
		<Button>Do something else</Button>
	</>; // register

	return () => {
		AppStateStore._pageActions = null; // unregister
	};
}, []);
...
`}/>
		<p>
			The feature could be very usable if you displays, e.g., long table without sticky header and want to
			always show "Add record" button.
		</p>

		<div>
			<Button type={'danger'} onClick={onClick}>Do something</Button>
		</div>

		<Title level={4} nav={'filler'}>Filler</Title>
		<p>
			Just a filler to have a content to scroll...
		</p>

		<LipsumPara paragraphs={10}/>

		<Title level={4} nav={'end'}>The end</Title>
	</>;
};
