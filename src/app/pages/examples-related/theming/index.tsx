import React from 'react';
import {Link} from 'react-router-dom';
import {Src} from '../../../engine/ui-components/example-related/src-component';
import {SyntaxHighlight} from '../../../engine/ui-components/example-related/syntax-highlight';
import {Tag} from '../../../engine/ui-components/example-related/tag-component';
import {ThemeSwitcher} from '../../../engine/ui-components/example-related/theme-switcher-component';
import {IconFile} from '../../../engine/ui-components/general/icons/icon-file-component';
import {IconFolder} from '../../../engine/ui-components/general/icons/icon-folder-component';
import {Title} from '../../../engine/ui-components/general/typography/title-component';

const StoreLink = (): JSX.Element => <Link to={'/state-management/app-state'}>AppState Store</Link>;
const StoreFile = 'src/app/store/app-state/app-state-store.ts';

// eslint-disable-next-line react/no-multi-comp
export const ThemingPage: React.FC = () => {
	return <>
		<Title>Theming</Title>
		<Title level={3} nav={'principles'}>Basic principles</Title>
		<p>
			At the moment, application includes 3 themes: default, dark and light.
		</p>
		<p>
			Available themes are declared in the <Src src={StoreFile} inline/>:
		</p>
		<SyntaxHighlight
			title={StoreFile}
			content={`export const AvailableThemes = ['default', 'light', 'dark'] as const;
type TypeOfAvailableThemes = typeof AvailableThemes[number];
`}/>
		<p>
			Technically, all the themes are just mapping of .Less variables to CSS variables. There
			is <Src src={'src/styles/themes/themes.less'} inline/> file which does all the magic:
		</p>

		<SyntaxHighlight
			language={'less'}
			lines={[1, 2, 5, 8, 9]}
			title={'src/styles/themes/themes.less'}
			content={`@import "light.less";
@import "default.less";
...

@import "mapping.less";

body.theme-default {
	.theme-default(); // set up LESS variables
	@theme-mapping(); // apply them to CSS variables
}

body.theme-light {
	.theme-light();
	@theme-mapping();
}
...`}/>

		<p>
			You can see here importing of mixins with the .Less variables (1, 2), then <i>mapping file</i> (5) and, then,
			constructing the theme (8, 9).
		</p>

		<p>
			In the end, theme is the set of CSS variables under specific class selector assigned to <Tag>body</Tag>:
			<code>body.theme-default</code>, <code>body.theme-light</code> etc.
		</p>

		<Title level={3} nav={'variables'}>Declaring variables</Title>
		<p>
			Content of theme file is pretty simple: it just a mixin with name like <code>.theme-%name%()</code>:
		</p>
		<SyntaxHighlight
			language={'less'}
			title={'src/styles/themes/default.less'}
			content={`.theme-default() {
	@app-background: #f8f8f8;
	@app-color: #222;

	@app-primary-background: #135486;
	@app-primary-color: #fff;

	@app-accent-background: #ffbd0e;
	@app-accent-color: #305372;
...`}/>
		<p>
			In the <Src src={'theme.less'} inline/> file I include these variables under appropriate <code>body</code> class (5):
		</p>

		<SyntaxHighlight
			language={'less'}
			lines={[1, 5, 6]}
			content={`@import "default.less";
@import "mapping.less";

body.theme-default {
	.theme-default(); // set up LESS variables
	@theme-mapping(); // apply them to CSS variables
}
`}/>
		<p>
			and attach the mapper (6):
		</p>

		<SyntaxHighlight
			title={'src/styles/themes/mapping.less'}
			language={'less'}
			content={`@theme-mapping: {
	--app-background: @app-background;
	--app-background-lighten: lighten(@app-background, 10);
...
}`}/>
		<p>
			Such simple trick allows to have kind of 'namespaces' and reuse mapper for all themes. Of course,
			there could be more complicated tricks to generate the
		</p>

		<SyntaxHighlight
			language={'less'}
			content={`body.theme-name{
	--variable-name: @variable-value;
	--another-variable-name: @another-variable-value;
	--one-more-variable-name: 42px;
}`}/>
		<p>
			files, including just straightforward declaration of values, but I'm trying to do not use complicated
			things that are based on .Less to keep, e.g., replacement Less to Sass as simple as possible.
		</p>

		<Title level={3} nav={'applying'}>Applying the variables</Title>
		<p>
			Then, variables declared in the <i>mapper</i>, could be used in the stylesheets:
		</p>

		<SyntaxHighlight
			language={'less'}
			content={`span {
	display: inline-flex;
	flex-flow: row nowrap;
	vertical-align: center;
	color: var(--app-accent-color);
	font-size: var(--app-small-font-size);
	line-height: calc(var(--app-small-font-size) + 2px);
	border-right: 4px solid var(--app-accent-background);
	background-color: var(--app-accent-background);
}
`}/>
		<Title level={3} nav={'where_is_less'}>Where is .Less?</Title>
		<p>
			I use .Less files for local stylesheets because I like .Less, but there are very few spots to change
			to replace it with .Sass, or Stylus, or native.
		</p>

		<p>
			First, themes are .Less files. But they are pretty simple and could be replaced easily, even with native CSS.
		</p>

		<p>
			Second, <Src src={'src/styles/@media.less'} inline/> which contains <code>@media</code> waypoints:
		</p>

		<SyntaxHighlight
			language={'less'}
			title={'src/styles/@media.less'}
			content={`@app-media-max: 1500px;
@app-media-max-page-width: 1200px;
...`}/>
		<p>
			Feel free to tune.
		</p>

		<p>Due to CSS variables restrictions, they can not be used as a values in media queries. This is the reason why
			local <code>@*-media</code> files need to import these declarations:
		</p>

		<SyntaxHighlight
			language={'less'}
			title={'src/app/engine/layout/main-menu/styles/@main-menu-side-media.less'}
			content={`@import "../../../../../styles/@media.less";

@media screen and (max-width: @app-media-side-menu-collapse) {
	// collapse side menu to icon panel
	.with-side-menu .app-menu {
		.app-main-menu-container {
...`}/>

		<Title level={3} nav={'under_the_hood'}>Under the hood</Title>
		<p>
			But who sets the current theme? Well, the process itself is, err, complicated. No, it is very simple,
			but has several steps.
		</p>

		<Title level={4} nav={'initial_loading'}>Initial loading</Title>
		<p>
			Right in the <Src src={'src/static/index.html'} inline/> file embedded code makes a try to get stored theme:
		</p>

		<SyntaxHighlight content={`const storedTheme = localStorage.getItem('app-theme') || '';

if (storedTheme === 'dark') {
	document.body.classList.add('theme-dark');
}
if (storedTheme === 'light') {
	document.body.classList.add('theme-light');
}
if (!storedTheme || storedTheme === 'default') {
	document.body.classList.add('theme-default');
}`}/>

		<p>
			Very simple and hardcoded. As an excuse I can say &mdash; this is synchronous code that executes immediately
			before application ready, and this prevent flickering. E.g., if user prefers dark theme (and if she or he has a choice,
			of course) and application starts with default one because React isn't yet loaded, bootstrapped and started,
			there would be annoying flash.
		</p>

		<p>
			Next step, after application started, is initialization
			of <StoreLink/> &mdash; see below. In short,
			the Store reads the same value from <code>localStorage</code> and, if value valid, assigns it to observable field.
		</p>

		<Title level={4} nav={'storing'}>Storing the theme</Title>
		<p>
			There is very simple component <Tag>ThemeSwitcher</Tag>. Just a set of <Link to={'/ui/data-entry#radio'}>radio buttons</Link>,
			try it:
		</p>

		<div className={'example-component-container'}>
			<ThemeSwitcher/>
		</div>

		<p>
			The component is observer of <StoreLink/> and all it does
			is calling <code>AppStateStore.setTheme(theme)</code> method.
		</p>

		<p>
			The <code>Store</code> in its turn sets the value to internal field, and, then, stores it into <code>localStorage</code>:
		</p>

		<SyntaxHighlight content={`setTheme = (value: string): void => {
	let themeName = 'default';
	if (AvailableThemes.includes(value as TypeOfAvailableThemes)) {
		themeName = value;
	}
	localStorage.setItem('app-theme', themeName);
	this.theme = themeName as TypeOfAvailableThemes;
};
`}/>
		<Title level={4} nav={'switching'}>Switching the theme</Title>
		<p>
			And, last but not least, is applying appropriate class to <Tag>body</Tag>. As usual, straightforward way:
			right in the <Src src={'app/@app.tsx'} inline/> file:
		</p>

		<SyntaxHighlight
			title={'src/app/@app.tsx'}
			lines={[4, 5, 6, 8]}
			content={`export const App: React.FC = observer(() => {
	useEffect(() => {
		// subscribe to theme changes and apply current theme to body
		AvailableThemes.forEach(t => {
			window.document.body.classList.remove('theme-' + t);
		});

		window.document.body.classList.add('theme-' + AppStateStore.theme);
	}, [AppStateStore.theme]);
...`}/>
		<p>
			When theme name changed in the <StoreLink/> it
			reacts, removes all the theme-related classes from the <Tag>body</Tag> (4-6) and adds actual one (8).
		</p>

		<p>
			That's it. Very little of React, only <StoreLink/> to make things a bit more
			convenient, but it could be easily replaced with Vanilla JS.
		</p>

		<Title level={2} nav={'hwo_to_create'}>How to create a theme</Title>
		<p>
			With all aforementioned it is simple.
		</p>
		<pre className={'example-filestructure'}>
<IconFolder/>{`src
	`}<IconFolder/> {`app
		`}<IconFolder/> {`store
			`}<IconFolder/> {`app-state
				`}<IconFile/><b>app-state-store.ts</b> <i>- AvailableThemes </i>{`
	`}<IconFolder/> {`static
		`}<IconFile/><b>index.html</b> <i>- pre-init</i>{`
	`}<IconFolder/> {`styles
		`}<IconFolder/> {`themes
			`}<IconFile/><b>themes.less</b> <i>- add theme attachment</i>{`
			`}<IconFile/><b>default.less</b> <i>- create theme by example</i>
</pre>

		<ol>
			<li>
				Create new theme file in <Src src={'src/styles/themes'} inline/> folder. Just copy 'default' one.
			</li>

			<li>
				Set up the desired colors and, perhaps, style variations
				&mdash; see <Src src={'src/styles/themes/light.less'} inline/> as an example.
			</li>

			<li>
				Import theme in the <Src src={'theme.less'} inline/> file and <a href={'ui/theming#variables'}>attach it</a>.
			</li>

			<li>
				Add theme name to available themes: <code>const AvailableThemes</code> in
				the <Src src={StoreFile} inline/> file.
			</li>

			<li>
				Declare the <a href={'ui/theming#initial_loading'}>pre-loader</a> in <Src src={'index.html'} inline/>.
			</li>
		</ol>
	</>;
};
