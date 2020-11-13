import React, {useEffect} from 'react';
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

	useEffect(() => {
		const targetId = props.nav;

		if (targetId) {
			AppPageNavigationStore.register({
				targetId,
				isActive: false,
				title: props.navTitle || props.children as string
			});
		}
		return () => {
			if (targetId) {
				AppPageNavigationStore.unregister(targetId);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const hasSubtitle = Boolean(props.subTitle);

	return <div className={'app-title app-title-level-' + (props.level ? props.level.toString() : '1')
	+ (props.bottomBorder ? ' bottom-border' : '')
	+ (props.noTopMargin ? ' no-top-margin' : '')
	+ (hasSubtitle ? ' with-subtitle' : '')
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
