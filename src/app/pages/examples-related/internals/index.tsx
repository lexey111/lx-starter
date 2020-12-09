import React from 'react';
import {FileList} from '../../../../engine/ui-components/examples-related/filelist-component';
import {Title} from '../../../../engine/ui-components/general/typography/title-component';

export const InternalsPage: React.FC = () => {
	return <>
		<Title level={2}>Folders structure</Title>

		<p>
			There are three main folder: <code>build</code>, <code>src</code> and <code>dist</code>. First one
			contains build-related scripts, second one is the application itself and the last one is the result of
			compilation - if it was succeeded, of course.
		</p>

		<p>
			<code>src</code> folder contains:
		</p>

		<ul>
			<li>
				<code>app</code>, where functional code lives,
			</li>
			<li>
				<code>engine</code> for service code (the kit itself),
			</li>
			<li>
				<code>config</code> with the only file which describes the entire app configuration (routing, or site map).
			</li>
		</ul>

		<FileList data={`[build] - build- and test configurations, runners, mocks etc.
[dist] - output folder
[node_modules]
[src]
		[app] - your code
			[pages] - your pages
				[home]
				[about]
				[...]
			[store] - the AppState store
		[config]
			app-site-map.tsx - !routing and page declarations
		[engine] - parts of layout, internal components etc.
			[__tests__] - examples
			[hooks] - couple of hooks related to app state
			[layout] - components that form the layout
				[breadcrumbs]
				[footer]
				[main-menu]
				[...]
			[routing] - utils and components which process the routing
			[themes] - components and types to serve theme switching and synchronization
			[ui-components] - minimal UI kit
				[data-entry]
				[display]
				[...]
		[static] - images and other pre-compiled things
		[styles] - styles
			[precompiled] - reset and fonts
			[themes]
			[ui] - ui elements: typography, forms, dimensions...
		index.tsx - ! entrypoint
`}/>

	</>;
};
