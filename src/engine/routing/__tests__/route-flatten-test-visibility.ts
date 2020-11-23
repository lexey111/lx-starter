import {flattenRoutes} from '../route-flatten';

const routesToFlatSimple = [
	{
		url: '/A',
		routes: [
			{url: '/A.1/test1'},
			{url: '/A.2/test2'},
		]
	},
	{
		url: '/B',
		routes: [
			{url: '/B.1/:test1'},
			{url: '/B.2/:test2'},
		]
	},
	{
		url: '/C',
		routes: [
			{url: '/C.1/:test1'},
			{url_x: '/C.2/test2'},
		]
	}
];

describe('Route mapping flattening - visibility', () => {
	it('should return visible routes', () => {
		const result = flattenRoutes(routesToFlatSimple as any);

		expect(result[0].url).toBe('/A');
		expect(result[0]._hasSubRoutes).toBe(true);
		expect(result[0]._hasVisibleSubRoutes).toBe(true);
	});

	it('should skip parametrized routes', () => {
		const result = flattenRoutes(routesToFlatSimple as any);

		expect(result[3].url).toBe('/B');
		expect(result[3]._hasSubRoutes).toBe(true);
		expect(result[3]._hasVisibleSubRoutes).toBe(false);
	});

	it('should skip only parametrized routes', () => {
		const result = flattenRoutes(routesToFlatSimple as any);

		expect(result[6].url).toBe('/C');
		expect(result[6]._hasSubRoutes).toBe(true);
		expect(result[6]._hasVisibleSubRoutes).toBe(false);
	});
});
