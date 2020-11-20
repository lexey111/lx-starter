import React from 'react';
import {Title} from '../../../engine/ui-components/general/typography/title-component';

export const AboutPage: React.FC = () => {
	return <>
		<Title level={1}>About page</Title>

		<Title level={2}>To Do</Title>
		<ul>
			<li><s>Radio buttons</s></li>
			<li><s>Theme switcher</s></li>
			<li><s>Native layouts</s></li>
			<li><s>SVG icons</s></li>
			<li><s>- AntD</s></li>
			<li>Fake log in/log out</li>
			<li><s>Secondary menu for pages</s></li>
			<li><s>Extra theme</s></li>
			<li>Dark theme</li>
			<li><s>Main menu sub-routes for media queries</s></li>
			<li><s>Horizontal menu</s></li>
			<li><s>Top panel</s></li>
			<li><s>Burger menu</s></li>
			<li><s>Contrast menu</s></li>
			<li>
				<ul>
					<li>Main</li>
					<li>Getting started</li>
					<li>App folders</li>
					<li><s>Testing</s></li>
					<li>Building</li>
					<li><s>Routing: params</s></li>
					<li><s>Layout: main menu</s></li>
					<li><s>State management: app</s></li>
					<li>Auth state, login/logout/guards</li>
					<li><s>State management: data example</s></li>
					<li><s>Breadcrumbs actions</s></li>
					<li><s>Page submenu</s></li>
					<li><s>In-Page navigation</s></li>
					<li>Page</li>
					<li><s>Footer</s></li>
				</ul>
			</li>
			<li><s>Delay one render on route switching</s></li>
			<li><s>Add icons to example routing (arrow back, article, user)</s></li>
			<li><s>Replace .Less vars with CSS vars</s></li>
			<li><s>Order in @media files</s></li>
			<li><s>In-page navigation with Title</s></li>
			<li>npm run dry</li>
			<li>Roadmap page</li>
			<li><s>Theme families</s></li>
			<li><s>Fixed top panel</s></li>
			<li>Fix Firefox page length</li>
			<li>Alias for engine</li>
		</ul>
	</>;
};

