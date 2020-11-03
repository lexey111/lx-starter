import {setObjectField} from '../object-utils';

describe('Utils object set tests', () => {
	describe('Non-object values and empty path', () => {
		it('should pass non-objects as is: string', () => {
			expect(setObjectField('a', 'a', 11)).toBe('a');
		});

		it('should pass non-objects as is: number', () => {
			expect(setObjectField(42, 'a', 11)).toBe(42);
		});

		it('should pass non-objects as is: array', () => {
			expect(setObjectField([1, 2, 3], 'a', 11)).toEqual([1, 2, 3]);
		});

		it('should pass non-objects as is: boolean', () => {
			expect(setObjectField(true, 'a', 11)).toBe(true);
			expect(setObjectField(false, 'a', 11)).toBe(false);
		});

		it('should pass non-objects as is: null', () => {
			expect(setObjectField(null, 'a', 11)).toBe(null);
		});

		it('should pass non-objects as is: undefined', () => {
			expect(setObjectField(undefined, 'a', 11)).toBe(undefined);
		});

		it('should pass objects as is when no path provided', () => {
			expect(setObjectField({a: 1}, '', 11)).toEqual({a: 1});
			expect(setObjectField({a: 1}, null as any, 11)).toEqual({a: 1});
			expect(setObjectField({a: 1}, void 0 as any, 11)).toEqual({a: 1});
		});
	});

	describe('Access to object fields', () => {
		it('should throw if object field is absent', () => {
			const obj = {
				a: 1,
				b: {
					c: {
						name: 'test'
					}
				}
			};
			expect(() => setObjectField(obj, 'e', 42)).toThrow('Field "e" is absent in object!');
			expect(() => setObjectField(obj, 'b.d', 42)).toThrow('Field "d" is absent in object!');
			expect(() => setObjectField(obj, 'b.c.unknown', 42)).toThrow('Field "unknown" is absent in object!');
		});

		it('should set existing object field value by plain path', () => {
			const result1 = setObjectField({a: 1}, 'a', 42);
			expect(result1).toMatchObject({a: 42});

			const result2 = setObjectField({a: 1, b: 0}, 'b', '77');
			expect(result2).toMatchObject({a: 1, b: '77'});
		});

		it('should change original object and return result as well', () => {
			const obj = {
				a: 1,
				b: 42
			};
			const result = setObjectField(obj, 'b', 77);
			expect(result).toEqual({a: 1, b: 77});
			expect(obj).toBe(result);
		});

		it('should set existing object field value by nested path', () => {
			const obj = {
				a: 1,
				b: {
					c: {
						name: 'test'
					}
				}
			};
			const result = setObjectField(obj, 'b.c.name', 'cool');
			expect(result.b.c.name).toBe('cool');

			expect(setObjectField(obj, 'b.c', 42)).toMatchObject({a: 1, b: {c: 42}});
		});

		it('should use escaped paths syntax', () => {
			const obj = {
				a: 1,
				'a.b.c.d': 2,
				b: 3,
				c: 4,
				d: 5
			};
			const result1 = setObjectField(obj, 'a', 42);
			expect(result1).toMatchObject({a: 42, 'a.b.c.d': 2, b: 3, c: 4, d: 5});

			const result2 = setObjectField(obj, 'a\\.b\\.c\\.d', 'cool');
			expect(result2).toMatchObject({a: 42, 'a.b.c.d': 'cool', b: 3, c: 4, d: 5});
		});
	});

	describe('Access to array fields', () => {

		it('should throw if target field is not array', () => {
			expect(() => setObjectField({a: 42}, 'a[0]', 42)).toThrow('Field "a" is not Array!');
			expect(() => setObjectField({a: {b: 42}}, 'a.b[0]', 42)).toThrow('Field "b" is not Array!');
			expect(() => setObjectField({a: {b: 42}}, 'a.c[0]', 42)).toThrow('Field "c" is absent in object!');
		});

		it('should throw if target array is out of bounds', () => {
			expect(() => setObjectField({a: [1, 2, 3]}, 'a[4]', 42)).toThrow('Index is out of bounds: "a[4]"!');
		});

		it('should throw on invalid index syntax', () => {
			expect(() => setObjectField({a: [1, 2, 3]}, 'a[-4]', 42)).toThrow('Invalid array accessor "a[-4]"!');
			expect(() => setObjectField({a: [1, 2, 3]}, 'a[asd as]', 42)).toThrow('Invalid array accessor "a[asd as]"!');
			expect(() => setObjectField({a: [1, 2, 3]}, '[25]', 42)).toThrow('Invalid array accessor "[25]"!');
		});

		it('should change value in plain array', () => {
			const obj = {
				a: [1, 2, 3]
			};
			const result = setObjectField(obj, 'a[0]', 'cool');
			expect(result.a[0]).toBe('cool');
		});

		it('should change value in plain nested array', () => {
			const obj = {
				a: {
					b: [1, 2, 3]
				}
			};
			const result = setObjectField(obj, 'a.b[2]', 'cool');
			expect(result.a.b[2]).toBe('cool');
		});

		it('should change value of nested array of objects', () => {
			const obj = {
				a: {
					b: [{c: 1}, {c: 2}, {c: 3}]
				}
			};
			expect(obj.a.b[2].c).toBe(3);
			setObjectField(obj, 'a.b[2].c', 'cool');
			expect(obj.a.b[2].c).toBe('cool');
		});

		it('should change value in deep nested array', () => {
			const obj = {
				a: {
					b: {
						c: {
							d: [1, 2, 3]
						}
					}
				}
			};
			const result = setObjectField(obj, 'a.b.c.d[2]', 42);
			expect(result.a.b.c.d[2]).toBe(42);
		});

		it('should change value on multiple arrays', () => {
			const obj = {
				a: {
					b: [
						{
							c: 1,
							d: ['a', 'b', 'c']
						},
						{
							c: 2,
							d: ['a', 'b', 'c']
						},
					]
				}
			};
			expect(obj.a.b[0].d[1]).toBe('b');
			setObjectField(obj, 'a.b[0].d[1]', 'cool');
			expect(obj.a.b[0].d[1]).toBe('cool');
		});
	});
});
