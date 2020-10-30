import {getRouteByUrl, getRoutesByParentUrl} from '../route-mapping-utils';
import {RouteMapping} from '../route-mapping';

jest.mock('../route-mapping', () => {
	return {
		RouteMapping: [
			{url: '/one'},
			{url: '/one/aaa'},
			{url: '/one/aaa/bbb'},
			{url: '/params1/:id'},
			{url: '/params2/:name/:subname'},
			{url: '/params2/:name'},
			{url: '/params3/:id1/:id2/:id3'},

			{url: '/params5'},
			{url: '/params5/:id1'},
			{url: '/params5/:id1/:id2'},

			{url: '/params6/:id1/:id2'},
			{url: '/params6/:id1'},
			{url: '/params6'},

			{url: '/params7/:id1/:id2'},
			{url: '/params7'},
			{url: '/params7/:id1'},

			{url: '/xxx/1'},
			{url: '/xxx/1/a', _parentUrl: '/xxx/1'},
			{url: '/xxx/1/b', _parentUrl: '/xxx/1'},
			{url: '/xxx/1/c/:name', _parentUrl: '/xxx/1'},
		]
	};
});

describe('Route mapping', () => {
	it('should work', () => {
		expect(1).toBe(1);
	});

	it('should mock RouteMapping', () => {
		expect(RouteMapping.length).toBeGreaterThan(0);
	});

	describe('getRouteByUrl - simple', () => {
		it('should return undefined on unknown route (1)', () => {
			expect(getRouteByUrl('/unknown')).toBeUndefined();
		});

		it('should return undefined on unknown route (2)', () => {
			expect(getRouteByUrl('/one/unknown')).toBeUndefined();
		});

		it('should return undefined on empty routes', () => {
			expect(getRouteByUrl('')).toBeUndefined();
			expect(getRouteByUrl(null as any)).toBeUndefined();
			expect(getRouteByUrl(void 0 as any)).toBeUndefined();
		});
	});

	describe('getRouteByUrl - with params', () => {
		it('should return parametrized route by url (/params1/abcdefgh123456)', () => {
			expect(getRouteByUrl('/params1/abcdefgh123456')?.url).toBe('/params1/:id');
		});

		it('should return parametrized nested route by url (/params2/aaa111/bbb222)', () => {
			expect(getRouteByUrl('/params2/aaa111/bbb222')?.url).toBe('/params2/:name/:subname');
		});

		it('should return parametrized nested route by url (3)', () => {
			expect(getRouteByUrl('/params2/aaa111')?.url).toBe('/params2/:name');
		});

		it('should return parametrized nested route by url (/params3/a1/b2/c3)', () => {
			expect(getRouteByUrl('/params3/a1/b2/c3')?.url).toBe('/params3/:id1/:id2/:id3');
		});
	});

	describe('getRoutesByParentUrl', () => {
		it('should return sub routes', () => {
			const result = getRoutesByParentUrl('/xxx/1')
			expect(result.length).toBe(3);
		});

		it('should return empty array if no url provided', () => {
			const result = getRoutesByParentUrl('')
			expect(result.length).toBe(0);
		});

		it('should return sub routes without parametrized', () => {
			const result = getRoutesByParentUrl('/xxx/1', true)
			expect(result.length).toBe(2);
		});
	});

	describe('getRouteByUrl - order-agnostic declaration', () => {
		it('should return non-parametrized route by url (/params5)', () => {
			expect(getRouteByUrl('/params5')?.url).toBe('/params5');
		});

		it('should return parametrized route by url (/params5/a)', () => {
			expect(getRouteByUrl('/params5/a')?.url).toBe('/params5/:id1');
		});

		it('should return parametrized route by url (/params5/x/y)', () => {
			expect(getRouteByUrl('/params5/x/y')?.url).toBe('/params5/:id1/:id2');
		});

		it('should return non-parametrized route by url (/params6)', () => {
			expect(getRouteByUrl('/params6')?.url).toBe('/params6');
		});

		it('should return parametrized route by url (/params6/a)', () => {
			expect(getRouteByUrl('/params6/a')?.url).toBe('/params6/:id1');
		});

		it('should return parametrized route by url (/params6/x/y)', () => {
			expect(getRouteByUrl('/params6/x/y')?.url).toBe('/params6/:id1/:id2');
		});

		it('should return non-parametrized route by url (/params7)', () => {
			expect(getRouteByUrl('/params7')?.url).toBe('/params7');
		});

		it('should return parametrized route by url (/params7/a)', () => {
			expect(getRouteByUrl('/params7/a')?.url).toBe('/params7/:id1');
		});

		it('should return parametrized route by url (/params7/x/y)', () => {
			expect(getRouteByUrl('/params7/x/y')?.url).toBe('/params7/:id1/:id2');
		});
	});
});
