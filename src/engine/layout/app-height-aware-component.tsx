import {observer} from 'mobx-react';
import React, {useEffect, useRef} from 'react';
import {AppStateStore} from '../../app/store/@stores';

type TAppHeightAwareProps = {
	containerId: string
	targetCSSProp: string
	children?: any
};

/**
 * Component that adds [extra top] to [container] frame if top panel is present and has 'fixed' position
 */
export const AppHeightAware: React.FC<TAppHeightAwareProps> = observer((props: TAppHeightAwareProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}
		if (AppStateStore._topPanelType === 'fixed') {
			const top = Math.ceil(AppStateStore._topPanelHeight);
			ref.current.style[props.targetCSSProp] = top <= 0 ? '0' : top.toString() + 'px';
		} else {
			ref.current.style[props.targetCSSProp] = '0';
		}
	}, [
		ref.current,
		AppStateStore._topPanelType,
		AppStateStore._topPanelHeight
	]);

	return <div id={props.containerId} ref={ref}>
		{props.children}
	</div>;
});
