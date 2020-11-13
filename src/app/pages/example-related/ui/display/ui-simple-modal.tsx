import React, {useCallback, useState} from 'react';
import {Checkbox} from '../../../../engine/ui-components/data-entry/checkbox/checkbox-component';
import {SimpleModal} from '../../../../engine/ui-components/display/wait/simple-modal-component';
import {SyntaxExampleTabs} from '../../../../engine/ui-components/example-related/syntax-example-tabs';
import {Tag} from '../../../../engine/ui-components/example-related/tag-component';
import {Button} from '../../../../engine/ui-components/general/button/button-component';

const Markup = `<Button type={'success'} onClick={doShowSimpleModal}>Show simple modal</Button>
<hr/>
<Checkbox checked={allowClose} inline={true} onChange={setAllowClose}>Allow close dialog:</Checkbox>
<Checkbox checked={allowCloseByEsc} inline={true} onChange={setAllowCloseByEsc}>by ESC key</Checkbox>
<Checkbox checked={allowCloseByClick} inline={true} onChange={setAllowCloseByClick}>by click outside</Checkbox>

<SimpleModal
	onCancel={cancelSuperModal}
	allowClose={allowClose}
	closeOnEsc={allowCloseByEsc}
	closeOnClickOutside={allowCloseByClick}
	show={showSimpleModal}>

	<div className={'modal-header'}>Simple modal dialog</div>
	<p>
		The very simple and straightforward implementation of it which uses <Tag>WaitFullscreen</Tag> component
		to mimic the modal behavior.
	</p>
	<p>
		I can't recommend to use this as a replacement of modal dialogs subsystem, but why not if
		you have just a couple of them and don't need full-scaled version features, like multi-modal
		windows management or predefined types.
	</p>

	<div className={'modal-footer'}>
		<Button type={'primary'} onClick={confirmSuperModal}>Confirm</Button>
		<Button type={'default'} onClick={cancelSuperModal}>Cancel</Button>
	</div>
</SimpleModal>
`;

const Syntax = `type TSimpleModalComponentProps = {
	show: boolean
	children: JSX.Element | Array<JSX.Element>
	onCancel?: () => void
	allowClose?: boolean // default: true
	closeOnEsc?: boolean // default: true
	closeOnClickOutside?: boolean // default: true
};

export const SimpleModal: React.FC<TSimpleModalComponentProps> = (props: TSimpleModalComponentProps) => {...
`;

const Code = `const [allowClose, setAllowClose] = useState(true);
const [allowCloseByEsc, setAllowCloseByEsc] = useState(true);
const [allowCloseByClick, setAllowCloseByClick] = useState(true);

const [showSimpleModal, setShowSimpleModal] = useState(false);

const doShowSimpleModal = useCallback(() => {
	setShowSimpleModal(true);
}, [setShowSimpleModal]);

const cancelSuperModal = useCallback(() => {
	setShowSimpleModal(false);
	setTimeout(() => {
		alert('Cancelled!');
	}, 200);
}, [setShowSimpleModal]);

const confirmSuperModal = useCallback(() => {
	setShowSimpleModal(false);
	setTimeout(() => {
		alert('Confirmed!');
	}, 200);
}, [setShowSimpleModal]);
`;

export const UiSimpleModalExample: React.FC = () => {
	const [allowClose, setAllowClose] = useState(true);
	const [allowCloseByEsc, setAllowCloseByEsc] = useState(true);
	const [allowCloseByClick, setAllowCloseByClick] = useState(true);

	const [showSimpleModal, setShowSimpleModal] = useState(false);

	const doShowSimpleModal = useCallback(() => {
		setShowSimpleModal(true);
	}, [setShowSimpleModal]);

	const cancelSuperModal = useCallback(() => {
		setShowSimpleModal(false);
		setTimeout(() => {
			// eslint-disable-next-line no-alert
			alert('Cancelled!');
		}, 200);
	}, [setShowSimpleModal]);

	const confirmSuperModal = useCallback(() => {
		setShowSimpleModal(false);
		setTimeout(() => {
			// eslint-disable-next-line no-alert
			alert('Confirmed!');
		}, 200);
	}, [setShowSimpleModal]);

	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		code={Code}
		result={<div className={'example-tab'}>
			<Button type={'success'} onClick={doShowSimpleModal}>Show simple modal</Button>
			<hr/>
			<Checkbox checked={allowClose} inline={true} onChange={setAllowClose}>Allow close dialog:</Checkbox>
			<Checkbox checked={allowCloseByEsc} inline={true} onChange={setAllowCloseByEsc}>by ESC key</Checkbox>
			<Checkbox checked={allowCloseByClick} inline={true} onChange={setAllowCloseByClick}>by click outside</Checkbox>

			<SimpleModal
				onCancel={cancelSuperModal}
				allowClose={allowClose}
				closeOnEsc={allowCloseByEsc}
				closeOnClickOutside={allowCloseByClick}
				show={showSimpleModal}>

				<div className={'modal-header'}>Simple modal dialog</div>
				<p>
					The very simple and straightforward implementation of it which uses <Tag>WaitFullscreen</Tag> component
					to mimic the modal behavior.
				</p>
				<p>
					I can't recommend to use this as a replacement of modal dialogs subsystem, but why not if
					you have just a couple of them and don't need full-scaled version features, like multi-modal
					windows management or predefined types.
				</p>

				<div className={'modal-footer'}>
					<Button type={'primary'} onClick={confirmSuperModal}>Confirm</Button>
					<Button type={'default'} onClick={cancelSuperModal}>Cancel</Button>
				</div>
			</SimpleModal>
		</div>}
	/>;
};
