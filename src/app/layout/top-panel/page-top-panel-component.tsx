import React, {useEffect, useRef} from 'react';
import {AppStateStore} from '../../store/@stores';

type TTopPanelProps = {
	children: any
};

export const PageTopPanel: React.FC<TTopPanelProps> = (props: TTopPanelProps) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const resizeObserver = new ResizeObserver((entries: ReadonlyArray<ResizeObserverEntry>): void => {
			if (!entries || entries.length === 0) {
				return;
			}

			let borderBoxSize: number;
			if (entries[0].borderBoxSize) {
				if (entries[0].borderBoxSize[0]) {
					borderBoxSize = entries[0].borderBoxSize[0].blockSize; // chromium
				} else {
					borderBoxSize = entries[0].borderBoxSize['blockSize'] as number; // firefox
				}
			} else {
				borderBoxSize = entries[0].contentRect.height; // safari
			}

			AppStateStore._toPanelHeight = borderBoxSize || 0;
		});

		resizeObserver.observe(ref.current as HTMLElement);

		return () => {
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};
	}, [ref]);

	return <div className={'app-top-panel-content'} ref={ref}>
		{props.children}
	</div>;
};

