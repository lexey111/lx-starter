import React, {useCallback, useEffect} from 'react';
import {PageFooter} from '../../../../engine/layout/footer/page-footer-component';
import {PageRelated} from '../../../../engine/layout/page/related/app-page-related-component';
import {LipsumPara} from '../../../../engine/ui-components/examples-related/lipsum';
import {Src} from '../../../../engine/ui-components/examples-related/src-component';
import {Title} from '../../../../engine/ui-components/general/typography/title-component';
import {AppStateStore} from '../../../store/@stores';
import {CustomPageActions} from './custom-page-actions';

export const CustomPage: React.FC = () => {
	const onClick = useCallback(() => {
		// eslint-disable-next-line no-alert
		alert('Clicked!');
	}, []);

	useEffect(() => {
		AppStateStore._pageActions = <CustomPageActions onClick={onClick}/>; // register

		return () => {
			AppStateStore._pageActions = null; // unregister
		};
	}, [onClick]);

	return <>
		<Title level={1} nav={'overview'}>Custom page</Title>
		<Src src={'src/app/pages/examples-related/custom/index.tsx'}/>
		<p>
			This page demonstrates different custom components:
		</p>
		<ul>
			<li>
				Top panel
				<p>
					<Src src={'src/app/pages/examples-related/custom/custom-page-top-panel-component.tsx'} inline/>
				</p>
			</li>
			<li>
				Main menu (menu item, icon)
				<p>
					<Src src={'src/app/pages/examples-related/custom/custom-menu-item-component.tsx'} inline/>
				</p>
				<p>
					<Src src={'src/app/pages/examples-related/custom/custom-menu-dropdown-component.tsx'} inline/>
				</p>
			</li>
			<li>
				Breadcrumb action
				<p>
					<Src src={'src/app/pages/examples-related/custom/custom-page-actions.tsx'} inline/>
				</p>
			</li>
			<li>
				Custom page footer
				<p>
					<Src src={'src/app/pages/examples-related/custom/index.tsx'} inline/>
				</p>
			</li>
		</ul>

		<Title level={3} nav={'filler'}>Filler</Title>
		<LipsumPara paragraphs={10}/>

		<PageRelated items={[
			{
				url: '/layout/top-panel',
				title: 'Top panel'
			},
			{
				url: '/layout/main-menu',
				title: 'Main menu'
			},
			{
				url: '/layout/breadcrumbs',
				title: 'Breadcrumbs'
			},
			{
				url: '/layout/footer',
				title: 'Footer'
			},
		]}/>

		<PageFooter className={'custom-footer'}>
			<Title nav={'footer'} level={3}>Custom footer</Title>
			<p>
				Some custom content
			</p>
			<LipsumPara/>
		</PageFooter>
	</>;
};

