import React from 'react';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

export const FooterPage: React.FC = () => {
	return <>

		<Title nav={'overview'}>Footer</Title>

		<Src src={'src/engine/layout/footer/footer-component.tsx'}/>
		<p>
			The simplest part ever. Just a dumb container, do what you want with it.
		</p>

		<SyntaxHighlight
			title={'src/engine/layout/footer/footer-component.tsx'}
			content={`export const AppFooter: React.FC = () => {
	return <div className={'app-footer'}>
		<div className={'app-footer-content'}>
			&copy; Lexey111, 2020
		</div>
	</div>;
};`}/>
		<p>
			No observables, no logic, no behavior. Perfect.
		</p>
	</>;
};
