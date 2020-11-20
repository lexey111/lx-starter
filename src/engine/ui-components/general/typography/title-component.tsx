import React, {useEffect, useRef} from 'react';
import {AppPageNavigationStore} from '../../../../app/store/@stores';

type TTitleProps = {
	level?: 1 | 2 | 3 | 4 | 5 | 6
	subTitle?: string | JSX.Element
	navTitle?: string | JSX.Element
	className?: string
	bottomBorder?: boolean
	noTopMargin?: boolean
	nav?: string
	navPadding?: 1 | 2
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
				YPos: 0,
				anchorRef: elRef.current,
				title: props.navTitle || props.children as string,
				navPadding: props.navPadding
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
		+ (props.className ? ' ' + props.className : '')}>

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
