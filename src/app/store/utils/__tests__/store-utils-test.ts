import {_getSnapshot, _resetData, _setData, handleStoreValue} from './store-utils';

describe('Store: _setData', () => {
	it('Should assign data from template as is', () => {
		const template = {
			a: 1,
			b: 2
		};
		const result = {};
		_setData(result, template, template);
		expect(result).toEqual(template);
	});

	it('Should re-assign only data from template', () => {
		const template = {
			a: 1,
			b: 2
		};
		const result = {
			b: 40000,
			c: 3,
			d: 4
		};

		_setData(result, template, template);
		expect(result).toEqual({
			a: 1,
			b: 2,
			c: 3,
			d: 4
		});
	});

	it('Should assign data by template', () => {
		const template = {
			a: 1,
			b: 2
		};
		const data = {
			a: 10,
			b: 20,
			x: 'y',
			y: 'z'
		};
		const result = {
			b: 40000,
			c: 3,
			d: 4
		};

		_setData(result, template, data);
		expect(result).toEqual({
			a: 10,
			b: 20,
			c: 3,
			d: 4
		});
	});

	it('Should assign arrays', () => {
		const template = {
			a: 1,
			b: []
		};
		const data = {
			a: 10,
			b: [1, '2', 3]
		};
		const result = {
			b: 40000,
			c: 3,
			d: 4
		};

		_setData(result, template, data);
		expect(result).toEqual({
			a: 10,
			b: [1, '2', 3],
			c: 3,
			d: 4
		});
		expect(result.b).toEqual(data.b);
	});

	it('Should assign objects', () => {
		const template = {
			a: 1,
			b: {}
		};
		const data = {
			a: 10,
			b: {
				x: 'y',
				y: 'z'
			}
		};
		const result = {
			b: 40000,
			c: 3,
			d: 4
		};

		_setData(result, template, data);
		expect(result).toEqual({
			a: 10,
			b: {
				x: 'y',
				y: 'z'
			},
			c: 3,
			d: 4
		});
		expect(result.b).toEqual(data.b);
	});

	it('Should assign nulls', () => {
		const template = {
			a: 1,
			b: {}
		};
		const data = {
			a: 10,
			b: null
		};
		const result = {
			b: 40000,
			c: 3,
			d: 4
		};

		_setData(result, template, data);
		expect(result).toEqual({
			a: 10,
			b: null,
			c: 3,
			d: 4
		});
		expect(result.b).toBeNull();
	});

	it('Should assign dates', () => {
		const template = {
			a: 1,
			b: {}
		};
		const data = {
			a: 10,
			b: new Date()
		};
		const result = {
			b: 40000,
			c: 3,
			d: 4
		};

		_setData(result, template, data);
		// noinspection SuspiciousTypeOfGuard
		expect((result.b as any) instanceof Date).toBeTruthy();
	});

	describe('Should process keys combination', () => {
		const template = {
			a: 0,
			b: 0,
			d: 0,
			e: 0,
			y: 0
		};
		const result = {
			a: 'original_a',
			b: 'original_b',
			c: 'original_c',
			x: 'original_x'
		};
		const data = {
			c: 'data_c',
			d: 'data_d',
			a: 'data_a'
		};

		_setData(result, template, data);
		it('Should over [+target] [+template] [+data] +++', () => {
			expect(result.a).toBe('data_a');
		});
		it('Should keep [+target] [+template] [-data] ++-', () => {
			expect(result.b).toBe('original_b');
		});
		it('Should keep [+target] [-template] [+data] +-+', () => {
			expect(result.c).toBe('original_c');
		});
		it('Should add  [-target] [+template] [+data] -++', () => {
			expect(result['d']).toBe('data_d');
		});
		it('Should skip [-target] [-template] [+data] --+', () => {
			// eslint-disable-next-line no-prototype-builtins
			expect(result.hasOwnProperty('e')).toBeFalsy();
		});
		it('Should skip [-target] [+template] [-data] -+-', () => {
			// eslint-disable-next-line no-prototype-builtins
			expect(result.hasOwnProperty('y')).toBeFalsy();
		});
		it('Should skip [+target] [-template] [-data] +--', () => {
			expect(result.x).toBe('original_x');
		});
		it('Should skip [-target] [-template] [-data] ---', () => {
			// eslint-disable-next-line no-prototype-builtins
			expect(result.hasOwnProperty('z')).toBeFalsy();
		});
	});

	it('Should assign undefined', () => {
		const template = {
			a: 0,
			b: 0
		};
		const result = {
			a: 'original_a',
			b: 'original_b'
		};
		const data = {
			a: 'data_a',
			b: void 0
		};

		_setData(result, template, data);
		expect(result.a).toBe('data_a');
		expect(result.b).toBeUndefined();
	});

	it('Should process undefined template values correctly', () => {
		const template = {
			a: void 0,
			b: void 0
		};
		const result = {
			a: 'original_a',
			b: 'original_b'
		};
		const data = {
			a: 'data_a',
			b: void 0
		};

		_setData(result, template, data);
		expect(result.a).toBe('data_a');
		expect(result.b).toBeUndefined();
	});

	it('Should reset data', () => {
		const template = {
			a: 0,
			b: 0
		};
		const result = {
			a: 'original_a',
			b: 'original_b'
		};

		_resetData(result, template);
		expect(result.a).toBe(0);
		expect(result.b).toBe(0);
	});

	it('Should reset data if keys absent', () => {
		const template = {
			a: 0,
			b: 0
		};
		const result = {a: 'original_a'};

		_resetData(result, template);
		expect(result).toEqual(template);
		expect(result.a).toBe(0);
		expect(result['b']).toBe(0);
	});
});

describe('Store: _getSnapshot', () => {
	it('Should extract objects', () => {
		const template = {
			a: 1,
			b: {}
		};
		const data = {
			a: 10,
			b: {
				x: 'y',
				y: 'z'
			}
		};
		const result = _getSnapshot(data, template);

		expect(result).toEqual({
			a: 10,
			b: {
				x: 'y',
				y: 'z'
			}
		});
		expect(result.b !== data.b).toBeTruthy();
		expect(result.b).toEqual(data.b);
	});

	it('Should extract only values by template', () => {
		const template = {a: 1};
		const data = {
			a: 10,
			b: {
				x: 'y',
				y: 'z'
			}
		};
		const result = _getSnapshot(data, template);

		expect(result).toEqual({a: 10});
	});
});

describe('Store: handleStoreValue', () => {
	it('Should throw if no field name', () => {
		const store = {a: 1};

		expect(() => handleStoreValue(store, '', 42))
			.toThrow('fieldName required!');
	});

	it('Should throw on assigning [absent] value', () => {
		const store = {a: 1};

		expect(() => handleStoreValue(store, 'b', 42))
			.toThrow('Field b is absent in the store!');
	});

	it('Should assign value', () => {
		const store = {a: 1};
		handleStoreValue(store, 'a', 42);

		expect(store.a).toBe(42);
	});

	it('Should assign value in {target: {value}} form (events)', () => {
		const store = {a: 1};
		handleStoreValue(store, 'a', {target: {value: 42}});

		expect(store.a).toBe(42);
	});

	it('Should set [changed] field', () => {
		const store = {
			a: 1,
			changed: false
		};
		handleStoreValue(store, 'a', 42);

		expect(store.changed).toBe(true);
	});

	it('Should assign 0 to [version] field if it is undefined', () => {
		const store = {
			a: 1,
			version: void 0
		};
		handleStoreValue(store, 'a', 42);

		expect(store.version).toBe(1);
	});

	it('Should increase [version] field on each change', () => {
		const store = {
			a: 1,
			version: 1
		};
		handleStoreValue(store, 'a', 42);
		handleStoreValue(store, 'a', 84);

		expect(store.version).toBe(3);
	});

});
