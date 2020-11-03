import React from 'react';
import {Title} from '../../components/ui/general/typography/title-component';

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
			<li>Extra theme</li>
			<li><s>Main menu sub-routes for media queries</s></li>
			<li>Horizontal menu</li>
			<li>Top panel</li>
			<li>Burger menu</li>
			<li>Contrast menu</li>
			<li>
				<ul>
					<li>Main</li>
					<li>Getting started</li>
					<li>App folders</li>
					<li><s>Testing</s></li>
					<li>Building</li>
					<li><s>Routing: params</s></li>
					<li>Layout: main menu</li>
					<li><s>State management: app</s></li>
					<li>Auth state, login/logout/guards</li>
					<li>State management: data example</li>
					<li>Breadcrumbs actions</li>
				</ul>
			</li>
			<li><s>Delay one render on route switching</s></li>
			<li><s>Add icons to example routing (arrow back, article, user)</s></li>
			<li>Replace unnecessary observers with useLocation/useXXX hooks</li>
			<li>Replace .Less vars with CSS vars</li>
			<li>Order in @media files</li>
			<li>In-page navigation with Title</li>
			<li>npm run dry</li>
			<li>Roadmap page</li>
		</ul>
	</>;
};

