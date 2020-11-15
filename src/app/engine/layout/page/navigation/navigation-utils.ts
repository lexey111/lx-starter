import {TNavigationItems} from '../../../../store/app-state/app-state-page-navigation-store';

const container = document.getElementById('app-mount-point');

export const sortAnchors = (anchors: TNavigationItems): void => {
	if (!container) {
		return;
	}
	const {scrollHeight} = container;
	const scrollTop = window.scrollY;
	let clientHeight = window.innerHeight || document.documentElement.clientHeight;
	if (document.body.classList.contains('with-top-menu')) {
		clientHeight -= 48; // top menu height
	}
	if (document.body.classList.contains('with-page-menu')) {
		clientHeight -= 48; // page menu height
	}
	if (document.body.classList.contains('with-breadcrumbs')) {
		clientHeight -= 48; // breadcrumbs panel height
	}
	const scrollBottom = scrollTop + clientHeight;

	let itemFound;

	// reset current state
	anchors.forEach(item => item.current = item.partiallyVisible = false);

	// update Y pos and sort - item could be added dynamically
	// so order is invalid
	anchors.forEach(item => {
		item.YPos = item.titleRef.offsetTop;
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
