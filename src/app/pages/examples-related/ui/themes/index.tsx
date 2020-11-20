import React from 'react';
import {Link} from 'react-router-dom';
import {FileList} from '../../../../../engine/ui-components/examples-related/filelist-component';
import {Src} from '../../../../../engine/ui-components/examples-related/src-component';
import {SyntaxHighlight} from '../../../../../engine/ui-components/examples-related/syntax-highlight';
import {Tag} from '../../../../../engine/ui-components/examples-related/tag-component';
import {ThemeSwitcher} from '../../../../../engine/ui-components/examples-related/theme-switcher-component';
import {Title} from '../../../../../engine/ui-components/general/typography/title-component';

const StoreLink = (): JSX.Element => <Link to={'/state-management/app-state'}>AppState Store</Link>;
const StoreFile = 'src/app/store/app-state/app-state-store.ts';

// eslint-disable-next-line react/no-multi-comp
export const ThemesPage: React.FC = () => {
	return <>
		<Title>Themes</Title>
		<Title level={3} nav={'principles'}>Basic principles</Title>
		<p>
			At the moment application includes 3 themes: default, dark and light.
		</p>
		<p>
			Available themes are declared in the <Src src={'src/engine/themes/theme-interface.ts'} inline/>:
		</p>

		<SyntaxHighlight
			title={'src/engine/themes/theme-interface.ts'}
			content={`export type TAppTheme = {
	code: string // theme name, will be used as part of CSS class like body.theme-%name%
	family: 'dark' | 'light' // to tune some items that aren't directly covered with theme variables
	title: string // to display theme in the interface, like "Solarized Dark cool theme"
};

export const AvailableThemes: ReadonlyArray<TAppTheme> = [
	{
		code: 'default',
		family: 'light',
		title: 'Default theme'
	},
	{
		code: 'light',
		family: 'light',
		title: 'Light theme'
	},
	{
		code: 'dark',
		family: 'dark',
		title: 'Dark theme'
	},
];
...service functions...
`}/>
		<p>
			A little remark about <code>family</code>. Some components, especially third-party, could be too
			complicated &mdash; or has no sense &mdash; to tune up with current theme. For such cases the <code>family</code>
			property exists:
		</p>

		<SyntaxHighlight
			title={'src/engine/ui-components/examples-related/prism_dark.less'}
			language={'less'}
			content={'body.theme-family-dark {...'}
		/>

		<p>
			Technically all the themes are just mapping of .LESS variables to CSS variables. There
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
			You can see here importing of mixins with the .LESS variables (1, 2), then <i>mapping file</i> (5) and, then,
			constructing the theme (8, 9).
		</p>

		<p>
			In the end, a theme is a set of CSS variables under specific class selector assigned to <Tag>body</Tag>:
			<code>body.theme-default</code>, <code>body.theme-light</code> etc.
		</p>

		<Title level={3} nav={'variables'}>Declaring variables</Title>
		<p>
			Content of a theme file is pretty simple. It is just a <i>mixin</i> with name like <code>.theme-%name%()</code>:
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
			In the <Src src={'theme.less'} inline/> file I import these variables under appropriate <code>body</code> class (5):
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
			Such simple trick allows to have kind of 'namespaces' and to reuse mapper for any theme. Of course,
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
			LESS features to keep, e.g., replacement LESS to SASS as simple as possible.
		</p>

		<Title level={3} nav={'applying'}>Applying the variables</Title>
		<p>
			Then variables declared in the <i>mapper</i> could be used in the stylesheets:
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
			I use .LESS files for local stylesheets (because I prefer LESS), but there are very few spots to change
			to replace it with SASS, or Stylus, or native.
		</p>

		<p>
			First, themes themselves, which are the .LESS files. But they are pretty simple and could be replaced easily,
			even with native CSS.
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
			Feel free to tune, btw.
		</p>

		<p>Due to CSS variables restrictions they can not be used as a values in media queries. This is the reason why
			local <code>@*-media</code> files need to import these declarations (1):
		</p>

		<SyntaxHighlight
			language={'less'}
			lines={1}
			title={'src/engine/layout/main-menu/styles/@main-menu-side-media.less'}
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
			Next step, after application started, is initialization of <StoreLink/> &mdash; see below. In short,
			the Store reads the same value from <code>localStorage</code> and, if value valid, assigns it to observable field:
		</p>

		<SyntaxHighlight
			title={StoreFile}
			content={`...
public themeCode = 'default';
...
constructor() {
	// initial theme
	this.themeCode = getStoredThemeCode(); // from src/engine/themes/theme-interface.ts
	
// src/engine/themes/theme-interface.ts
export function getStoredThemeCode(): string {
	const value = localStorage.getItem('app-theme') || 'default';
	const theme = findTheme(value);
	return theme ? theme.code : 'default';
}	
...`}/>

		<Title level={4} nav={'storing'}>Storing the theme</Title>
		<p>
			There is very simple component <Tag>ThemeSwitcher</Tag>.
			Just a set of <Link to={'/ui/data-entry#radio'}>radio buttons</Link>, try it:
		</p>

		<div className={'example-component-container'}>
			<Title level={6} bottomBorder noTopMargin>
				Set theme
			</Title>
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
		this.themeCode = setStoredThemeCode(value);
};

// src/engine/themes/theme-interface.ts
export function setStoredThemeCode(code: string): string {
	let themeCode = 'default';
	const theme = findTheme(code);
	if (theme) {
		themeCode = theme.code;
	}
	localStorage.setItem('app-theme', themeCode);
	return themeCode;
}
`}/>
		<Title level={4} nav={'switching'}>Switching the theme</Title>
		<p>
			And, last but not least, is applying appropriate class to <Tag>body</Tag>. As usual, straightforward way &mdash;
			right in the <Src src={'app/@app.tsx'} inline/> file:
		</p>

		<SyntaxHighlight
			title={'src/app/@app.tsx'}
			lines={3}
			content={`export const App: React.FC = () => {
	return <Router>
		<ThemeToMarkupComponent/>
		<RouteToStoreComponent/>
...`}/>
		<p>
			When theme name changed in the <StoreLink/> it
			reacts, removes all the theme-related classes from the <Tag>body</Tag> and adds actual one.
		</p>

		<p>
			The component itself:
		</p>

		<SyntaxHighlight
			title={'src/engine/themes/theme-to-markup-component.tsx'}
			content={`export const ThemeToMarkupComponent: React.FC = observer(() => {
	useEffect(() => {
		const bodyThemeList = Array.from(window.document.body.classList)
			.filter(c => c.includes('theme-') && c !== 'theme-' + AppStateStore.themeCode);

		// remove other theme classes if any
		bodyThemeList.forEach(t => {
			window.document.body.classList.remove(t);
		});
		const theme = findTheme(AppStateStore.themeCode);
		// set actual theme
		if (theme) {
			window.document.body.classList.add('theme-' + theme.code);
			window.document.body.classList.add('theme-family-' + theme.family);
		} else {
			window.document.body.classList.add('theme-default');
			window.document.body.classList.add('theme-family-light');
		}
	}, [AppStateStore.themeCode]);

	return null;
});`}/>

		<p>
			That's it. Very little of React, only <StoreLink/> to make things a bit more
			convenient, but it could be easily replaced with Vanilla JS.
		</p>

		<Title level={2} nav={'hwo_to_create'}>How to create a theme</Title>
		<p>
			With all aforementioned it is simple:
		</p>

		<FileList data={`[src]
	[app]
		[engine]
			[ui-components]
				theme-interface.ts  - (4) AvailableThemes = [..., {code: 'cool', family: 'light', title: 'Cool Theme'}]
		[store]
			[app-state]
				app-state-store.ts  - 
	[static]
		index.html - (5) pre-loader
	[styles]
		[themes]
			themes.less - (3) add theme attachment
			default.less - (1) create theme file using this file as a template
			*cool.less - !(2) define colors
`}/>

		<ol>
			<li>
				Create new theme file in <Src src={'src/styles/themes'} inline/> folder. Just copy 'default' one.
			</li>

			<li>
				Set up the desired colors and, perhaps, style variations
				&mdash; see <Src src={'src/styles/themes/light.less'} inline/> as an example.
			</li>

			<li>
				Import theme in the <Src src={'theme.less'} inline/> file and <a href={'ui/themes#variables'}>attach it</a>.
			</li>

			<li>
				Add theme name to available themes: <code>const AvailableThemes</code> in
				the <Src src={'theme-interface.ts'} inline/> file.
			</li>

			<li>
				Declare the <a href={'ui/themes#initial_loading'}>pre-loader</a> in <Src src={'index.html'} inline/>.
			</li>
		</ol>
	</>;
};
