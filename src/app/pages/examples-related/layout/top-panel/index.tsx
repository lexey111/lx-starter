/* eslint-disable react/jsx-no-bind */
import {observer} from 'mobx-react';
import React from 'react';
import {Link} from 'react-router-dom';
import {Checkbox} from '../../../../../engine/ui-components/data-entry/checkbox/checkbox-component';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../../engine/ui-components/examples-related/tag-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';
import {ExampleTopPanelStore} from './panel-store';

export const TopPanelPage: React.FC = observer(() => {
	return <>
		<Title nav={'overview'}>Top panel</Title>
		<Src src={'src/engine/layout/top-panel/app-top-panel-component.tsx'}/>

		<p>
			This is an optional topmost panel which displays... whatever.
		</p>

		<p>
			The top panel should be declared in the app <Link to={'/routing'}>routing file</Link> as
			React component:
		</p>

		<SyntaxHighlight
			lines={4}
			content={`{
	title: 'Home',
	url: '/home',
	topPanel: <HomePageTopPanel/>,
	page: <HomePage/>,
},
`}/>

		<p>
			Your panel component has to be wrapped up into <Tag>PageTopPanel</Tag> component.
		</p>

		<SyntaxHighlight content={`export const ExampleTopPanel: React.FC = () => {
	return <PageTopPanel>
	...content...
	</PageTopPanel>;
};`}/>

		<p>
			The reason is &mdash; <Tag>PageTopPanel</Tag> observes content height and automatically tunes
			top padding of Main menu to keep the layout consistent. It updates <code>AppStateStore._topPanelHeight</code> field.
		</p>

		<Title level={2} nav={'dynamic_visibility'}>Dynamic visibility</Title>

		<div className={'example-component-container'}>
			<Title level={6} bottomBorder noTopMargin>
				Set the panel visibility and type (default/fixed):
			</Title>

			<Checkbox
				checked={ExampleTopPanelStore.visible}
				onChange={() => ExampleTopPanelStore.visible = !ExampleTopPanelStore.visible}> Show panel
			</Checkbox>

			<Checkbox
				checked={ExampleTopPanelStore.type === 'fixed'}
				onChange={() => {
					ExampleTopPanelStore.type = ExampleTopPanelStore.type === 'fixed' ? 'default' : 'fixed';
				}}> Type: fixed
			</Checkbox>
		</div>

		<Title level={2} nav={'dynamic_howto'}>How to make it work</Title>
		<p>
			Disclaimer: you can achieve the same different ways.
		</p>

		<p>
			Because Panel component and Page components have no direct links and know nothing about each other,
			we cannot use, e.g., <code>React.Contexts</code>. Well we can, but it should be applied on very
			top level, in <Src src={'@app.tsx'} inline/> file.
		</p>

		<p>
			To hide and show the panel one can use different approaches to pass the desired state.
			This is one of the simplest (excl. global vars and session/local storage): <code>Store</code>.
		</p>

		<Title level={3} nav={'dynamic_store'}>1. Store</Title>

		<p>
			Very, very simple one. Just to don't mess up the <Link to={'/state-management/app-state'}>AppState</Link> Store.
		</p>

		<SyntaxHighlight
			lines={[4, 5, 11]}
			title={'src/app/pages/examples-related/layout/top-panel/panel-store.ts'}
			content={`import {makeAutoObservable} from 'mobx';

class CExampleTopPanelStore {
	public visible = true; // why you do see it
	public type: 'default' | 'fixed' = 'fixed';
	constructor() {
		makeAutoObservable(this);
	}
}

export const ExampleTopPanelStore = new CExampleTopPanelStore();
`}/>

		<Title level={3} nav={'dynamic_panel'}>2. Panel</Title>
		<p>
			Panel component which reacts to store state:
		</p>

		<SyntaxHighlight
			lines={[2, 9, 10]}
			title={'src/app/pages/examples-related/layout/top-panel/example-top-panel-component.tsx'}
			content={`export const ExampleTopPanel: React.FC = observer(() => {
	useLayoutEffect(() => {
		if (ExampleTopPanelStore.visible) {
			// scroll page to top to show the panel
			window.scrollTo(0, 0);
		}
	}, [ExampleTopPanelStore.visible]);

	return <PageTopPanel className={'example-top-green-panel'}>
		{ExampleTopPanelStore.visible && <Title level={1}>Example Top Panel</Title>}
	</PageTopPanel>;
});
`}/>

		<Title level={3} nav={'dynamic_class'}>3. Appearance</Title>
		<p>
			<Tag>PageTopPanel</Tag> gets the property <code>className</code> which will be passed to the parent
			container component (line 9). So let's add some CSS:
		</p>
		<SyntaxHighlight
			language={'less'}
			title={'src/app/pages/examples-related/layout/layout-example.less'}
			content={`.example-top-green-panel {
	background-color: #89cb1e;
	color: #2e5113;
	padding: 0;
	margin: 0;

	h1, h2, h3, p, div {
		color: #2e5113 !important;
	}

	.app-top-panel-content {
		padding: 0;
	}
}`}/>
		<Title level={3} nav={'dynamic_switch'}>4. Attach panel to page</Title>
		<p>
			Panel should be attached to particular page (route):
		</p>

		<SyntaxHighlight
			lines={5}
			title={'src/config/app-site-map.tsx'}
			content={`{
	title: 'Top panel',
	breadcrumbs: 'sub-menu',
	url: '/layout/top-panel',
	topPanel: <ExampleTopPanel/>,
	page: <TopPanelPage/>,
},`}/>

		<Title level={3} nav={'dynamic_switch'}>5. Switch</Title>
		<p>
			And the last part - implement the condition that will define the visibility. Just to keep the example
			as simple as possible it is a <Tag>Checkbox</Tag>:
		</p>

		<SyntaxHighlight content={`<Checkbox
	checked={ExampleTopPanelStore.visible}
	onChange={() => ExampleTopPanelStore.visible = !ExampleTopPanelStore.visible}> Show panel
</Checkbox>
`}/>
	</>;
});
