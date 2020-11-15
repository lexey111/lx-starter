import React from 'react';
import {IconFile} from '../general/icons/icon-file-component';
import {IconFolder} from '../general/icons/icon-folder-component';

type TFileListProps = {
	data: string
};

function prepareStrings(text: string): JSX.Element[] {
	return text.split('\n')
		.filter(item => Boolean(item))
		.map(item => {
			const isFolder = item.indexOf('[') !== -1;
			const icon = isFolder ? <IconFolder/> : <IconFile/>;
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

			return <div key={title} className={(isFolder ? 'folder' : '') + (importantComment ? ' highlighted' : '')}>
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
		{prepareStrings(props.data)}
	</pre>;
};
