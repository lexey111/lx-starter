import {getNestedObject, hasField} from '../object-utils';

describe('Utils object access tests', () => {
	describe('"hasField" should check object field access', () => {
		it('should return true for simple access', () => {
			const data = {
				a: 42,
				values: {
					b: 14
				}
			};

			expect(hasField(data, 'a')).toBe(true);
			expect(hasField(data, 'b')).toBe(false);
			expect(hasField(data, 'values')).toBe(true);
			expect(hasField(data, 'values.b')).toBe(true);
			expect(hasField(data, 'values.c')).toBe(false);
		});

		it('should return true for nested access', () => {
			const data = {
				a: {
					b: {
						c: {
							d: 42
						}
					}
				}
			};

			expect(hasField(data, 'a.b.c.d')).toBe(true);
			expect(hasField(data, 'b')).toBe(false);
			expect(hasField(data, 'a.b.d')).toBe(false);
			expect(hasField(data, 'a.b.c.d.e')).toBe(false);
			expect(hasField(data, 'a.b.c.e')).toBe(false);
		});

		it('should return false for empty path', () => {
			const data = {
				a: {
					b: {
						c: {
							d: 42
						}
					}
				}
			};

			expect(hasField(data, null as any)).toBe(false);
			expect(hasField(data, '')).toBe(false);
			expect(hasField(data, void 0 as any)).toBe(false);
		});

		it('should return false for bad path', () => {
			const data = {
				a: {
					b: {
						c: {
							d: 42
						}
					}
				}
			};

			expect(hasField(data, 'a.b[...')).toBe(false);
			expect(hasField(data, 'a.*')).toBe(false);
		});

		it('should return true for array access', () => {
			const data = {
				a: {
					b: [
						{
							c: {
								d: 1
							}
						},
						{
							c: {
								e: 2
							}
						},
					]
				}
			};

			expect(hasField(data, 'a.b[0].c.d')).toBe(true);
			expect(hasField(data, 'a.b[0].c.e')).toBe(false);

			expect(hasField(data, 'a.b[1].c.d')).toBe(false);
			expect(hasField(data, 'a.b[1].c.e')).toBe(true);

			expect(hasField(data, 'a.b[2].c.e')).toBe(false);
			expect(hasField(data, 'a.b[2]')).toBe(false);
		});

		it('should return true for nested access', () => {
			const data = {
				a: {
					b: [
						{
							c: [
								{d: 1},
								{d: 2}
							]
						},
						{
							c: [
								{e: 1},
								{e: 2}
							]
						}
					]
				}
			};

			expect(hasField(data, 'a.b[0].c[0].d')).toBe(true);
			expect(hasField(data, 'a.b[0].c[1].d')).toBe(true);
			expect(hasField(data, 'a.b[0].c')).toBe(true);

			expect(hasField(data, 'a.b[0].d')).toBe(false);
			expect(hasField(data, 'a.b[0].c[0].d')).toBe(true);
			expect(hasField(data, 'a.b[1].c[0].d')).toBe(false);
			expect(hasField(data, 'a.b[0].c[1].d')).toBe(true);
			expect(hasField(data, 'a.b[0].c[0].e')).toBe(false);
			expect(hasField(data, 'a.b[1].c[1].e')).toBe(true);
		});
	});

	describe('"getNestedObject" should process default values correctly', () => {
		it('should return default value if key does not exists', () => {
			const data = {
				a: 42,
				none: undefined,
				values: {
					b: 14
				}
			};

			expect(getNestedObject(data, 'b')).toBe(undefined);
			expect(getNestedObject(data, 'b', 'aaa')).toBe('aaa');

			expect(getNestedObject(data, 'values.c')).toBe(undefined);
			expect(getNestedObject(data, 'values.c', 'aaa')).toBe('aaa');
		});

		it('should return default value only if key does not exists', () => {
			const data = {
				a: 42,
				none: undefined,
				values: {
					b: 14
				}
			};

			expect(getNestedObject(data, 'none', 'aaa')).toBeUndefined();
			expect(getNestedObject(data, 'values.c')).toBe(undefined);
			expect(getNestedObject(data, 'values.c', 'aaa')).toBe('aaa');

			expect(getNestedObject(data, 'values.c.d')).toBe(undefined);
			expect(getNestedObject(data, 'values.c.d', 'aaa')).toBe('aaa');
		});
	});

	describe('"getNestedObject" should check object field access', () => {
		it('should return data for simple access', () => {
			const data = {
				a: 42,
				values: {
					b: 14
				}
			};

			expect(getNestedObject(data, 'a')).toBe(42);
			expect(getNestedObject(data, 'b')).toBeUndefined();
			expect(getNestedObject(data, 'values')).toBeDefined();
			expect(getNestedObject(data, 'values')).toEqual({b: 14});
			expect(getNestedObject(data, 'values.b')).toBe(14);
			expect(getNestedObject(data, 'values.c')).toBe(undefined);
		});

		it('should return data for simple access, array form', () => {
			const data = {
				a: 42,
				values: {
					b: 14
				}
			};

			expect(getNestedObject(data, ['values', 'b'])).toBe(14);
			expect(getNestedObject(data, ['values', 'c'])).toBe(undefined);
		});

		it('should return data for nested access', () => {
			const data = {
				a: {
					b: {
						c: {
							d: 42
						}
					}
				}
			};

			expect(getNestedObject(data, 'a.b.c.d')).toBe(42);
			expect(getNestedObject(data, 'b')).toBeUndefined();
			expect(getNestedObject(data, 'a.b.d')).toBeUndefined();
			expect(getNestedObject(data, 'a.b.c.d.e')).toBeUndefined();
			expect(getNestedObject(data, 'a.b.c.e')).toBeUndefined();
		});

		it('should return data for array access', () => {
			const data = {
				a: {
					b: [
						{
							c: {
								d: 1
							}
						},
						{
							c: {
								e: 2
							}
						},
					]
				}
			};

			expect(getNestedObject(data, 'a.b[0].c.d')).toBe(1);
			expect(getNestedObject(data, 'a.b[0].c.e')).toBeUndefined();

			expect(getNestedObject(data, 'a.b[1].c.d')).toBeUndefined();
			expect(getNestedObject(data, 'a.b[1].c.e')).toBe(2);

			expect(getNestedObject(data, 'a.b[2].c.e')).toBeUndefined();
			expect(getNestedObject(data, 'a.b[2]')).toBeUndefined();
		});

		it('should return data for nested access', () => {
			const data = {
				a: {
					b: [
						{
							c: [
								{d: 1},
								{d: 2}
							]
						},
						{
							c: [
								{e: 1},
								{e: 2}
							]
						}
					]
				}
			};

			expect(getNestedObject(data, 'a.b[0].c[0].d')).toBe(1);
			expect(getNestedObject(data, 'a.b[0].c[1].d')).toBe(2);
			expect(getNestedObject(data, 'a.b[0].c')).toBeDefined();

			expect(getNestedObject(data, 'a.b[0].d')).toBeUndefined();
			expect(getNestedObject(data, 'a.b[0].c[0].d')).toBe(1);
			expect(getNestedObject(data, 'a.b[1].c[0].d')).toBeUndefined();
			expect(getNestedObject(data, 'a.b[0].c[1].d')).toBe(2);
			expect(getNestedObject(data, 'a.b[0].c[0].e')).toBeUndefined();
			expect(getNestedObject(data, 'a.b[1].c[1].e')).toBe(2);
		});
	});
});
