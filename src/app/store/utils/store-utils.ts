/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
function semiDeepCopy(key: string, source: Record<string, any>, destination: Record<string, any>): void {
	// eslint-disable-next-line no-prototype-builtins
	if (!source.hasOwnProperty(key)) {
		return;
	}
	if (Array.isArray(source[key])) {
		destination[key] = [...source[key]];
		return;
	}
	if (source[key] === null) {
		destination[key] = null;
		return;
	}
	if (source[key] instanceof Date) {
		destination[key] = new Date(source[key]);
		return;
	}
	if (typeof source[key] === 'object') {
		destination[key] = {...source[key]};
		return;
	}
	destination[key] = source[key];
}

export function _setData<T, U, V>(target: T, template: U, data: V): void {
	Object.keys(template).forEach(key => semiDeepCopy(key, data, target));
}

export function _resetData<T, U>(target: T, initialData: U): void {
	Object.keys(initialData).forEach(key => semiDeepCopy(key, initialData, target));
}

export function _getSnapshot<T, U>(source: T, template: U): T {
	const result: unknown = {};
	Object.keys(template).forEach(key => semiDeepCopy(key, source, result as any));
	return result as T;
}

export function handleStoreValue<T>(store: T, fieldName: string, fieldValue: unknown): void {
	if (!fieldName) {
		throw new Error('fieldName required!');
	}
	if (!Object.prototype.hasOwnProperty.call(store, fieldName)) {
		throw new Error(`Field ${fieldName} is absent in the store!`);
	}

	let valueToSave = fieldValue;

	if ((fieldValue as any).target) {
		valueToSave = (fieldValue as any).target.value;
	}

	store[fieldName] = valueToSave;

	if (Object.prototype.hasOwnProperty.call(store, 'changed')) {
		store['changed'] = true;
	}
	if (Object.prototype.hasOwnProperty.call(store, 'version')) {
		if (!store['version']) {
			store['version'] = 0;
		}
		store['version'] = Number(store['version']) + 1;
	}
}
