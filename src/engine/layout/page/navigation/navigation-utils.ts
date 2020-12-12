import {TNavigationItems} from '../../../../app/store/app-state/app-state-page-navigation-store';

const container = document.getElementById('app-mount-point');

export const sortAnchors = (anchors: TNavigationItems, extraTopPadding: number): void => {
	if (!container || !anchors || anchors.length < 2) {
		return;
	}
	const {scrollHeight} = container;
	const scrollTop = window.scrollY;
	let clientHeight = window.innerHeight || document.documentElement.clientHeight;

	// correct client height by sticky elements
	if (document.body.classList.contains('with-top-menu')) {
		clientHeight -= 48; // top menu height
	}
	if (document.body.classList.contains('with-page-submenu')) {
		clientHeight -= 48; // page submenu height
	}
	if (document.body.classList.contains('with-breadcrumbs')) {
		clientHeight -= 48; // breadcrumbs panel height
	}
	// AppStateStore._topPanelHeight
	clientHeight -= extraTopPadding;

	const scrollBottom = scrollTop + clientHeight;

	let itemFound;

	// reset current state
	anchors.forEach(item => item.current = item.partiallyVisible = false);

	// update Y pos and sort - item could be added dynamically
	// so order is invalid
	anchors.forEach(item => {
		// collect parent offsets
		let offsets = 0;
		let node: HTMLDivElement | null = item.anchorRef;
		while (node) {
			if (typeof node?.offsetTop === 'number') {
				offsets += node?.offsetTop;
			}
			node = node?.parentNode as HTMLDivElement;
		}
		item.YPos = offsets;
	});
	anchors.sort((a, b) => a.YPos - b.YPos);

	// calc new states
	for (let i = 0; i < anchors.length; i++) {
		const item = anchors[i];

		const nextItem = i < anchors.length - 1 ? anchors[i + 1] : null;

		const yStart = item.YPos;

		let elementHeight: number;
		if (nextItem) {
			elementHeight = nextItem.YPos - yStart;
		} else {
			elementHeight = scrollHeight - yStart;
		}

		const yEnd = yStart + elementHeight;

		if (yStart <= scrollTop && yEnd >= scrollBottom) {
			// element is taller than scrolling window and
			// it started above and finished below
			item.current = true;
			break;
		}

		if (yEnd >= scrollTop && yEnd <= scrollBottom) {
			item.partiallyVisible = true;
		}

		if (yStart >= scrollTop && !itemFound) {
			// element is the first visible element in the scrolling window
			itemFound = true;
			item.current = true;
			item.partiallyVisible = false;
		}
		if (yStart >= scrollTop && !item.current) {
			// partially visible
			item.partiallyVisible = true;
		}
		if (yEnd >= scrollBottom) {
			break;
		}
	}
};
