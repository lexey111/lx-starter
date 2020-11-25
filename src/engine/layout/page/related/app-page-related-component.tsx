import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

type TPageRelatedItem = {
	url?: string
	title: string | JSX.Element
};

type TPageRelatedProps = {
	items: TPageRelatedItem[]
	title?: string | JSX.Element
};

export const PageRelated: React.FC<TPageRelatedProps> = (props: TPageRelatedProps) => {
	const container = useRef<any>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (container.current) {
			return;
		}
		container.current = document.getElementById('app-page-related-portal');
		if (container.current) {
			setVisible(true);
		}
	});

	if (!visible || props.items.length === 0) {
		return null;
	}

	return ReactDOM.createPortal(
		<div className={'app-page-related-list'}>
			<div className={'app-page-related-title'}>
				{props.title ? props.title : 'See also:'}
			</div>
			{props.items.map((item: TPageRelatedItem, idx) => {
				const line = item.url
					? <Link to={item.url}>{item.title}</Link>
					: item.title;

				return <div className={'app-page-related-item'} key={item?.url || idx}>{line}</div>;
			})}
		</div>,
		container.current as HTMLDivElement
	);
};
