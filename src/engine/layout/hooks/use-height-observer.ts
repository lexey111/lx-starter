import React, {useEffect, useRef, useState} from 'react';

export default function useHeightObserver(ref: React.RefObject<HTMLDivElement>): { height: number; heightStr: string } {
	const destroying = useRef(false);
	const height = useRef(0);
	const [heightStr, setHeightStr] = useState('0');

	useEffect(() => {
		return () => {
			destroying.current = true;
		};
	}, []);

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const resizeObserver = new ResizeObserver((entries: ReadonlyArray<ResizeObserverEntry>): void => {
			if (destroying.current) {
				return;
			}

			if (!entries || entries.length === 0) {
				return;
			}

			if (!ref.current) {
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

			height.current = borderBoxSize || 0;
			const str = Math.floor(borderBoxSize || 0).toString();
			setHeightStr(str === '0' ? '0' : str + 'px');
		});

		resizeObserver.observe(ref.current as HTMLElement);

		return () => {
			if (resizeObserver) {
				resizeObserver.disconnect();
			}
		};
	}, [ref.current]);

	return {
		height: height.current,
		heightStr
	};
}
