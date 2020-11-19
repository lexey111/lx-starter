import React, {useCallback, useState} from 'react';
import {TabPane, TTabPaneProps} from './tab-component';

type TTabsProps = {
	activeId?: string
	children?: Array<{ props?: TTabPaneProps }>
};

const Tabs: React.FC<TTabsProps> = (props: TTabsProps) => {
	const firstId = props?.children?.[0]?.props?.id;

	const [activeKey, setActiveKey] = useState(props.activeId || firstId);

	const handleTitleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		if (e.persist) {
			e.persist();
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const id: unknown = e.target?.['dataset']?.['key'] || e.currentTarget?.['dataset']?.['key'];
		if (id) {
			setActiveKey(id as string);
		}
	}, [setActiveKey]);

	const handleKey = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.persist) {
			e.persist();
		}
		const code = e.key;
		if (code !== 'Enter' && code !== ' ') {
			return;
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const id: unknown = e.target?.['dataset']?.['key'];
		if (id) {
			setActiveKey(id as string);
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
	}, [setActiveKey]);

	const visibleTabs = props.children?.filter(tab => tab && tab.props);

	if (!visibleTabs || visibleTabs.length === 0) {
		return null;
	}

	return <div className={'tabs-container'}>
		<div className={'tabs-container-title'}>
			{visibleTabs.map((tab: { props?: TTabPaneProps }, idx: number) => {
				if (!tab || !tab.props) {
					return void 0;
				}
				const isActive = tab.props.id === activeKey;
				let className = 'tab-title';
				if (isActive) {
					className += ' current';
				}
				return <div
					className={className}
					tabIndex={isActive ? -1 : 1}
					key={idx}
					data-key={tab.props.id}
					onKeyDownCapture={handleKey}
					onClick={handleTitleClick}>
					{tab.props.title}
				</div>;
			})}
		</div>

		{visibleTabs.map((tab: { props?: TTabPaneProps }, idx: number) => {
			if (!tab || !tab.props) {
				return void 0;
			}
			let className = 'tab-content';
			if (tab.props.id === activeKey) {
				className += ' current';
			}
			if (tab.props.noPaddings === true) {
				className += ' no-paddings';
			}
			return <div className={className} key={idx}>
				<div className={'tab-content-inner'}>
					{tab.props.children}
				</div>
			</div>;
		})}
	</div>;
};

export {Tabs, TabPane};
