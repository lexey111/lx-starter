import React, {useEffect, useRef} from 'react';
import {AppPageNavigationStore} from '../../../../store/@stores';

type TTitleProps = {
	level?: 1 | 2 | 3 | 4 | 5 | 6
	subTitle?: string | JSX.Element
	navTitle?: string
	className?: string
	bottomBorder?: boolean
	noTopMargin?: boolean
	nav?: string
	children?: any
};

export const Title: React.FC<TTitleProps> = (props: TTitleProps) => {
	const CustomHeader: any = `h${props.level || 1}`;
	const elRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const targetId = props.nav;

		if (targetId && elRef.current) {
			AppPageNavigationStore.register({
				targetId,
				titleRef: elRef.current,
				isInViewPort: false,
				title: props.navTitle || props.children as string
			});
		}
		return () => {
			if (targetId) {
				AppPageNavigationStore.unregister(targetId);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [elRef]);

	const hasSubtitle = Boolean(props.subTitle);

	return <div
		ref={elRef}
		className={'app-title app-title-level-' + (props.level ? props.level.toString() : '1')
		+ (props.bottomBorder ? ' bottom-border' : '')
		+ (props.noTopMargin ? ' no-top-margin' : '')
		+ (hasSubtitle ? ' with-subtitle' : '')
		+ (props.nav ? ' with-nav-target' : '')
		+ (props.className ? ' ' + props.className : '')}
		data-nav-target={props.nav}>

		{props.nav && <CustomHeader data-nav-target={props.nav}>
			{props.children}
		</CustomHeader>
		}

		{!props.nav && <CustomHeader>
			{props.children}
		</CustomHeader>
		}

		{props.subTitle && <div className={'app-subtitle'}>
			{props.subTitle}
		</div>}
	</div>;
};
