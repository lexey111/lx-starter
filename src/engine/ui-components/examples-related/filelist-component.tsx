import React from 'react';
import {Icon} from '../general/icons/icon-component';

type TFileListProps = {
	data: string
	asCommands?: boolean
};

function prepareStrings(text: string, asCommand?: boolean): JSX.Element[] {
	return text.split('\n')
		.filter(item => Boolean(item))
		.map((item, idx) => {
			const isFolder = item.indexOf('[') !== -1;
			let icon = isFolder ? <Icon type={'folder'}/> : <Icon type={'file'}/>;
			if (asCommand) {
				icon = <Icon type={'arrow-right'}/>;
			}
			const indent = item.search(/\S|$/);

			const hasComment = item.indexOf(' - ') !== -1;
			let comment = '';
			let importantComment = false;
			if (hasComment) {
				[item, comment] = item.split(' - ');
				importantComment = comment.startsWith('!');
				if (importantComment) {
					comment = comment.substring(1);
				}
			}
			const title = item
				.trim()
				.replaceAll('[', '')
				.replaceAll(']', '');

			return <div key={idx} className={(isFolder ? 'folder' : '') + (importantComment ? ' highlighted' : '')}>
				{' '.padEnd(indent * 1.5)}{icon}
				{title}
				{comment && comment.trim() && <span className={'comment' + (importantComment ? ' important' : '')}>
					{comment.trim()}
				</span>}
			</div>;
		});
}

export const FileList: React.FC<TFileListProps> = (props: TFileListProps) => {
	return <pre className={'example-filestructure'}>
		{prepareStrings(props.data, props.asCommands)}
	</pre>;
};
