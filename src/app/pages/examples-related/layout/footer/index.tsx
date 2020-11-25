import React from 'react';
import {Link} from 'react-router-dom';
import {PageFooter} from '../../../../../engine/layout/footer/page-footer-component';
import {PageRelated} from '../../../../../engine/layout/page/related/app-page-related-component';
import {A} from '../../../../../engine/ui-components/examples-related/a-component';
import {LipsumPara} from '../../../../../engine/ui-components/examples-related/lipsum';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../../engine/ui-components/examples-related/tag-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

export const FooterPage: React.FC = () => {
	return <>

		<Title nav={'overview'}>Application Footer</Title>

		<Src src={'src/engine/layout/footer/app-footer-panel.tsx'}/>
		<p>
			The simplest part ever. Just a dumb container, do what you want with it.
		</p>

		<SyntaxHighlight
			title={'src/engine/layout/footer/app-footer-panel.tsx'}
			lines={[2, 3]}
			content={`export const AppFooterPanel: React.FC = () => {
	return <div className={'app-footer'} id={'app-footer-portal'}>
		<div className={'app-footer-content default-content'}>
			&copy; Lexey111, 2020
		</div>
	</div>;
};`}/>
		<p>
			No observables, no logic, no behavior. Perfect.
		</p>

		<p>
			The only interesting things here are <code>id</code> (2) and <code>default-content</code> (3).
		</p>

		<p>
			Component attached to the <code>@app.tsx</code>:
		</p>

		<SyntaxHighlight
			title={'src/app/@app.tsx'}
			lines={12}
			content={`<Router>
	<AppTopPanel/>
	...
	<AppTopFrame>
	...
	</AppTopFrame>
	<AppContainer>
	...
	</AppContainer>
	<AppPageRelatedPanel/>

	<AppFooterPanel/>
</Router>`}/>

		<Title nav={'page_footer'}>PageFooter</Title>
		<p>
			But where is the logic? In <Src src={'src/engine/layout/footer/page-footer-component.tsx'} inline/> component.
		</p>

		<p>
			It uses the same <A href={'https://reactjs.org/docs/portals.html'}>Portal</A> technic that <Link to={'/layout/page-related'}>Related panel</Link> uses.
		</p>

		<SyntaxHighlight
			title={'src/engine/layout/footer/page-footer-component.tsx'}
			content={`type TPageFooterProps = {
	className?: string
	children: any
};

export const PageFooter: React.FC<TPageFooterProps> = (props: TPageFooterProps) => {
	const container = useRef<any>(null);
	const [contentAssigned, setContentAssigned] = useState(false);

	useEffect(() => {
		return () => {
			// cleanup
		};
	}, []);

	useEffect(() => {
		container.current = document.getElementById('app-footer-portal');
		(container.current as HTMLDivElement).classList.add('app-footer-with-content');
		if (props.className) {
			(container.current as HTMLDivElement).classList.add(props.className);
		}
	}); // no deps - watch for external div

	if (!contentAssigned || !props.children) {
		return null;
	}

	return ReactDOM.createPortal(
		<div className={'app-footer-content'}>
			{props.children}
		</div>,
		container.current as HTMLDivElement
	);
};`}/>

		<p>
			The component wraps the children into <Tag>div</Tag> with class <code>app-footer-content</code> and assigns
			classes <code>app-footer-with-content</code> and <code>props.<b>className</b></code> (if any) to the
			portal.
		</p>

		<Title nav={'usage'} level={3}>Usage</Title>
		<p>
			Just place somewhere on page something like that:
		</p>

		<SyntaxHighlight
			content={`<PageFooter className={'some-custom-footer'}>
	<Title level={4} subTitle={'Some custom content'}>Custom footer</Title>
	<LipsumPara/>
</PageFooter>`}/>

		<PageFooter className={'some-custom-footer'}>
			<Title level={4} subTitle={'Some custom content'}>Custom footer</Title>
			<LipsumPara/>
		</PageFooter>

		<PageRelated items={[
			{
				url: '/layout/page-related',
				title: 'Related menu'
			},
		]}/>
	</>;
};
