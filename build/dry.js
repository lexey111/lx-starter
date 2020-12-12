const readline = require('readline');
const path = require('path');
const fs = require('fs');
const execSync = require('child_process').execSync;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

console.log('  Welcome to Dry mode. This function will clean up all the example-related things from lxStarter kit.');
console.log('');
console.log('  +----------------------------------------------------------------------+');
console.log('  |  Warning! This operation cannot be undone, script will delete files. |');
console.log('  +----------------------------------------------------------------------+');
console.log('');

rl.question('  Do you want to continue [y/N]? ', function (answer) {
	if (!['y', 'Y'].includes(answer)) {
		console.log('Exit without changes.');
		rl.close();
		process.exit(0);
	}

	const result = doDry();

	console.log('');

	if (result === 0) {
		console.log('Success.');
	} else {
		console.log('Error.');
	}

	rl.close();
	process.exit(result);
});

const MainFolder = path.resolve('./src');
const ExamplePagesFolder = path.resolve('./src/app/pages/examples-related');
const ExampleComponentsFolder = path.resolve('./src/engine/ui-components/examples-related');
const ExampleStoreFolder = path.resolve('./src/app/store/examples');

const StoreFile = path.resolve('./src/app/store/@stores.ts');

const SiteMapFile = path.resolve('./src/config/app-site-map.tsx');

const HomePageFile = path.resolve('./src/app/pages/home/index.tsx');
const HomePagePanelFile = path.resolve('./src/app/pages/home/home-page-top-panel-component.tsx');
const HomePageStylesFile = path.resolve('./src/app/pages/home/home.less');
const HomePageUtilsFile = path.resolve('./src/app/pages/home/home-utils.tsx');

const AboutPageFile = path.resolve('./src/app/pages/about/index.tsx');

const PagesLessFile = path.resolve('./src/app/pages/pages.less');

const ComponentsLessFile = path.resolve('./src/engine/ui-components/components.less');

function doDry() {
	console.log('');
	console.log('Starting cleanup...');
	if (!isCleanupPossible()) {
		return -1;
	}

	deleteFolder('Example pages', ExamplePagesFolder);
	deleteFolder('Example components', ExampleComponentsFolder);
	deleteFolder('Example stores', ExampleStoreFolder);

	deleteFile('Home page panel', HomePagePanelFile)
	deleteFile('Home page styles', HomePageStylesFile)
	deleteFile('Home page utils', HomePageUtilsFile)

	replaceSiteMap();
	replaceHomePage();
	replaceAboutPage();
	replacePagesLess();
	replaceComponentsLess();
	replaceAppStore();

	runLint();
	runBuild();

	printEndBanner();

	return 0;
}

function printEndBanner() {
	console.log('');
	console.log(' +------------------------------------------------------------+');
	console.log(' |  Done. Please remove build/dry.js file manually,           |');
	console.log(' |  then do some cleanup in package.json:                     |');
	console.log(' |   - remove "dry" command from "scripts"                    |');
	console.log(' |   - remove "lorem-ipsum" dependency from "devDependencies" |');
	console.log(' |                                                            |');
	console.log(' |  Good luck!                                                |');
	console.log(' +------------------------------------------------------------+');
	console.log('');
}

function runLint() {
	console.log('  [RUN] Running lint...');
	execSync('npm run eslint', {stdio: 'inherit'});
}

function runBuild() {
	console.log('  [RUN] Running build...');
	execSync('npm run build', {stdio: 'inherit'});
}

function deleteFolder(name, path) {
	const message = `Removing folder [${name}] at ${path}...`;
	try {
		fs.rmdirSync(path, {recursive: true});
	} catch {
		//
	}
	if (fs.existsSync(path)) {
		console.log(`  [ERROR] ${message} Cannot remove!`);
		return false;
	}
	console.log(`  [OK] ${message}`);
	return true;
}

function deleteFile(name, path) {
	const message = `Removing file [${name}] at ${path}...`;

	try {
		fs.unlinkSync(path);
	} catch {
		//
	}

	if (fs.existsSync(path)) {
		console.log(`  [ERROR] ${message} Cannot remove!`);
		return false;
	}
	console.log(`  [OK] ${message}`);
	return true;
}

function checkExists(name, path) {
	const message = `Checking item [${name}] at ${path}...`;
	if (!fs.existsSync(path)) {
		console.log(`  [ERROR] ${message} Does not exists!`);
		return false;
	}
	console.log(`  [OK] ${message}`);
	return true;
}

function isCleanupPossible() {
	if (!checkExists('Main folder', MainFolder)) {
		return false;
	}
	if (!checkExists('Example pages folder', ExamplePagesFolder)) {
		return false;
	}
	if (!checkExists('Example components folder', ExampleComponentsFolder)) {
		return false;
	}
	if (!checkExists('Site map file', SiteMapFile)) {
		return false;
	}
	if (!checkExists('Home page file', HomePageFile)) {
		return false;
	}
	if (!checkExists('Home page utils file', HomePageUtilsFile)) {
		return false;
	}
	if (!checkExists('Home page styles file', HomePageStylesFile)) {
		return false;
	}
	if (!checkExists('Home page panel file', HomePagePanelFile)) {
		return false;
	}
	if (!checkExists('About page file', AboutPageFile)) {
		return false;
	}
	if (!checkExists('pages.less file', PagesLessFile)) {
		return false;
	}
	if (!checkExists('components.less file', ComponentsLessFile)) {
		return false;
	}
	if (!checkExists('Store declaration file', StoreFile)) {
		return false;
	}
	return true;
}

function replaceSiteMap() {
	const content = `import React from 'react';
import {AboutPage} from '../app/pages/about';
import {HomePage} from '../app/pages/home';
import {TRouteMappingItems} from '../engine/routing/route-mapping-interface';
import {Icon} from '../engine/ui-components/general/icons/icon-component';

// main app routing
export const AppSiteMap: TRouteMappingItems = [
	{
		title: 'Home',
		url: '/home',
		isHomePage: true,
		breadcrumbs: 'none',
		icon: <Icon type={'home'}/>,
		page: <HomePage/>,
	},
	{
		title: 'About',
		icon: <Icon type={'star'}/>,
		url: '/about',
		page: <AboutPage/>,
		isLateral: true
	},
];
`;
	fs.writeFileSync(SiteMapFile, content);
	console.log('  [OK] Replacing SiteMap');
}

function replaceHomePage() {
	const content = `import React from 'react';

export const HomePage: React.FC = () => {
	return <>
		<h1>Hello world!</h1>
		<p>
			Place content here.
		</p>
	</>;
};
`;
	fs.writeFileSync(HomePageFile, content);
	console.log('  [OK] Replacing Home page');
}

function replaceAboutPage() {
	content = `import React from 'react';

export const AboutPage: React.FC = () => {
	return <>
		<h1>About page</h1>
		<p>
			Place content here.
		</p>
	</>;
};
`;
	fs.writeFileSync(AboutPageFile, content);
	console.log('  [OK] Replacing About page');
}

function replacePagesLess() {
	const content = `// empty yet file to attach stylesheets of app/pages
`;
	fs.writeFileSync(PagesLessFile, content);
}

function replaceAppStore() {
	const content = `import CAppPageNavigationStore from './app-state/app-state-page-navigation-store';
import CAppStateStore from './app-state/app-state-store';

// current view state + auth state
export const AppStateStore = new CAppStateStore();

// page sub-navigation (local waypoints)
export const AppPageNavigationStore = new CAppPageNavigationStore();
`;
	fs.writeFileSync(StoreFile, content);

	console.log('  [OK] Replacing App State Store');
}

function replaceComponentsLess() {
	const content = `@import "general/icons/icons.less";
@import "general/typography/title.less";
@import "display/tabs/tabs-component.less";
@import "display/wait/wait.less";
@import "data-entry/radio-button/radio.less";
@import "data-entry/checkbox/checkbox.less";
`;
	fs.writeFileSync(ComponentsLessFile, content);
}
