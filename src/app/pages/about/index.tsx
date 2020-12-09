import React from 'react';
import {Title} from '../../../engine/ui-components/general/typography/title-component';

export const AboutPage: React.FC = () => {
	return <>
		<Title level={1}>About</Title>
		<p>
			The project is a seed, application designed to be the base for other, functional applications.
		</p>
		<p>
			The main features of it are &mdash; declarative routing, state management, adaptive design and minimal set of
			predefined components.
		</p>
		<p>
			I try to do not overcomplicate, or even just "complicate" the building blocks but keep a balance
			between functionality and complexity. It is obvious that real projects use some specific approaches,
			or layouts, or have restrictions, or whatever, so one of the main goal taken into account during
			development is making things flex but not too flex.
		</p>
		<p>
			Some of approaches and tools used are disputable or opinionated. E.g., using MobX as a rather integrated
			State engine, or .Less as a stylesheet processor, or pre-bundled builder pipeline. This is because I'm not
			sure how usable the starter is for other people and how it will develop (if). Let's see.
		</p>
		<p>
			Enjoy and good luck!
		</p>
	</>;
};

