import React from 'react';
import {Src} from '../../../../engine/ui-components/examples-related/src-component';
import {Tag} from '../../../../engine/ui-components/examples-related/tag-component';
import {Title} from '../../../../engine/ui-components/general/typography/title-component';
import {UiSimpleModalExample} from './ui-simple-modal';
import {UiTabsExample} from './ui-tabs-example';
import {UiWaitBlockExample} from './ui-wait-block';
import {UiWaitFullscreenExample} from './ui-wait-fullscreen';
import {UiWaitInlineExample} from './ui-wait-inline';
import {UiWaitTagExample} from './ui-wait-tag';

export const UiDisplayPage: React.FC = () => {
	return <>
		<Title>Display</Title>

		<Title level={2} nav={'tabs'}>Tabs</Title>
		<Src src={'src/app/ui-components/ui/display/tabs'}/>

		<p>
			Pretty straightforward (and simple) implementation of Tab/TabPane component. It does <b>NOT</b> support:
		</p>
		<ul>
			<li>scrolling when list of pages is too long</li>
			<li>different tab positions like at bottom, or at some side</li>
			<li>extra actions on right side of title pane</li>
		</ul>
		<p>
			But it supports:
		</p>
		<ul>
			<li>tabs, even dynamic</li>
			<li>icons in titles (well, any valid React components)</li>
			<li>simple keyboard navigation between tabs and activation by Enter</li>
		</ul>
		<UiTabsExample/>

		<Title level={2}>Wait for something</Title>

		<Title level={3} nav={'tag-wait'}>Tag wait</Title>
		<Src src={'src/app/ui-components/ui/display/wait/wait-tag-component.tsx'}/>

		<p>
			Component which (optional) displaying spinner till content is empty. When content loaded it displays it with short animation.
		</p>

		<UiWaitTagExample/>

		<Title level={3} nav={'inline-wait'}>Inline wait</Title>
		<Src src={'src/app/ui-components/ui/display/wait/wait-inline-component.tsx'}/>

		<p>
			Very simple component to display <i>inline</i> spinner (uses <code>&lt;span&gt;</code> tag) and message during some process.
		</p>

		<UiWaitInlineExample/>

		<Title level={3} nav={'block-wait'}>Block wait</Title>
		<Src src={'src/app/ui-components/ui/display/wait/wait-block-component.tsx'}/>

		<p>
			The same, but takes all the space (block).
		</p>

		<UiWaitBlockExample/>

		<Title level={3} nav={'fullscreen-wait'}>Fullscreen wait</Title>
		<Src src={'src/app/ui-components/ui/display/wait/wait-fullscreen-component.tsx'}/>

		<p>
			Most powerful one, locks the entire screen. Allows to pass JSX.Element as a message, so it could be used as
			a 'system-top' modal dialog - for important messages, or even to get user input. Up to you.
		</p>

		<p>
			The component also supports focus management: it removes the page's keyboard focus, if any, and
			traps it inside so user can't navigate through the background elements while lock screen is visible.
		</p>

		<UiWaitFullscreenExample/>

		<Title level={3} nav={'simple-modal'}>Simple modal</Title>
		<Src src={'src/app/ui-components/ui/display/wait/simple-modal-component.tsx'}/>

		<p>
			Just a wrapper which adds a little bit of convenience to usage of <Tag>WaitFullscreen</Tag> in a pseudo-modal dialog mode.
		</p>

		<p>
			It supports different 'close' permissions: none, button at top right corner, ESC key, clicking outside.
		</p>

		<UiSimpleModalExample/>
	</>;
};
