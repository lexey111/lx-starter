import React from 'react';
import {Link} from 'react-router-dom';
import {A} from '../../components/ui/example-related/a-component';
import {SourceFile} from '../../components/ui/example-related/source-file-component';
import {Title} from '../../components/ui/general/typography/title-component';
import {PageSubmenu} from '../../layout/page-submenu/page-submenu-component';

export const UiPage: React.FC = () => {
	return <>
		<PageSubmenu/>

		<Title>UI components</Title>

		<Title level={2}>Overview</Title>
		<p>
			The Starter application includes a few simple UI components &mdash; only needed to display the application and
			examples itself.
		</p>

		<p>
			Please use your favorite UI kit, or add separate UI components from different source. Internal
			components are designed to be minimalistic and have no external dependencies, so feel free to
			remove them all (especially <SourceFile src={'src/app/components/ui/examples-related'} inline/> folder)
			and replace with anything you do prefer.
		</p>

		<Title level={3}>Structure</Title>

		<p>
			Inspired by <A href={'https://ant.design/components/overview/'}>AntD</A> structure,
			the Starter components are divided to:
		</p>

		<ul>
			<li>
				<Link to={'ui/general'}>General (3)</Link> &mdash; Title, Button, embedded SVG Icons.
			</li>

			<li>
				<Link to={'ui/display'}>Display (6)</Link> &mdash; Tabs, different <i>wait-something</i> components, simple modals.
			</li>

			<li>
				<Link to={'ui/data-entry'}>Data entry (2)</Link> &mdash; Radio button, Checkbox.
			</li>

			<li>
				<Link to={'ui/examples-related'}>Examples-related (3)</Link> &mdash; Syntax highlight, Lorem Ipsum generator.
			</li>
		</ul>

		<p>
			Components are located in <SourceFile src={'src/app/components/ui'} inline={true}/> folder.
		</p>

	</>;
};
