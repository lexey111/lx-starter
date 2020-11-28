/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import {Link} from 'react-router-dom';
import {AppSiteMap} from '../../../config/app-site-map';
import {MenuPositionSwitcher} from '../../../engine/ui-components/examples-related/menu-switcher-component';
import {Src} from '../../../engine/ui-components/examples-related/src-component';
import {ThemeSwitcher} from '../../../engine/ui-components/examples-related/theme-switcher-component';
import {Title} from '../../../engine/ui-components/general/typography/title-component';
import {getRoutes} from './home-utils';

export const HomePage: React.FC = () => {
	return <>
		<div className={'home-description-wrap'}>
			<div className={'home-description-col1'}>
				<div className={'image with-logo'}></div>
				<div className={'home-description-inner'}>
					<Title
						subTitle={'Start your app with it'}
						navTitle={'Welcome'}
						nav={'start_with'}>1xStarter kit</Title>
					<p>
						This is "just another React starter kit". It turned out I create a lot of different proof-of-concepts and
						internal technical sites during my work and hobby time, so I've decided to extract things that
						migrates from project to project.
					</p>
					<p>
						Of course, there are tons of generators and starters, but c'mon, who don't like to reinvent
						the wheel all the time?
					</p>
					<p>
						I don't like the scaffolding such as "create-react-app" despite they are pretty usable. But usually
						I'm doing something weird and want to have full control, or the like.
					</p>
					<p>
						And my the most loved area is creating libraries, components, systems and other things another people
						are forced to use leaving me the clean and shining high-abstraction levels of generic code.
					</p>
					<p>
						It is a happiness when you don't need to think dull mundane categories, isn't it?
					</p>

					<Title level={3}>The concept</Title>
					<p>
						I took different things from here and there and mix them together. I mean I analyzed top-level
						requirements to the "host" applications I create, then have extracted the appropriate parts
						from different already implemented projects, make them consistent, add some examples and
						documentation &mdash; and that's it.
					</p>
					<p>
						In the mean time, I've tried to keep things lean and implement only the minimal core. Of course,
						for different projects "minimal" means different things, but I did my best.
					</p>
					<p>
						Application is self-documented and self-demonstrating: all the features are described with app engine
						itself. It means, 99% of application is (unnecessary and poor) examples. But I provide special
						command to clean up all the garbage and to have "bare" application ready to extend.
					</p>
				</div>
			</div>

			<div className={'home-description-col2'}>
				<div className={'image'}></div>
				<div className={'home-description-inner'}>
					<Title level={3}>What is there, an why</Title>
					<p>
						Technically it is React-based application served by Webpack builder. It uses
						static <code>index.html</code> file because I usually need some subtle tuning on app
						start that is more convenient to do on HTML level.
					</p>
					<p>
						Application uses .LESS as CSS preprocessor, but it could be easily replaced with SASS or whatever,
						even plain old CSS &mdash; literally only <code>@media</code> constants need preprocessing.
					</p>
					<p>
						I use Typescript as main application language and Jest as an unit-test engine.
					</p>
					<p>
						Controversial thing but I include Mobx as State Management engine to the kit. It turned out that
						very often usage of lightweight MobX for <i>relatively</i> local state management is the fastest
						and the most convenient way... in one big application I'm involved in the development of we're using
						together Redux and Mobx, even. So the local State management (App ViewModel, if you please) is based
						on Mobx Store.
					</p>
					<p>
						The entire structure of application is bound up with Routing. I'm using standard React router, and
						structure of menu and available pages is defined declarative way. Due to relatively often demands to
						support authorization, corresponding protection mechanism is also included (very reduced version).
						Not the auth itself, for sure, but the key "end-points". The starter makes distinction between "logged
						in" and "logged out" states and does not allow to open pages user have no access to.
					</p>
					<p>
						The Starter includes some useful UI components. I try to have "minimum minimorum" set of them because the
						kit is often used as a playground for UI kits, libs and frameworks &mdash; like AntD adapted to
						business specs.
					</p>
					<p>
						I spent plenty of evenings to complete this thing so I hope you'll enjoy this app.
						Anyway, it's free and no warranty &mdash; but no restrictions as well (MIT license),
						just don't forget to mention me somewhere, let's even in small letters.
					</p>
				</div>
			</div>
		</div>

		<Title level={1} nav={'details'}>Details</Title>

		<div className={'home-description-wrap'}>
			<div className={'home-description-left'}>
				<div className={'home-description-inner'}>
					<Title level={3} nav={'ui_variants'}>UI variants</Title>
					<p>
						There are two main things that could be switched on the fly: Theme and Menu Position.
					</p>
					<ThemeSwitcher/>
					<p>
						<Link to={'/ui/themes'}>Read more</Link> about theming.
					</p>
					<MenuPositionSwitcher/>
					<p>
						<Link to={'/layout/main-menu'}>Read more</Link> about main menu.
					</p>
				</div>

				<p>
					The entire <Link to={'/layout'}>layout</Link> is pretty flexible. Most of items are customizable,
					adaptive and responsive. E.g., <Link to={'/layout/top-panel'}>top panel</Link> can be pinned to the top
					&mdash; or can be scrollable with the page, and appearance of it can be completely changed like
					in <Link to={'/custom'}>this example</Link>.
				</p>
			</div>

			<div className={'home-description-right'}>
				<div className={'home-description-inner'}>
					<Title level={3} nav={'site_map'}>Site map</Title>
					<p>
						This map is automatically created using site route description declared
						in <Src src={'src/config/app-site-map.tsx'} inline/> file:
					</p>
					<ul className={'home-sitemap'}>
						{getRoutes(AppSiteMap).map(item => item)}
					</ul>
				</div>
			</div>
		</div>

	</>;
};

