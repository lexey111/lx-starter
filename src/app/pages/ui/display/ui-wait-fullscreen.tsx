import React, {useCallback, useState} from 'react';
import {WaitFullscreen} from '../../../engine/ui-components/display/wait/wait-fullscreen-component';
import {LipsumPara} from '../../../engine/ui-components/example-related/lipsum';
import {SyntaxExampleTabs} from '../../../engine/ui-components/example-related/syntax-example-tabs';
import {Button} from '../../../engine/ui-components/general/button/button-component';

const Markup = `<WaitFullscreen
	hideSpinner={true}
	className={'wait-98'}
	message={'Please sit back and relax while Windows 98 installs on your computer.'}/>

<WaitFullscreen/>
`;

const Syntax = `type TWaitFullscreenComponentProps = {
	message?: string | JSX.Element
	className?: string
	hideSpinner?: boolean
};
`;

const Code = `const [useWait, setUseWait] = useState(false);
const [useWaitCustom, setUseWaitCustom] = useState(false);
const [useWaitModal, setUseWaitModal] = useState(false);

const toggleWaiter = useCallback(() => {
	setUseWait(true);
	setTimeout(() => {
		setUseWait(false);
	}, 5000);
}, []);

const toggleCustomWaiter = useCallback(() => {
	setUseWaitCustom(true);
	setTimeout(() => {
		setUseWaitCustom(false);
	}, 5000);
}, []);

const toggleModalWaitOn = useCallback(() => {
	setUseWaitModal(true);
}, []);

const toggleModalWaitOff = useCallback(() => {
	setUseWaitModal(false);
}, []);

return <div className={'example-tab'}>
	<Button type={'primary'} onClick={toggleCustomWaiter}>Turn [Custom] for 5 sec</Button>
	{useWaitCustom && <WaitFullscreen
		hideSpinner={true}
		className={'wait-98'}
		message={'Please sit back and relax while Windows 98 installs on your computer.'}/>}

	<Button type={'default'} onClick={toggleWaiter}>Turn [default] for 5 sec</Button>
	{useWait && <WaitFullscreen/>}

	<Button type={'danger'} onClick={toggleModalWaitOn}>Show super-modal</Button>
	{useWaitModal && <WaitFullscreen
		hideSpinner={true}
		message={<div style={{width: '50%'}}>
			<h1>Important message</h1>
			<LipsumPara paragraphs={2} words={45}/>
			<hr/>
			<Button type={'danger'} onClick={toggleModalWaitOff}>Confirm</Button>
		</div>}/>}

</div>;
`;

export const UiWaitFullscreenExample: React.FC = () => {
	const [useWait, setUseWait] = useState(false);
	const [useWaitCustom, setUseWaitCustom] = useState(false);
	const [useWaitModal, setUseWaitModal] = useState(false);

	const toggleWaiter = useCallback(() => {
		setUseWait(true);
		setTimeout(() => {
			setUseWait(false);
		}, 5000);
	}, []);

	const toggleCustomWaiter = useCallback(() => {
		setUseWaitCustom(true);
		setTimeout(() => {
			setUseWaitCustom(false);
		}, 5000);
	}, []);

	const toggleModalWaitOn = useCallback(() => {
		setUseWaitModal(true);
	}, []);

	const toggleModalWaitOff = useCallback(() => {
		setUseWaitModal(false);
	}, []);

	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		code={Code}
		result={<div className={'example-tab'}>
			<Button type={'primary'} onClick={toggleCustomWaiter}>Turn [Custom] for 5 sec</Button>
			{useWaitCustom && <WaitFullscreen
				hideSpinner={true}
				className={'wait-98'}
				message={
					<div>
						<h2>Welcome to Microsoft Windows 98</h2>
						<p>
							Please sit back and relax while Windows 98 installs on your computer.
						</p>
						<p>
							During this automated installation process, you'll learn about some of the
							enhancements to Windows 98 and a few of its exciting new features.
							After Windows 98 is installed, you are invited to take the Discover Windows 98 tours to learn more.
						</p>
						<h2>Windows Just Got Better</h2>
						<p>
							Windows 98 helps you get the most out of your computer by making it easier to use,
							more reliable, faster, and more entertaining.
						</p>
						<h2>More Innovative</h2>
						<p>
							This new release includes hundreds of enhancements and new features based on customer
							requests and product support experiences.
						</p>
						<p>
							Like its predecessor, Windows 98 supports new, cutting-edge technologies, while at
							the same time providing the best support for your current hardware and programs.
						</p>
					</div>
				}/>}

			<Button type={'default'} onClick={toggleWaiter}>Turn [default] for 5 sec</Button>
			{useWait && <WaitFullscreen/>}

			<Button type={'danger'} onClick={toggleModalWaitOn}>Show super-modal</Button>
			{useWaitModal && <WaitFullscreen
				hideSpinner={true}
				message={<div style={{width: '50%'}}>
					<h1>Important message</h1>
					<LipsumPara paragraphs={2} words={45}/>
					<hr/>
					<Button type={'danger'} onClick={toggleModalWaitOff}>Confirm</Button>
				</div>}/>}
		</div>}
	/>;
};
