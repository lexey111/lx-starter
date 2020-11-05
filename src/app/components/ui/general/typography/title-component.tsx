import React, {useEffect, useRef} from 'react';
import {AppPageNavigationStore} from '../../../../store/@stores';

type TTitleProps = {
	level?: 1 | 2 | 3 | 4 | 5 | 6
	subTitle?: string | JSX.Element
	navTitle?: string
	className?: string
	bottomBorder?: boolean
	noTopMargin?: boolean
	nav?: boolean
	children?: any
};

export const Title: React.FC<TTitleProps> = (props: TTitleProps) => {
	const CustomHeader: any = `h${props.level || 1}`;
	const TitleId = useRef<string>('_' + Math.random().toString(36).substr(2, 9));

	useEffect(() => {
		if (props.nav) {
			AppPageNavigationStore.register({
				targetId: TitleId.current,
				isActive: false,
				title: props.navTitle || props.children as string
			});
		}
		return () => {
			AppPageNavigationStore.unregister(TitleId.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <CustomHeader
		className={'app-title app-title-level-' + (props.level ? props.level.toString() : '1')
		+ (props.bottomBorder ? ' bottom-border' : '')
		+ (props.noTopMargin ? ' no-top-margin' : '')
		+ (props.className ? ' ' + props.className : '')}
		id={TitleId.current}>
		{props.children}
		{props.subTitle && <div className={'app-subtitle'}>
			{props.subTitle}
		</div>}
	</CustomHeader>;
};
