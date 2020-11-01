import React, {useCallback, useState} from 'react';
import {SimpleModal} from '../../../components/ui/display/wait/simple-modal-component';
import {SyntaxExampleTabs} from '../../../components/ui/example-related/syntax-example-tabs';
import {Tag} from '../../../components/ui/example-related/tag-component';
import {Button} from '../../../components/ui/general/button/button-component';

const Markup = `
`;

const Syntax = `
`;

const Code = `
`;

export const UiSimpleModalExample: React.FC = () => {
	const [showSimpleModal, setShowSimpleModal] = useState(false);

	const doShowSimpleModal = useCallback(() => {
		setShowSimpleModal(true);
	}, [setShowSimpleModal]);

	const cancelSuperModal = useCallback(() => {
		// eslint-disable-next-line no-alert
		alert('Cancelled!');
		setShowSimpleModal(false);
	}, [setShowSimpleModal]);

	const confirmSuperModal = useCallback(() => {
		setShowSimpleModal(false);
		// eslint-disable-next-line no-alert
		alert('Confirmed!');
	}, [setShowSimpleModal]);

	return <SyntaxExampleTabs
		activePage={'result'}
		markup={Markup}
		syntax={Syntax}
		code={Code}
		result={<div className={'example-tab'}>
			<Button type={'success'} onClick={doShowSimpleModal}>Show simple modal</Button>

			<SimpleModal
				onCancel={cancelSuperModal}
				allowClose={true}
				closeOnCancel={true}
				closeOnClickOutside={true}
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
